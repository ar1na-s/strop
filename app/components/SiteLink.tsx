import type { AnchorHTMLAttributes } from 'react';

// Public navigation uses full document requests, so the URL and server-rendered
// catalog stay in sync even when a client transition or its RSC transfer stalls.
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean };
export default function SiteLink({prefetch: _prefetch, ...props}: Props) {
  return <a {...props}/>;
}
