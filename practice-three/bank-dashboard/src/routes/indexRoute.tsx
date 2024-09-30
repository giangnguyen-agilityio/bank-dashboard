import { createRoute } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Dashboard</div>,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.DASHBOARD,
  component: () => <div>Dashboard</div>,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.TRANSACTIONS,
  component: () => <div>Transactions</div>,
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.ACCOUNTS,
  component: () => <div>Accounts</div>,
});

const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.SETTING,
  component: () => <div>Setting</div>,
});

export {
  indexRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
};
