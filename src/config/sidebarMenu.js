export default [
  {
    title: 'HOME',
    collapse: false,
    key: 'home',
    path: '/admin/home'
  },
  {
    title: 'PRODUCT',
    key: 'prod',
    collapse: false,
    children: [
      {
        title: 'Categories',
        key: 'category',
        path: '/admin/prod/category'
      },
      {
        title: 'Products',
        key: 'product',
        path: '/admin/prod/product'
      }
    ]
  },
  {
    title: 'USERS',
    collapse: false,
    key: 'user',
    path: '/admin/user'
  },
  {
    title: 'ROLES',
    collapse: false,
    key: 'role',
    path: '/admin/role'
  },
  {
    title: 'CHARTS',
    key: 'charts',
    collapse: false,
    children: [
      {
        title: 'dayReport',
        key: 'dayReport',
        path: '/admin/charts/category'
      },
      {
        title: 'yearReport',
        key: 'yearReport',
        path: '/admin/charts/product'
      }
    ]
  }
]