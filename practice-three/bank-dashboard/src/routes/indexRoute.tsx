import { lazy } from 'react';
import { createRoute, redirect } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

// MainLayout
import { MainLayout } from '@app/layouts';

// Utils
import { checkUserRole } from '@app/utils';

// Pages
const AccountPage = lazy(() => import('@app/pages/AccountPage'));
const LoginPage = lazy(() => import('@app/pages/LoginPage'));
const SettingPage = lazy(() => import('@app/pages/SettingPage'));
const TransactionPage = lazy(() => import('@app/pages/TransactionPage'));

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <MainLayout>
      <TransactionPage />
    </MainLayout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.LOGIN,
  component: () => <LoginPage />,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.TRANSACTIONS,
  component: () => (
    <MainLayout>
      <TransactionPage />
    </MainLayout>
  ),
  loader: async () => {
    if (checkUserRole()) {
      throw redirect({
        to: DESTINATION.UNAUTHORIZED,
      });
    }
  },
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.ACCOUNTS,
  component: () => (
    <MainLayout>
      <AccountPage />
    </MainLayout>
  ),
  loader: async () => {
    if (!checkUserRole()) {
      throw redirect({
        to: DESTINATION.UNAUTHORIZED,
      });
    }
  },
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
  transactionRoute,
  accountsRoute,
  settingRoute,
};
