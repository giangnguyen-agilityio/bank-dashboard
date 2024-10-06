import { createRoute } from '@tanstack/react-router';

// Constants
import { DESTINATION, NOTIFICATIONS } from '@app/constants';

// Routes
import { rootRoute } from '@app/routes';

// Layouts
import { MainLayout } from '@app/layouts';

// Components
import { NotFoundFallback } from '@app/components';

const notFoundRoutes = [
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
