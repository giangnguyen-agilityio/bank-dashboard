import React from 'react';
import type { Preview } from '@storybook/react';

//Providers
import { NextUIProvider } from '@nextui-org/react';

// Styles
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <NextUIProvider>
        <Story />
      </NextUIProvider>
    ),
  ],

  tags: ['autodocs'],
};

export default preview;
