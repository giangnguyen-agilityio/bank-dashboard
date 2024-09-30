import { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

// Layouts
import { MainLayout } from '@app/layouts';

// Components
import { ErrorFallback, NotFoundFallback, Spinner } from '@app/components';

const rootRoute = createRootRoute({
  component: () => (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  ),
  errorComponent: () => <ErrorFallback />,
  notFoundComponent: () => <NotFoundFallback />,
});

export { rootRoute };
