import { createRoute } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

// Pages
import { LoginPage, TransactionPage } from '@app/pages';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Dashboard</div>,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.LOGIN,
  component: () => <LoginPage />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.DASHBOARD,
  component: () => <div>Dashboard</div>,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.TRANSACTIONS,
  component: () => <TransactionPage />,
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
  loginRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
};
