import { useLocation } from '@tanstack/react-router';
import {
  Navbar as NavbarNextUI,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

// Icons
import { MenuIcon, SettingIcon, NotificationIcon } from '@app/assets';

// Utils
import { getHeadingFromPathname } from '@app/utils';

// Components
import { Text, Button, Avatar } from '@app/components';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const heading = getHeadingFromPathname(pathname);

  return (
    <NavbarNextUI
      aria-label="Main Navigation"
      data-testid="navbar"
      position="sticky"
      className="z-10 w-full border-b-1 border-border-secondary bg-background-default h-20.5 lg:h-25"
      classNames={{
        wrapper: 'max-w-screen-lg px-6 md:px-6.25 lg:px-10',
      }}
    >
      <NavbarContent
        data-testid="navbar-content"
        className="flex w-full items-center gap-4 !justify-between md:justify-end"
      >
        <NavbarItem data-testid="navbar-item" className="md:hidden">
          <Button
            aria-label="Open sidebar"
            variant="light"
            color="default"
            className="rounded-none p-0"
            onPress={onToggleSidebar}
          >
            <MenuIcon />
          </Button>
        </NavbarItem>
        <NavbarItem data-testid="navbar-item" className="h-full flex">
          <Text
            as="h2"
            variant="heading"
            customClass="content-center capitalize text-5xl md:text-7xl lg:text-8xl"
          >
            {heading}
          </Text>
        </NavbarItem>
        <NavbarItem
          data-testid="navbar-item"
          className="flex items-center gap-4"
        >
          <Button
            aria-label="Settings"
            variant="light"
            color="default"
            className="hidden rounded-full bg-background-primary size-10 lg:size-12.5 md:flex"
          >
            <SettingIcon />
          </Button>
          <Button
            aria-label="Notifications"
            variant="light"
            color="default"
            className="hidden rounded-full bg-background-primary size-10 lg:size-12.5 md:flex"
          >
            <NotificationIcon />
          </Button>

          <Avatar size="sm" />
        </NavbarItem>
      </NavbarContent>
    </NavbarNextUI>
  );
};

export default Navbar;
