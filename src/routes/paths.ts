export const rootPaths = {
  homeRoot: '',
  pagesRoot: 'pages',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,

    setavailabilty: `/${rootPaths.authRoot}/setavailabilty`,
    assignedclients: `/${rootPaths.authRoot}/assignedclients`,
    sessionreport:  `/${rootPaths.authRoot}/sessionreport`,

  404: `/${rootPaths.errorRoot}/404`,
};
