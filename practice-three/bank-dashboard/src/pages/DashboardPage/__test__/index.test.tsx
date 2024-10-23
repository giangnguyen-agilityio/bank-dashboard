// Utils
import { render } from '@app/utils';

// Pages
import { DashboardPage } from '@app/pages';

// Hooks
import { useMediaQuery } from '@app/hooks';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

describe('DashboardPage', () => {
  it('should renders the DashboardPage correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { container } = render(<DashboardPage />);

    expect(container).toMatchSnapshot();
  });
});
