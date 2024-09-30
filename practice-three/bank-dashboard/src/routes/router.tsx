import { createRouter } from '@tanstack/react-router';

// Routes
import {
  rootRoute,
  indexRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  notFoundRoutes,
} from '@app/routes';

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  ...notFoundRoutes,
]);

const router = createRouter({ routeTree });

export { router };
