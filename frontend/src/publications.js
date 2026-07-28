const publications = [
  {
    _id: '1',
    name: 'The Daily Ledger',
    address: '412 Market St',
    city: 'Albany',
    state: 'NY',
    zipcode: '14925',
    status: 'active',
    parentPublication: null
  },
  {
    _id: '2',
    name: 'Northside Tribune',
    address: '88 Harrison Ave',
    city: 'Boston',
    state: 'MA',
    zipcode: '01001',
    status: 'active',
    parentPublication: null
  },
  {
    _id: '3',
    name: 'Riverside Gazette',
    address: '215 Riverside Dr',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60601',
    status: 'active',
    parentPublication: null
  },
  {
    _id: '4',
    name: 'Metro Weekly',
    address: '77 Commerce Blvd',
    city: 'Charlotte',
    state: 'NC',
    zipcode: '28212',
    status: 'inactive',
    parentPublication: '1'
  },
  {
    _id: '5',
    name: 'The Courier Post',
    address: '340 Franklin St',
    city: 'Richmond',
    state: 'VA',
    zipcode: '23218',
    status: 'active',
    parentPublication: null
  },
  {
    _id: '6',
    name: 'Lakeview Herald',
    address: '19 Shoreline Ave',
    city: 'Cleveland',
    state: 'OH',
    zipcode: '43002',
    status: 'active',
    parentPublication: null
  }
];

export default publications;
