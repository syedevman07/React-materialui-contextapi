import Users from './components/users';
import User from './components/users/user';
const routes = [
  {
    path: '/users',
    exact: true,
    component: Users,
  },
  {
    path: '/users/:id',
    exact: true,
    component: User,
  },
  {
    path: '',
    exact: true,
    component: Users,
  },
  // { status: 404, path: '*', component: NotFound },
];

export default routes;
