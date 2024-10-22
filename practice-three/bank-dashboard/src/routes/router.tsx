import { createRouter } from '@tanstack/react-router';

// Routes
import {
  rootRoute,
  indexRoute,
  loginRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  notFoundRoutes,
  unauthorizedRoute,
} from '@app/routes';

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  ...notFoundRoutes,
  unauthorizedRoute,
]);

const router = createRouter({ routeTree });

export { router };
