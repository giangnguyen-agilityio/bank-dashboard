import { UserIcon } from '@app/assets';
import { AccountRole, IAccountData, IAccountStatusItem } from '@app/interfaces';

const MOCK_ACCOUNT_STATUS_BAR_DATA: IAccountStatusItem[] = [
  {
    icon: UserIcon,
    title: 'Total Accounts',
    quantity: 20,
    backgroundColor: 'bg-blue-15',
  },
  {
    icon: UserIcon,
    title: 'Active Accounts',
    quantity: 18,
    backgroundColor: 'bg-green-50',
  },
  {
    icon: UserIcon,
    title: 'Inactive Accounts',
    quantity: 2,
    backgroundColor: 'bg-white-200',
  },
];

const MOCK_ACCOUNTS_DATA: IAccountData[] = [
  {
    id: 'ACC001',
    name: 'John Doe',
    username:
      'loremipsumdasdsad5as65d58q5s7d8q7w8e7qw8e78qw7e89wq79e87wq8e75as4da2s4545',
    password: 'password123',
    email:
      'jdoe@example.comloremipsumdasdsad5as65d58q5s7d8q7w8e7qw8e78qw7e89wq79e87wq8e75as4da2s4545',
    dateOfBirth: '1990-01-01',
    presentAddress: '123 Main St, Apt 4',
    permanentAddress: '456 Maple St',
    city: 'New York',
    postalCode: '10001',
    county: 'New York',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC002',
    name: 'Jane Smith',
    username: 'jsmith',
    password: 'securePass456',
    email: 'jsmith@example.com',
    dateOfBirth: '1985-05-12',
    presentAddress: '789 Elm St',
    permanentAddress: '101 Oak St',
    city: 'Los Angeles',
    postalCode: '90001',
    county: 'Los Angeles',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC003',
    name: 'Robert Brown',
    username: 'rbrown',
    password: 'myPass789',
    email: 'rbrown@example.com',
    dateOfBirth: '1992-07-20',
    presentAddress: '456 Pine St',
    permanentAddress: '123 Cedar St',
    city: 'Chicago',
    postalCode: '60601',
    county: 'Cook',
    status: false,
    role: AccountRole.Admin,
  },
  {
    id: 'ACC004',
    name: 'Emily Johnson',
    username: 'ejohnson',
    password: 'emily123',
    email: 'ejohnson@example.com',
    dateOfBirth: '1988-09-15',
    presentAddress: '789 Birch St',
    permanentAddress: '234 Fir St',
    city: 'Houston',
    postalCode: '77001',
    county: 'Harris',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC005',
    name: 'Michael White',
    username: 'mwhite',
    password: 'whitePass101',
    email: 'mwhite@example.com',
    dateOfBirth: '1995-12-10',
    presentAddress: '123 Palm St',
    permanentAddress: '456 Oak Ave',
    city: 'Phoenix',
    postalCode: '85001',
    county: 'Maricopa',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC006',
    name: 'Jessica Lee',
    username: 'jlee',
    password: 'jessicaLee',
    email: 'jlee@example.com',
    dateOfBirth: '1993-02-25',
    presentAddress: '789 Willow St',
    permanentAddress: '101 Poplar Ave',
    city: 'Philadelphia',
    postalCode: '19101',
    county: 'Philadelphia',
    status: false,
    role: AccountRole.User,
  },
  {
    id: 'ACC007',
    name: 'David Green',
    username: 'dgreen',
    password: 'greenPass789',
    email: 'dgreen@example.com',
    dateOfBirth: '1986-08-30',
    presentAddress: '234 Cedar Ave',
    permanentAddress: '456 Elm Blvd',
    city: 'San Antonio',
    postalCode: '78201',
    county: 'Bexar',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC008',
    name: 'Sarah Wilson',
    username: 'swilson',
    password: 'swilson321',
    email: 'swilson@example.com',
    dateOfBirth: '1991-04-18',
    presentAddress: '567 Maple St',
    permanentAddress: '890 Birch St',
    city: 'San Diego',
    postalCode: '92101',
    county: 'San Diego',
    status: true,
    role: AccountRole.Admin,
  },
  {
    id: 'ACC009',
    name: 'Daniel Martin',
    username: 'dmartin',
    password: 'danielPass234',
    email: 'dmartin@example.com',
    dateOfBirth: '1984-11-02',
    presentAddress: '234 Spruce St',
    permanentAddress: '678 Pine St',
    city: 'Dallas',
    postalCode: '75201',
    county: 'Dallas',
    status: false,
    role: AccountRole.User,
  },
  {
    id: 'ACC010',
    name: 'Laura Garcia',
    username: 'lgarcia',
    password: 'lauraPass567',
    email: 'lgarcia@example.com',
    dateOfBirth: '1990-06-22',
    presentAddress: '890 Fir St',
    permanentAddress: '123 Chestnut St',
    city: 'San Jose',
    postalCode: '95101',
    county: 'Santa Clara',
    status: true,
    role: AccountRole.Admin,
  },
  {
    id: 'ACC011',
    name: 'Christopher Martinez',
    username: 'cmartinez',
    password: 'chrisPass678',
    email: 'cmartinez@example.com',
    dateOfBirth: '1982-03-15',
    presentAddress: '567 Oak St',
    permanentAddress: '234 Cedar Ave',
    city: 'Austin',
    postalCode: '73301',
    county: 'Travis',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC012',
    name: 'Emily Rodriguez',
    username: 'erodriguez',
    password: 'emilyPass789',
    email: 'erodriguez@example.com',
    dateOfBirth: '1994-09-30',
    presentAddress: '345 Willow St',
    permanentAddress: '456 Palm Blvd',
    city: 'Jacksonville',
    postalCode: '32201',
    county: 'Duval',
    status: false,
    role: AccountRole.User,
  },
  {
    id: 'ACC013',
    name: 'Matthew Perez',
    username: 'mperez',
    password: 'matthewPass890',
    email: 'mperez@example.com',
    dateOfBirth: '1987-12-05',
    presentAddress: '456 Maple Ave',
    permanentAddress: '789 Elm Blvd',
    city: 'Fort Worth',
    postalCode: '76101',
    county: 'Tarrant',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC014',
    name: 'Olivia Hall',
    username: 'ohall',
    password: 'oliviaPass901',
    email: 'ohall@example.com',
    dateOfBirth: '1992-05-21',
    presentAddress: '678 Cedar St',
    permanentAddress: '123 Fir Blvd',
    city: 'Columbus',
    postalCode: '43201',
    county: 'Franklin',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC015',
    name: 'James Young',
    username: 'jyoung',
    password: 'jamesPass234',
    email: 'jyoung@example.com',
    dateOfBirth: '1989-08-17',
    presentAddress: '234 Birch St',
    permanentAddress: '567 Pine St',
    city: 'San Francisco',
    postalCode: '94101',
    county: 'San Francisco',
    status: false,
    role: AccountRole.User,
  },
  {
    id: 'ACC016',
    name: 'Ava King',
    username: 'aking',
    password: 'avaPass567',
    email: 'aking@example.com',
    dateOfBirth: '1996-02-11',
    presentAddress: '890 Oak Ave',
    permanentAddress: '345 Spruce Blvd',
    city: 'Charlotte',
    postalCode: '28201',
    county: 'Mecklenburg',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC017',
    name: 'William Wright',
    username: 'wwright',
    password: 'williamPass678',
    email: 'wwright@example.com',
    dateOfBirth: '1983-10-08',
    presentAddress: '456 Maple St',
    permanentAddress: '789 Birch St',
    city: 'Seattle',
    postalCode: '98101',
    county: 'King',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC018',
    name: 'Isabella Scott',
    username: 'iscott',
    password: 'isabellaPass789',
    email: 'iscott@example.com',
    dateOfBirth: '1995-06-26',
    presentAddress: '678 Pine Ave',
    permanentAddress: '234 Cedar St',
    city: 'Denver',
    postalCode: '80201',
    county: 'Denver',
    status: false,
    role: AccountRole.User,
  },
  {
    id: 'ACC019',
    name: 'Mason Adams',
    username: 'madams',
    password: 'masonPass890',
    email: 'madams@example.com',
    dateOfBirth: '1990-03-14',
    presentAddress: '234 Cedar St',
    permanentAddress: '567 Fir Blvd',
    city: 'Oklahoma City',
    postalCode: '73101',
    county: 'Oklahoma',
    status: true,
    role: AccountRole.User,
  },
  {
    id: 'ACC020',
    name: 'Sophia Baker',
    username: 'sbaker',
    password: 'sophiaPass901',
    email: 'sbaker@example.com',
    dateOfBirth: '1992-12-29',
    presentAddress: '890 Spruce Ave',
    permanentAddress: '123 Oak Blvd',
    city: 'Boston',
    postalCode: '02101',
    county: 'Suffolk',
    status: true,
    role: AccountRole.User,
  },
];

export { MOCK_ACCOUNT_STATUS_BAR_DATA, MOCK_ACCOUNTS_DATA };
