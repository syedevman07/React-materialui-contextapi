import Users from './components/users';

const routes = [
  {
    to: '',
    exact: true,
    component: Users,
  },
  {
    to: '/users',
    exact: true,
    component: Users,
  },
  // { status: 404, path: '*', component: NotFound },
];

export default routes;
