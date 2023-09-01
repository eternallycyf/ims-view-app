import { flatMap } from 'lodash';
import bizRouter from './business';

const Router = [
  {
    path: '/',
    routes: [
      ...flatMap(bizRouter),
      {
        path: '/',
        redirect: 'home',
      },
      {
        path: '*',
        component: '@/pages/404',
      },
    ],
  },
];
module.exports = Router;
