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
        path: 'login',
        active: true,
        collapsible: false,
      },
    ],
  },

  {
    title: 'View Assigned Clients',
    path: '#!',
    icon: 'icomoon-free:drawer',
    active: true,
    collapsible: false,
    sublist: [
      {
        title: 'Profile',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'Overview',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'All Projects',
            path: '#!',
            active: false,
            collapsible: false,
          },
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
        path: '#!',
        active: true,
        collapsible: false,
      },

    ],
  },

    {
    title: 'Applications',
    path: '#!',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: false,

    sublist: [
      { 
         title: 'All  Applications',
        path: 'login',
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
