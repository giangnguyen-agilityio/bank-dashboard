import { render, screen, fireEvent } from '@testing-library/react';

import { Pagination } from '@app/components';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  const renderPagination = (props = {}) => {
    return render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
        {...props}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination correctly', () => {
    renderPagination();

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });

  it('should call onPageChange with currentPage - 1 when clicking the prev button', () => {
    renderPagination({ currentPage: 2 });

    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with currentPage + 1 when clicking the next button', () => {
    renderPagination({ currentPage: 2 });

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable prev button when currentPage is 1', () => {
    renderPagination({ currentPage: 1 });

    const prevButton = screen.getByTestId('prev-button');

    expect(prevButton).toBeDisabled();
  });

  it('should disable next button when currentPage is totalPages', () => {
    renderPagination({ currentPage: 5, totalPages: 5 });

    const nextButton = screen.getByTestId('next-button');

    expect(nextButton).toBeDisabled();
  });

  it('should render the default current page when it is not provided', () => {
    renderPagination({ totalPages: 5, currentPage: undefined });

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
