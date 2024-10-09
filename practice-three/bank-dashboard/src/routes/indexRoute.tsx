import { lazy } from 'react';
import { createRoute } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

// MainLayout
import { MainLayout } from '@app/layouts';

// Pages
const AccountPage = lazy(() => import('@app/pages/AccountPage/'));
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
  transactionRoute,
  accountsRoute,
  settingRoute,
};
