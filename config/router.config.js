export default [
  // user
  {
    path: '/user',
    component: './layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: './layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: './layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          //Home
          { 
            path: '/',
            redirect: '/dashboard',
            authority: ['admin', 'user']
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            component: './locDashboard',
          },
          //platform
          {
            path: '/platform',
            icon: 'deployment-unit',
            name: 'platform',
            routes: [
              {
                path: '/platform/automation',
                name: 'automation',
                component: './locPlatform/Automation',
              },
              {
                path: '/platform/registration',
                name: 'registration',
                component: './locPlatform/Registration',
              },
              {
                path: '/platform/repository',
                name: 'repository',
                component: './locPlatform/Repository',
              },
              {
                path: '/platform/installation',
                name: 'installation',
                component: './locPlatform/Installation',
              },
              {
                path: '/platform/inventory',
                name: 'inventory',
                component: './locPlatform/Inventory',
              },
            ],
          },
          //storage
          {
            path: '/storage',
            icon: 'cluster',
            name: 'storage',
            routes: [
              {
                path: '/storage/ceph',
                name: 'ceph',
                component: './locStorage/cephCardList',
              },
              {
                path: '/storage/ceph/:id',
                name: 'detail',
                hideInMenu: true,
                component: './locStorage/cephDetail',
              },
            ],
          },
          //cloud
          {
            path: '/cloud',
            icon: 'cloud',
            name: 'cloud',
            routes: [
              {
                path: '/cloud/basic',
                name: 'basic',
                component: './locCloud/CloudCardList',
              },
              {
                path: '/cloud/:id',
                name: 'detail',
                hideInMenu: true,
                component: './locCloud/CloudDetail',
                routes: [
                  {
                    path: '/cloud/:id/',
                    redirect: '/cloud/:id/Summary',
                  },
                  {
                    path: '/cloud/:id/summary',
                    name: 'summary',
                    component: './locCloud/Summary',
                  },
                  {
                    path: '/cloud/:id/infrastructure',
                    name: 'infrastructure',
                    component: './locCloud/Infrastructure',
                  },
                  {
                    path: '/cloud/:id/network',
                    name: 'network',
                    component: './locCloud/Network',
                  },
                  {
                    path: '/cloud/:id/configuration',
                    name: 'configuration',
                    component: './locCloud/Configuration',
                  },
                ],
              },
            ],
          },
          // Personal Info
          {
            path: '/account',
            name: 'account',
            icon: 'user',
            routes: [
              {
                path: '/account/profile',
                name: 'profile',
                component: './locAccount/Profile',
                routes: [
                  {
                    path: '/account/Profile',
                    redirect: '/account/profile/basic',
                  },
                  {
                    path: '/account/profile/basic',
                    component: './locAccount/Profile/Basic',
                  },
                  {
                    path: '/account/profile/settings',
                    component: './locAccount/Profile/Settings',
                  },
                ],
              },
            ],
          },
          //Exception
          {
            path: '/exception',
            name: 'exception',
            icon: 'warning',
            hideInMenu: true,
            routes: [
              // exception
              {
                path: '/exception/403',
                name: 'not-permission',
                component: './Exception/403',
              },
              {
                path: '/exception/404',
                name: 'not-find',
                component: './Exception/404',
              },
              {
                path: '/exception/500',
                name: 'server-error',
                component: './Exception/500',
              },
              {
                path: '/exception/trigger',
                name: 'trigger',
                hideInMenu: true,
                component: './Exception/TriggerException',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
];
