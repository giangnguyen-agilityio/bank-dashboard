import { NextUIProvider } from '@nextui-org/system';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@app/routes';

const App = () => {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
};

export default App;
