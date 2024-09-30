import { ReactElement } from 'react';
import { useDisclosure } from '@nextui-org/react';

// Constants
import { SIDEBAR_LIST } from '@app/constants';

// Components
import { Container, Navbar, Sidebar } from '@app/components';

export interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isOpen: isSidebarOpen, onOpenChange: toggleSidebar } =
    useDisclosure();

  return (
    <>
      <Container className="flex min-h-screen max-w-screen-lg p-0">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          items={SIDEBAR_LIST}
        />

        {/* Main Content */}
        <main className="flex flex-1 flex-col" role="main">
          <Navbar onToggleSidebar={toggleSidebar} />
          <section
            className="flex-1 p-6 bg-background-primary md:px-6.25 lg:px-10"
            tabIndex={-1}
          >
            {children}
          </section>
        </main>
      </Container>
    </>
  );
};

export default MainLayout;
