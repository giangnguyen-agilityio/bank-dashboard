// Utils
import { render } from '@app/utils';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Mocks
import {
  ACTIVITY_CHART_DATA,
  ACTIVITY_CHART_LABELS,
  BALANCE_CHART_DATA,
  BALANCE_CHART_LABELS,
  EXPENSE_STATISTICS_CHART_DATA,
  EXPENSE_STATISTICS_CHART_LABELS,
} from '@app/mocks';

// Components
import {
  ActivityChart,
  BalanceChart,
  ExpenseStatisticsChart,
} from '@app/components';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

describe('ActivityChart Component', () => {
  it('should renders the ActivityChart correctly', () => {
    const { container } = render(
      <ActivityChart
        series={ACTIVITY_CHART_DATA}
        labels={ACTIVITY_CHART_LABELS}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders the ActivityChart with desktop breakpoint correctly', () => {
    const { container } = render(<ActivityChart />);

    expect(container).toMatchSnapshot();
  });

  it('should renders the ActivityChart mobile breakpoint correctly', () => {
    const { container } = render(<ActivityChart />);

    expect(container).toMatchSnapshot();
  });
});

describe('BalanceChart Component', () => {
  it('should renders the BalanceChart correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { container } = render(
      <BalanceChart
        series={BALANCE_CHART_DATA}
        labels={BALANCE_CHART_LABELS}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders the BalanceChart with breakpoints correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { container } = render(<BalanceChart />);

    expect(container).toMatchSnapshot();
  });
});

describe('ExpenseStatisticsChart Component', () => {
  it('should renders the ExpenseStatisticsChart correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { container } = render(
      <ExpenseStatisticsChart
        series={EXPENSE_STATISTICS_CHART_DATA}
        labels={EXPENSE_STATISTICS_CHART_LABELS}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders the ExpenseStatisticsChart with breakpoints correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { container } = render(<ExpenseStatisticsChart />);

    expect(container).toMatchSnapshot();
  });
});
