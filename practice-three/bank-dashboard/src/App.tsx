import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import toast, { Toaster } from 'react-hot-toast';

// Routes
import { router } from '@app/routes';

// Constants
import { TOAST_CONFIG } from '@app/constants';

// Providers
import { ThemeProvider } from '@app/providers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
  }),
});

const App = () => {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: TOAST_CONFIG.DURATION,
          success: TOAST_CONFIG.SUCCESS_COLOR,
          error: TOAST_CONFIG.ERROR_COLOR,
          style: TOAST_CONFIG.TEXT_COLOR,
        }}
      />
    </>
  );
};

export default App;
