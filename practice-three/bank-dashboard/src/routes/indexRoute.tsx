import { createRoute } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

// MainLayout
import { MainLayout } from '@app/layouts';

// Pages
import {
  AccountPage,
  LoginPage,
  SettingPage,
  TransactionPage,
} from '@app/pages';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <MainLayout>
      <div>Dashboard</div>
    </MainLayout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.LOGIN,
  component: () => <LoginPage />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.DASHBOARD,
  component: () => (
    <MainLayout>
      <div>Dashboard</div>
    </MainLayout>
  ),
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.TRANSACTIONS,
  component: () => (
    <MainLayout>
      <TransactionPage />
    </MainLayout>
  ),
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.ACCOUNTS,
  component: () => (
    <MainLayout>
      <AccountPage />
    </MainLayout>
  ),
});

const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.SETTING,
  component: () => (
    <MainLayout>
      <SettingPage />
    </MainLayout>
  ),
});

export {
  indexRoute,
  loginRoute,
  dashboardRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
};
