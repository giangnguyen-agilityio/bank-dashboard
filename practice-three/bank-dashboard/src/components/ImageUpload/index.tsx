import { ChangeEvent, memo, useRef, useState } from 'react';
import { Progress } from '@nextui-org/react';
import toast from 'react-hot-toast';

// Constants
import { ERROR_MESSAGE, SCREEN_WIDTH } from '@app/constants';

// Hooks
import { useMediaQuery } from '@app/hooks';

// Utils
import {
  cn,
  convertFileToBase64,
  isFileSizeValid,
  isFileTypeValid,
} from '@app/utils';

// Components
import { Avatar, Box } from '@app/components';

interface ImageUploadProps {
  avatarSrc?: string;
  onAvatarUpload: (base64: string) => void;
}

const ImageUpload = ({ avatarSrc, onAvatarUpload }: ImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_WIDTH.sm})`);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleValidateAndUploadImage(file);
  };

  const handleValidateAndUploadImage = (file: File) => {
    if (!isFileSizeValid(file.size)) {
      return toast.error(ERROR_MESSAGE.IMAGE_SIZE_EXCEEDED);
    }
    if (!isFileTypeValid(file.name)) {
      return toast.error(ERROR_MESSAGE.ONLY_IMAGE_FILES_ALLOWED);
    }

    handleUploadImage(file);
  };

  const handleUploadImage = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      const base64 = await convertFileToBase64(file);
      setProgress(100);
      onAvatarUpload(base64);

      setTimeout(() => setIsUploading(false), 500);
    } catch (error) {
      toast.error(String(error));
      setIsUploading(false);
    }
  };

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  return (
    <Box
      className="upload-image-field cursor-pointer"
      title="Click to upload avatar"
    >
      {isUploading ? (
        <Box
          className={cn(
            'flex flex-col items-center justify-center',
            'rounded-full border border-border-secondary',
            isMobile ? 'w-42.5 h-42.5' : 'w-32.5 h-32.5',
          )}
        >
          <Progress
            aria-label="Uploading..."
            label="Uploading..."
            size="sm"
            classNames={{
              base: 'w-3/4',
              labelWrapper: 'w-full justify-center',
              indicator: 'bg-background-secondary',
            }}
            value={progress}
          />
        </Box>
      ) : (
        <Avatar
          hasBorder
          radius="full"
          color="default"
          customClass="text-white-100"
          size={isMobile ? '3xl' : '2xl'}
          src={avatarSrc}
          onUpload={handleAvatarClick}
        />
      )}
      <input
        ref={inputRef}
        data-testid="avatar-upload-input"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default memo(ImageUpload);
