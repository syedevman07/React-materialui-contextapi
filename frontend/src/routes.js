import Users from './components/users';
import User from './components/users/user';
import UserDetail from './components/users/user-detail';
import Login from './components/auth/login';
import Profile from './components/auth/profile';
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
    component: Profile,
  },
  {
    path: '/users/:id',
    exact: true,
    component: UserDetail,
  },
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
