import { flatMap } from 'lodash';
import bizRouter from './business';

const Router = [
  {
    path: '/',
    hideInPanelTab: true,
    // wrappers: ['@/core/Enhance/Authorized'],
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

export default Router;
