import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

// Icons
import { LogoIcon, CloseIcon } from '@app/assets';

// Components
import { Button, SidebarItem } from '@app/components';

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
  return (
    <aside
      data-testid="sidebar"
      className={`fixed top-0 left-0 z-50 h-screen w-57.5 lg:w-[250px] border-r border-border-secondary bg-background-default transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:sticky md:translate-x-0`}
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
          as="h1"
          className="flex items-center pl-2 cursor-pointer mb-2.75 lg:mb-3.25 h-20.5 lg:h-25 hover:opacity-100 active:opacity-100"
          aria-label="Logo"
        >
          <LogoIcon customClass="w-full text-text-secondary" />
        </Link>

        {/* Sidebar List */}
        <ul data-testid="sidebar-list">
          {items?.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              link={item.link}
              onToggleSidebar={toggleSidebar}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
