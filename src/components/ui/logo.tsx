import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  href?: string;
  color?: string;
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

export function Logo({ size = 'md', showText = false, className, href, color }: LogoProps) {
  const logoSvg = (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeMap[size], color ? '' : 'text-primary', className)}
      style={color ? { color } : undefined}
    >
      <path
        d="M725.281 977.275C660.17 1007.27 587.69 1024 511.301 1024C237.581 1024 14.0286 809.207 0 538.979L725.281 977.275ZM511.301 0C630.318 0 739.85 40.6099 826.798 108.729L418.414 517.113L525.188 623.887L930.753 218.32C989.072 301.461 1023.3 402.733 1023.3 512C1023.3 658.565 961.715 790.745 863.012 884.078L18.2363 373.569C78.6191 158.052 276.502 0 511.301 0Z"
        fill="currentColor"
      />
    </svg>
  );

  const content = (
    <div className="flex items-center gap-2 group">
      {logoSvg}
      {showText && <span className={cn('font-bold', size === 'lg' ? 'text-2xl' : 'text-xl')}>VibeCN</span>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn('inline-flex', className)}>
        {content}
      </Link>
    );
  }

  return content;
}
