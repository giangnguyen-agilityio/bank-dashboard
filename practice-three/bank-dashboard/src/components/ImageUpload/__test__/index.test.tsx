// Utils
import {
  render,
  screen,
  waitFor,
  userEvent,
  convertFileToBase64,
  isFileSizeValid,
  isFileTypeValid,
} from '@app/utils';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Components
import { ImageUpload } from '@app/components';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useMediaQuery: jest.fn(),
}));

jest.mock('@app/utils', () => ({
  ...jest.requireActual('@app/utils'),
  isFileSizeValid: jest.fn(),
  isFileTypeValid: jest.fn(),
  convertFileToBase64: jest.fn(),
}));

const mockOnAvatarUpload = jest.fn();

describe('ImageUpload Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isFileSizeValid as jest.Mock).mockReturnValue(true);
    (isFileTypeValid as jest.Mock).mockReturnValue(true);
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  it('should render Avatar component initially', () => {
    render(
      <ImageUpload
        avatarSrc="avatar.jpg"
        onAvatarUpload={mockOnAvatarUpload}
      />,
    );
    const avatar = screen.getByRole('img', { name: /avatar/i });

    expect(avatar).toBeInTheDocument();
  });

  it('should trigger file input click when Avatar is clicked', async () => {
    render(<ImageUpload onAvatarUpload={mockOnAvatarUpload} />);

    const fileInput = screen.getByTestId('avatar-upload-input');
    const avatar = screen.getByRole('img', { name: /avatar/i });

    await userEvent.click(avatar);

    expect(fileInput).toBeInTheDocument();
  });

  it('should upload and convert the file to base64 when file is valid', async () => {
    const base64String = 'base64image';

    (convertFileToBase64 as jest.Mock).mockResolvedValue(base64String);

    render(<ImageUpload onAvatarUpload={mockOnAvatarUpload} />);

    const file = new File(['dummy content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const fileInput = screen.getByTestId('avatar-upload-input');

    await userEvent.upload(fileInput, file);
    await waitFor(() =>
      expect(mockOnAvatarUpload).toHaveBeenCalledWith(base64String),
    );
  });

  it('should show error if file upload fails', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    (convertFileToBase64 as jest.Mock).mockRejectedValue(
      new Error('Upload failed'),
    );

    render(<ImageUpload onAvatarUpload={mockOnAvatarUpload} />);

    const file = new File(['dummy content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const fileInput = screen.getByTestId('avatar-upload-input');

    await userEvent.upload(fileInput, file);
  });

  it('should show error if file size exceeds the limit', async () => {
    (isFileSizeValid as jest.Mock).mockReturnValue(false);

    render(<ImageUpload onAvatarUpload={mockOnAvatarUpload} />);

    const file = new File(['dummy content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const fileInput = screen.getByTestId('avatar-upload-input');

    await userEvent.upload(fileInput, file);
  });

  it('should show error if file type is invalid', async () => {
    (isFileTypeValid as jest.Mock).mockReturnValue(false);

    render(<ImageUpload onAvatarUpload={mockOnAvatarUpload} />);

    const file = new File(['dummy content'], 'test.txt', {
      type: 'text/plain',
    });
    const fileInput = screen.getByTestId('avatar-upload-input');

    await userEvent.upload(fileInput, file);
  });
});
