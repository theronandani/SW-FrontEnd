export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    
  },
    {
    title: 'Dashboard',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Client Stats',
        path: '#!',
        active: true,
        collapsible: false,
      },
    ],
  },

  {
    title: 'View Assigned Clients',
    path: 'authentication',
    icon: 'icomoon-free:drawer',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'List',
        path: 'assignedclients',
        active: false,
        collapsible: false,
        sublist: [
         
        ],
      },
      
    ],
  },
  {
    title: 'Set Availability',
    path: 'authentication',
    icon:  'ph:calendar',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Schedule input',
        path: 'setavailabilty',
        active: true,
        collapsible: false,
      },

    ],
  },

   {
    title: 'Sessions',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,

    sublist: [
      { 
         title: 'Reports',
        path: 'sessionreport',
        active: true,
        collapsible: false,
      },
    ],

  },
  {
    title: 'Applications',
    path: 'authentication',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: true,

    sublist: [
      { 
         title: 'All  Applications',
        path: 'applications',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Notification',
    path: '#!',
    icon: 'zondicons:notifications',
    active: true,
    collapsible: false,
  },
];

export default navItems;
