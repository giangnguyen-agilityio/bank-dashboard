import { memo, ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';

// Icons
import { LogoIcon, CloseIcon } from '@app/assets';

// Utils
import { cn } from '@app/utils';

// Constants
import { DESTINATION } from '@app/constants';

// Components
import { Button } from '@app/components';

interface SidebarProps {
  isOpen: boolean;
  items: {
    icon: ReactNode;
    label: string;
    link: string;
  }[];
  toggleSidebar: () => void;
}

const Sidebar = ({
  isOpen = false,
  items = [],
  toggleSidebar,
}: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      data-testid="sidebar"
      className={cn(
        'fixed top-0 left-0 z-50 h-screen border-r border-border-secondary bg-background-default transition-transform',
        'w-57.5 lg:w-[250px]',
        'md:sticky md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
      aria-label="Sidebar Navigation"
    >
      <div className="h-full overflow-y-auto">
        <Button
          aria-label="Close Sidebar"
          data-testid="close-sidebar-button"
          color="default"
          className="absolute z-50 rounded-full top-0 right-0 p-1.75 pt-1 md:hidden hover:bg-transparent"
          onPress={toggleSidebar}
        >
          <CloseIcon customClass="w-5 h-5" />
        </Button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center pl-2 cursor-pointer mb-2.75 lg:mb-3.25 h-20.5 lg:h-25 hover:opacity-100 active:opacity-100"
          aria-label="Logo"
        >
          <LogoIcon customClass="w-full text-text-secondary" />
        </Link>

        {/* Sidebar List */}
        <ul data-testid="sidebar-list">
          {items?.map((item) => {
            const isActive =
              location.pathname === item.link ||
              (location.pathname === '/' &&
                item.link === DESTINATION.DASHBOARD);

            return (
              <li
                key={item.label}
                aria-label="Sidebar item"
                data-testid="sidebar-item"
                className={`pl-7.5 py-3.75 lg:py-4.5 rounded-r-3xl border-l-5 list-none ${
                  isActive ? 'border-blue-200' : 'border-transparent'
                }`}
                onClick={toggleSidebar}
              >
                <Link
                  to={item.link}
                  className={`flex items-center transition-colors ${
                    isActive ? 'text-blue-200' : 'text-gray-200 opacity-80'
                  } hover:text-blue-200`}
                >
                  {item.icon}
                  <span className="ml-5 lg:ml-6.5 font-primary font-medium text-2xl lg:text-4xl">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default memo(Sidebar);
