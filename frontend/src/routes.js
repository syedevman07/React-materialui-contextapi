import Users from './components/users';
import User from './components/users/user';
import UserDetail from './components/users/user-detail';
import Login from './components/login';
import Categories from './components/categories';

export const commonRoutes = [
  {
    path: '/users',
    exact: true,
    component: Users,
  },
  {
    path: '/',
    exact: true,
    component: Users,
  },
];

export const noAuthRoutes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: User,
  },
  {
    path: '/users/:id',
    exact: true,
    component: UserDetail,
  },
]

export const authRoutes = [
  {
    path: '/profile',
    exact: true,
    component: User,
  }
];

export const adminRoutes = [
  {
    path: '/categories',
    exact: true,
    component: Categories,
  },
  {
    path: '/users/:id',
    exact: true,
    component: User,
  },
];
