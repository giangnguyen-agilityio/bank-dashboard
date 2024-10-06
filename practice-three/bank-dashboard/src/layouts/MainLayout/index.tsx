import { useNavigate } from '@tanstack/react-router';
import { ReactElement, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

// Constants
import { DESTINATION, SIDEBAR_LIST, TOAST_CONFIG } from '@app/constants';

// Stores
import { useAuthStore } from '@app/stores';

// Components
import { Container, Navbar, Sidebar } from '@app/components';

export interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();

    if (!isAuthenticated) {
      navigate({ to: DESTINATION.LOGIN });
    }
  }, [isAuthenticated, checkAuthStatus, navigate]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Container className="flex min-h-screen max-w-screen-lg p-0">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={handleToggleSidebar}
          items={SIDEBAR_LIST}
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
