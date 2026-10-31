// Keep local previews local; production media bypasses the affected custom-domain route.
export function publicAsset(path: string) {
  path = path.replace(/^\/images\/(photo-site\d+\.webp)$/, '/images/optimized-v1/$1');
  return process.env.NODE_ENV === 'production' && path.startsWith('/')
    ? `https://soft-liger-948183.netlify.app${path}`
    : path;
}
