/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@app/utils';
import { SettingPage } from '@app/pages';
import { SETTING_TABS } from '@app/constants';

jest.mock('@app/components', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CustomTabs: ({ tabs, selectedKey, onSelectionChange }: any) => (
    <div>
      {tabs.map((tab: any) => (
        <button
          key={tab.key}
          aria-label={tab.title}
          onClick={() => onSelectionChange(tab.key)}
        >
          {tab.title}
        </button>
      ))}
      <div>{tabs.find((tab: any) => tab.key === selectedKey)?.tabContent}</div>
    </div>
  ),
  SettingForm: () => <div>Setting Form</div>,
  SecurityForm: () => <div>Security Form</div>,
}));

describe('SettingPage', () => {
  it('should render the correct tabs and initial content', () => {
    render(<SettingPage />);

    expect(
      screen.getByLabelText(SETTING_TABS.EDIT_PROFILE.TITLE),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(SETTING_TABS.SECURITY.TITLE),
    ).toBeInTheDocument();

    expect(screen.getByText('Setting Form')).toBeInTheDocument();
    expect(screen.queryByText('Security Form')).not.toBeInTheDocument();
  });

  it('should switch to the correct tab content when clicked', () => {
    render(<SettingPage />);

    fireEvent.click(screen.getByLabelText(SETTING_TABS.SECURITY.TITLE));

    expect(screen.getByText('Security Form')).toBeInTheDocument();
    expect(screen.queryByText('Setting Form')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(SETTING_TABS.EDIT_PROFILE.TITLE));

    expect(screen.getByText('Setting Form')).toBeInTheDocument();
    expect(screen.queryByText('Security Form')).not.toBeInTheDocument();
  });
});
