import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/system';

export const wrapper = (children: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createRouter({
            history: createMemoryHistory(),
            routeTree: createRootRoute({
              component: () => <>{children}</>,
            }),
          })}
        />
      </QueryClientProvider>
    </NextUIProvider>,
  );
};

export * from '@testing-library/react';
export * from '@testing-library/user-event';
