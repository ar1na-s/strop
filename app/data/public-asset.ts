// Keep local previews local; production media bypasses the affected custom-domain route.
export function publicAsset(path: string) {
  return process.env.NODE_ENV === 'production' && path.startsWith('/')
    ? `https://soft-liger-948183.netlify.app${path}`
    : path;
}
