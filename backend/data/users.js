import bcrypt from 'bcryptjs';

const users = [
  {
    firstname: 'Travis',
    lastname: 'Davis',
    username: 'tdavis',
    password: bcrypt.hashSync('123456', 10),
    email: 'tdavis@example.com',
    phone: '555-201-3344',
    role: 'admin',
    status: 'active',
    isAdmin: true,
    publications: ['1', '2', '3', '4', '5', '6']
  },
  {
    firstname: 'Maria',
    lastname: 'Chen',
    username: 'mchen',
    password: bcrypt.hashSync('123456', 10),
    email: 'mchen@example.com',
    phone: '555-118-2290',
    role: 'sales rep',
    status: 'active',
    isAdmin: false,
    publications: ['1', '4']
  },
  {
    firstname: 'Jordan',
    lastname: 'Ellis',
    username: 'jellis',
    password: bcrypt.hashSync('123456', 10),
    email: 'jellis@example.com',
    phone: '555-330-7712',
    role: 'editor',
    status: 'active',
    isAdmin: false,
    publications: ['2']
  },
  {
    firstname: 'Priya',
    lastname: 'Nair',
    username: 'pnair',
    password: bcrypt.hashSync('123456', 10),
    email: 'pnair@example.com',
    phone: '555-902-1187',
    role: 'account manager',
    status: 'active',
    isAdmin: false,
    publications: ['3', '5']
  },
  {
    firstname: 'Sam',
    lastname: 'Whitfield',
    username: 'swhitfield',
    password: bcrypt.hashSync('123456', 10),
    email: 'swhitfield@example.com',
    phone: '555-664-0932',
    role: 'sales rep',
    status: 'inactive',
    isAdmin: false,
    publications: ['6']
  }
];

export default users;
