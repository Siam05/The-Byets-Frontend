export default [
  {
    header: 'Pages',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Authentication', 
        icon: 'LockIcon',
        children: [
          {
            title: 'Login v1',
            route: 'auth-login-v1',
            target: '_blank',
          },
          {
            title: 'Login v2',
            route: 'auth-login-v2',
            target: '_blank',
          }
        ]
      }
    ]
  }
]
