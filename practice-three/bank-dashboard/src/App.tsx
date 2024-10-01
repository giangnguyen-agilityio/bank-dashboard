import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { NextUIProvider } from '@nextui-org/system';

// Routes
import { router } from '@app/routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NextUIProvider>
  );
};

export default App;
