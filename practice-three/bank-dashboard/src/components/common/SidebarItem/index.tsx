import { memo, ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';

// Constants
import { DESTINATION } from '@app/constants';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  link: string;
  onToggleSidebar: () => void;
}

const SidebarItem = ({
  icon,
  label,
  link,
  onToggleSidebar,
}: SidebarItemProps) => {
  const location = useLocation();

  const isActive =
    location.pathname === link ||
    (location.pathname === '/' && link === DESTINATION.DASHBOARD);

  return (
    <li
      aria-label="Sidebar item"
      data-testid="sidebar-item"
      className={`pl-7.5 py-3.75 lg:py-4.5 rounded-r-3xl border-l-5 list-none ${
        isActive
          ? 'border-blue-200 dark:border-border-default'
          : 'border-transparent'
      }`}
      onClick={onToggleSidebar}
    >
      <Link
        to={link}
        className={`flex items-center transition-colors ${
          isActive
            ? 'text-blue-200 dark:text-text-default'
            : 'text-gray-200 opacity-80'
        } hover:text-blue-200 dark:hover:text-text-default`}
      >
        {icon}
        <span className="ml-5 lg:ml-6.5 font-primary font-medium text-2xl lg:text-4xl">
          {label}
        </span>
      </Link>
    </li>
  );
};

export default memo(SidebarItem);
