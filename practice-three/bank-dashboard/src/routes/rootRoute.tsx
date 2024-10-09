import { lazy, Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

// Components
const ErrorFallback = lazy(
  () => import('@app/components/common/ErrorFallback'),
);
const NotFoundFallback = lazy(
  () => import('@app/components/common/NotFoundFallback'),
);
const Spinner = lazy(() => import('@app/components/common/Spinner'));

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
