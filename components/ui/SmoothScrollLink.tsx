import { ReactNode } from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const SmoothScrollLink = ({ href, children, className }: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Remove # from href if present
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};