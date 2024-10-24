// Utils
import { wrapper, screen } from '@app/utils';

// Components
import { NotFoundFallback } from '@app/components';

describe('NotFoundFallback Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  it('should renders correctly with title and message', () => {
    const customTitle = 'The sample title';
    const customMessage = 'The sample message';

    wrapper(<NotFoundFallback title={customTitle} message={customMessage} />);

    const title = screen.getByTestId('title');
    const message = screen.getByTestId('message');

    expect(title).toHaveTextContent(customTitle);
    expect(message).toHaveTextContent(customMessage);
  });

  it('should renders correctly without crashing', () => {
    const { container } = wrapper(<NotFoundFallback />);

    expect(container).toMatchSnapshot();
  });
});
