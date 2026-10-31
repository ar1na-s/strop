// Netlify may serve identity HTML when Accept-Encoding is absent. Gzip is
// permitted in that case (RFC 9110 12.5.3), and avoids oversized transfers.
export function acceptsGzip(value) {
  if (value === null) return true;
  const encodings = value.toLowerCase().split(',').map(part => {
    const [name, ...params] = part.trim().split(';');
    const quality = params.find(p => p.trim().startsWith('q='));
    return { name, q: quality ? Number(quality.trim().slice(2)) : 1 };
  });
  const gzip = encodings.find(e => e.name === 'gzip');
  return (gzip || encodings.find(e => e.name === '*'))?.q > 0;
}

export default async function compressHtml(request, context) {
  if (request.method !== 'GET' || request.headers.has('range') ||
      request.headers.has('rsc') || request.headers.has('x-nextjs-data') ||
      !acceptsGzip(request.headers.get('accept-encoding'))) return;

  const response = await context.next();
  if (response.status !== 200 || !response.body ||
      response.headers.has('content-encoding') ||
      !response.headers.get('content-type')?.toLowerCase().startsWith('text/html')) return response;

  try {
    const original = await response.clone().arrayBuffer();
    if (original.byteLength < 1024 || original.byteLength > 2 * 1024 * 1024) return response;
    const stream = new Response(original).body.pipeThrough(new CompressionStream('gzip'));
    const compressed = await new Response(stream).arrayBuffer();
    if (compressed.byteLength >= original.byteLength) return response;
    const headers = new Headers(response.headers);
    headers.set('Content-Encoding', 'gzip');
    headers.set('Content-Length', String(compressed.byteLength));
    headers.set('X-MPK-HTML', 'gzip-v1');
    const cacheControl = headers.get('Cache-Control') || '';
    if (!cacheControl.toLowerCase().includes('no-transform')) {
      headers.set('Cache-Control', [cacheControl, 'no-transform'].filter(Boolean).join(', '));
    }
    const vary = headers.get('Vary') || '';
    if (!vary.toLowerCase().split(',').some(v => v.trim() === 'accept-encoding')) {
      headers.set('Vary', [vary, 'Accept-Encoding'].filter(Boolean).join(', '));
    }
    headers.delete('ETag');
    headers.delete('Accept-Ranges');
    return new Response(compressed, {status: response.status, statusText: response.statusText, headers});
  } catch {
    // A compression failure must preserve the original page, never a blank page.
    return response;
  }
}

export const config = {
  path: '/*',
  excludedPath: ['/_next/*', '/api/*', '/admin', '/admin/*', '/images/*', '/products/*', '/certificates/*', '/*.*'],
};
