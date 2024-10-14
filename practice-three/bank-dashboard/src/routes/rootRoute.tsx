import { lazy, Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

// Components
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
  notFoundComponent: () => <NotFoundFallback />,
});

export { rootRoute };
