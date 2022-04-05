export default [
  {
    title: 'HOME',
    key: 'home',
    path: '/admin/home',
    submenu: false
  },
  {
    title: 'PRODUCTS',
    key: 'prod',
    path: '/admin/prod',
    submenu: true,
    children: [
      {
        title: 'Categories',
        key: 'category',
        path: '/admin/prod/categories'
      },
      {
        title: 'Products',
        key: 'product',
        path: '/admin/prod/products'
      }
    ]
  },
  {
    title: 'USERS',
    key: 'user',
    path: '/admin/user',
    submenu: false
  },
  {
    title: 'ROLES',
    key: 'role',
    path: '/admin/role',
    submenu: false
  },
  {
    title: 'CHARTS',
    key: 'charts',
    path: '/admin/charts',
    submenu: true,
    children: [
      {
        title: '2',
        key: 'dayReport',
        path: '/admin/charts/1'
      },
      {
        title: '3',
        key: 'yearReport',
        path: '/admin/charts/2'
      }
    ]
  }
]