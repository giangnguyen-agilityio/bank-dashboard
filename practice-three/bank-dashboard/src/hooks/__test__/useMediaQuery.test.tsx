// Utils
import { renderHook, act } from '@app/utils';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Mock window.matchMedia
function createMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

describe('useMediaQuery hook', () => {
  beforeAll(() => {
    // Mock window.matchMedia before each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: createMatchMedia(false), // Default non-matching query
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history between tests
  });

  it('should return true when media query matches', () => {
    // Mock window.matchMedia to match the query
    window.matchMedia = createMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true); // Query should match
  });

  it('should return false when media query does not match', () => {
    // Mock window.matchMedia to not match the query
    window.matchMedia = createMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false); // Query should not match
  });

  it('should update the match state when the query changes', () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: '(min-width: 768px)' },
      },
    );

    // Initially, the media query should not match
    expect(result.current).toBe(false);

    // Simulate a media query match by triggering the change event
    act(() => {
      mockAddEventListener.mock.calls[0][1]({ matches: true });
    });

    // After the media query change, it should match
    expect(result.current).toBe(true);

    // Clean-up: should remove event listener
    rerender({ query: '(min-width: 1024px)' });
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
});
