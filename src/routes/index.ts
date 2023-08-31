import { flatMap } from 'lodash';
import bizRouter from './business';

const Router = [
  {
    path: '/',
    routes: [...flatMap(bizRouter)],
  },
];
module.exports = Router;
