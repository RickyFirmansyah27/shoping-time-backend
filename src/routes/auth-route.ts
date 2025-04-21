import { Router } from 'express';
import { registerHandler, loginHandler } from '../controller/auth-controller';

const userRoute = Router();

userRoute.route('/register').post(registerHandler);
userRoute.route('/login').post(loginHandler);

export default userRoute;