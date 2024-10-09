import { lazy } from 'react';
import { createRoute } from '@tanstack/react-router';

// Constants
import { DESTINATION, NOTIFICATIONS } from '@app/constants';

// Routes
import { rootRoute } from '@app/routes';

// Layouts
import { MainLayout } from '@app/layouts';

// Components
const NotFoundFallback = lazy(
  () => import('@app/components/common/NotFoundFallback'),
);

const notFoundRoutes = [
  DESTINATION.DASHBOARD,
  DESTINATION.INVESTMENTS,
  DESTINATION.CREDIT_CARDS,
  DESTINATION.LOANS,
  DESTINATION.SERVICES,
  DESTINATION.PRIVILEGES,
].map((path) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => (
      <MainLayout>
        <NotFoundFallback
          title="Coming Soon!!"
          message={NOTIFICATIONS.COMING_SOON_PAGE}
        />
      </MainLayout>
    ),
  }),
);

export { notFoundRoutes };
