import { useNavigate } from '@tanstack/react-router';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

// Constants
import { DESTINATION, SIDEBAR_LIST, TOAST_CONFIG } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

// Interfaces
import { AccountRole } from '@app/interfaces';

// Components
import { Container, Navbar, Sidebar } from '@app/components';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = useAuthStore(
    useShallow((state) => state.isAuthenticated),
  );
  const isAdmin = useAuthStore(useShallow((state) => state.isAdmin));
  const checkAuthStatus = useAuthStore(
    useShallow((state) => state.checkAuthStatus),
  );
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();

    if (!isAuthenticated) {
      navigate({ to: DESTINATION.LOGIN });
    }
  }, [isAuthenticated, checkAuthStatus, navigate]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  const userRole = isAdmin ? AccountRole.Admin : AccountRole.User;

  const filteredSidebarList = useMemo(() => {
    return SIDEBAR_LIST.filter(
      (item) => !item.hiddenForRoles?.includes(userRole),
    );
  }, [userRole]);

  return (
    <>
      <Container className="flex min-h-screen max-w-screen-lg p-0">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={handleToggleSidebar}
          items={filteredSidebarList}
        />

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-hidden" role="main">
          <Navbar onToggleSidebar={handleToggleSidebar} />
          <section
            className="flex-1 p-6 bg-background-primary md:px-6.25 lg:px-10"
            tabIndex={-1}
          >
            {children}
          </section>
        </main>
      </Container>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: TOAST_CONFIG.DURATION,
          success: TOAST_CONFIG.SUCCESS_COLOR,
          error: TOAST_CONFIG.ERROR_COLOR,
          style: TOAST_CONFIG.TEXT_COLOR,
        }}
      />
    </>
  );
};

export default MainLayout;
