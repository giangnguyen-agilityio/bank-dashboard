import { Meta, StoryObj } from '@storybook/react';
import {
  BrandCardIcon,
  ChipCardIcon,
  CloseIcon,
  CreditCardIcon,
  DeleteIcon,
  EconometricIcon,
  EditIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  HomeIcon,
  InvestmentIcon,
  LeftArrowIcon,
  LoanIcon,
  LoadingIcon,
  LogoutIcon,
  MenuIcon,
  MoneyIcon,
  MoreVerticalIcon,
  NotificationIcon,
  PaypalIcon,
  RightArrowIcon,
  SendIcon,
  ServiceIcon,
  SettingIcon,
  TransferIcon,
  UpArrowIcon,
  UserIcon,
  WalletIcon,
} from '@app/assets';

const icons = [
  { component: BrandCardIcon, label: 'Brand Card' },
  { component: ChipCardIcon, label: 'Chip Card' },
  { component: CloseIcon, label: 'Close' },
  { component: CreditCardIcon, label: 'Credit Card' },
  { component: DeleteIcon, label: 'Delete' },
  { component: EconometricIcon, label: 'Econometric' },
  { component: EditIcon, label: 'Edit' },
  { component: EyeFilledIcon, label: 'Eye Filled' },
  { component: EyeSlashFilledIcon, label: 'Eye Slash' },
  { component: HomeIcon, label: 'Home' },
  { component: InvestmentIcon, label: 'Investment' },
  { component: LeftArrowIcon, label: 'Left Arrow' },
  { component: LoanIcon, label: 'Loan' },
  { component: LoadingIcon, label: 'Loading' },
  { component: LogoutIcon, label: 'Logout' },
  { component: MenuIcon, label: 'Menu' },
  { component: MoneyIcon, label: 'Money' },
  { component: MoreVerticalIcon, label: 'More Vertical' },
  { component: NotificationIcon, label: 'Notification' },
  { component: PaypalIcon, label: 'Paypal' },
  { component: RightArrowIcon, label: 'Right Arrow' },
  { component: SendIcon, label: 'Send' },
  { component: ServiceIcon, label: 'Service' },
  { component: SettingIcon, label: 'Setting' },
  { component: TransferIcon, label: 'Transfer' },
  { component: UpArrowIcon, label: 'Up Arrow' },
  { component: UserIcon, label: 'User' },
  { component: WalletIcon, label: 'Wallet' },
];

const meta: Meta = {
  title: 'Components/IconGallery',
  component: BrandCardIcon,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    customClass: {
      control: { type: 'text' },
      description: 'Custom CSS class via TailwindCSS for styling the icon',
    },
  },
};

export default meta;

type Story = StoryObj<{ customClass: string }>;

const IconGallery = ({ customClass }: { customClass?: string }) => (
  <div className="grid grid-cols-6 gap-4">
    {icons.map(({ component: IconComponent, label }, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <IconComponent customClass={customClass} />
        <span className="text-base mt-2">{label}</span>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    customClass: 'text-black-100',
  },
  render: (args) => <IconGallery customClass={args.customClass} />,
};
