import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import StudentsController from '../app/controllers/StudentsController';
import authMiddleware from '../app/middlewares/auth';
import PlansController from '../app/controllers/PlansController';
import RegistrationController from '../app/controllers/RegistrationController';
import CheckinsController from '../app/controllers/CheckinsController';
import HelpOrderController from '../app/controllers/HelpOrdersController';
import StudentSessionController from '../app/controllers/StudentSessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/session/students', StudentSessionController.store);
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.post('/students', StudentsController.store);
routes.get('/students', StudentsController.index);
routes.get('/students/:id', StudentsController.index);
routes.put('/students/:id', StudentsController.update);
routes.delete('/students/:id', StudentsController.delete);
routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.get('/plans/:id', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.post('/help_orders/:id/answer', HelpOrderController.store);
routes.get('/help_orders', HelpOrderController.index);
routes.get('/help_orders/:id/list', HelpOrderController.index);
routes.put('/help_orders/:id/answer', HelpOrderController.update);

/* routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Graziani Zanfolin',
    email: 'graziani@graziani.com.br',
    password_hash: '123',
  });

  return res.json(user);
}); */

export default routes;
