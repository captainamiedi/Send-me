import auth from './authRoutes';
import order from './orderRoute';

export default (prefix, app) => {
  app.use(prefix, auth);
  app.use(prefix, order);
};
