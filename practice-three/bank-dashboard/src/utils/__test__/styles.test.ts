import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utils
import { cn } from '@app/utils';

jest.mock('clsx', () => ({
  ...jest.requireActual('clsx'),
  clsx: jest.fn(),
}));

jest.mock('tailwind-merge', () => ({
  ...jest.requireActual('tailwind-merge'),
  twMerge: jest.fn(),
}));

describe('cn utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should combine classes using clsx and twMerge', () => {
    const mockClasses: ClassValue[] = ['class1', 'class2'];
    const clsxResult = 'class1 class2';
    const twMergeResult = 'class1 class2-merged';

    (clsx as jest.Mock).mockReturnValue(clsxResult);
    (twMerge as jest.Mock).mockReturnValue(twMergeResult);

    const result = cn(...mockClasses);

    expect(clsx).toHaveBeenCalledWith(mockClasses);
    expect(twMerge).toHaveBeenCalledWith(clsxResult);
    expect(result).toBe(twMergeResult);
  });

  it('should handle empty input gracefully', () => {
    const clsxResult = '';
    const twMergeResult = '';

    (clsx as jest.Mock).mockReturnValue(clsxResult);
    (twMerge as jest.Mock).mockReturnValue(twMergeResult);

    const result = cn();

    expect(clsx).toHaveBeenCalledWith([]);
    expect(twMerge).toHaveBeenCalledWith(clsxResult);
    expect(result).toBe(twMergeResult);
  });

  it('should combine conditional classes correctly', () => {
    const mockClasses: ClassValue[] = ['class1', false, 'class3'];
    const clsxResult = 'class1 class3';
    const twMergeResult = 'class1 class3';

    (clsx as jest.Mock).mockReturnValue(clsxResult);
    (twMerge as jest.Mock).mockReturnValue(twMergeResult);

    const result = cn(...mockClasses);

    expect(clsx).toHaveBeenCalledWith(mockClasses);
    expect(twMerge).toHaveBeenCalledWith(clsxResult);
    expect(result).toBe(twMergeResult);
  });

  it('should handle Tailwind class conflicts correctly with twMerge', () => {
    const mockClasses: ClassValue[] = ['p-2', 'p-4']; // Tailwind padding conflict
    const clsxResult = 'p-2 p-4';
    const twMergeResult = 'p-4'; // twMerge resolves to the latest class

    (clsx as jest.Mock).mockReturnValue(clsxResult);
    (twMerge as jest.Mock).mockReturnValue(twMergeResult);

    const result = cn(...mockClasses);

    expect(clsx).toHaveBeenCalledWith(mockClasses);
    expect(twMerge).toHaveBeenCalledWith(clsxResult);
    expect(result).toBe(twMergeResult);
  });
});
