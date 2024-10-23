// Utils
import { render } from '@app/utils';

// Components
import {
  ActivityChart,
  BalanceChart,
  ExpenseStatisticsChart,
} from '@app/components';

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

describe('ActivityChart Component', () => {
  it('should renders the ActivityChart correctly', () => {
    (useMediaQuery as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const { container } = render(<ActivityChart />);

    expect(container).toMatchSnapshot();
  });

  it('should renders the ActivityChart with desktop breakpoint correctly', () => {
    (useMediaQuery as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const { container } = render(<ActivityChart />);

    expect(container).toMatchSnapshot();
  });

  it('should renders the ActivityChart mobile breakpoint correctly', () => {
    (useMediaQuery as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    const { container } = render(<ActivityChart />);

    expect(container).toMatchSnapshot();
  });
});

describe('BalanceChart Component', () => {
  it('should renders the BalanceChart correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    const { container } = render(<BalanceChart />);

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

    const { container } = render(<ExpenseStatisticsChart />);

    expect(container).toMatchSnapshot();
  });

  it('should renders the ExpenseStatisticsChart with breakpoints correctly', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { container } = render(<ExpenseStatisticsChart />);

    expect(container).toMatchSnapshot();
  });
});
