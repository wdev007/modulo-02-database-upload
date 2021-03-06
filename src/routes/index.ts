import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoryRouter from './categories.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoryRouter);

export default routes;
