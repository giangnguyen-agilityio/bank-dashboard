import { lazy, ReactElement } from 'react';
import { createRoute } from '@tanstack/react-router';

// Routes
import { rootRoute } from '@app/routes';

// Constants
import { DESTINATION } from '@app/constants';

// Interfaces
import { AccountRole } from '@app/interfaces';

// Layouts
import { MainLayout } from '@app/layouts';

// Utils
import { authorizeUserRole } from '@app/utils';

// Components
const ErrorFallback = lazy(
  () => import('@app/components/common/ErrorFallback'),
);

// Pages
const AccountPage = lazy(() => import('@app/pages/AccountPage'));
const LoginPage = lazy(() => import('@app/pages/LoginPage'));
const SettingPage = lazy(() => import('@app/pages/SettingPage'));
const TransactionPage = lazy(() => import('@app/pages/TransactionPage'));

const renderWithMainLayout = (Component: ReactElement) => (
  <MainLayout>{Component}</MainLayout>
);

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => renderWithMainLayout(<TransactionPage />),
  errorComponent: () => renderWithMainLayout(<ErrorFallback />),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.LOGIN,
  component: () => <LoginPage />,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.TRANSACTIONS,
  component: () => renderWithMainLayout(<TransactionPage />),
  loader: authorizeUserRole(AccountRole.User),
  errorComponent: () => renderWithMainLayout(<ErrorFallback />),
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.ACCOUNTS,
  component: () => renderWithMainLayout(<AccountPage />),
  loader: authorizeUserRole(AccountRole.Admin),
  errorComponent: () => renderWithMainLayout(<ErrorFallback />),
});

const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: DESTINATION.SETTING,
  component: () => renderWithMainLayout(<SettingPage />),
  errorComponent: () => renderWithMainLayout(<ErrorFallback />),
});

export {
  indexRoute,
  loginRoute,
  transactionRoute,
  accountsRoute,
  settingRoute,
};
