import { createRouter } from '@tanstack/react-router';

// Routes
import {
  rootRoute,
  indexRoute,
  loginRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  notFoundRoutes,
} from '@app/routes';

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
  ...notFoundRoutes,
]);

const router = createRouter({ routeTree });

export { router };
