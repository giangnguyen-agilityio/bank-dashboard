import { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

// Components
import { ErrorFallback, NotFoundFallback, Spinner } from '@app/components';

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  ),
  errorComponent: () => <ErrorFallback />,
  notFoundComponent: () => <NotFoundFallback />,
});

export { rootRoute };
