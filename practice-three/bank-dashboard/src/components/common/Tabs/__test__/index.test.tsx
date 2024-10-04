import { ReactNode } from 'react';

// Utils
import { render, screen } from '@app/utils';

// Mock
import { MOCK_TAB_DATA } from '@app/mocks';

// Components
import { CustomTabs } from '@app/components';

describe('CustomTabs Component', () => {
  it('should renders the CustomTabs correctly without crashing', () => {
    render(
      <CustomTabs
        tabs={MOCK_TAB_DATA}
        selectedKey="login"
        onSelectionChange={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should not renders the CustomTabs when the tabs is empty', () => {
    render(
      <CustomTabs
        tabs={
          undefined as unknown as {
            key: string | number | null;
            title: string;
            tabContent: ReactNode;
          }[]
        }
        selectedKey="login"
        onSelectionChange={() => {}}
      />,
    );

    expect(screen.queryByTestId('custom-tab-item')).not.toBeInTheDocument();
  });
});
