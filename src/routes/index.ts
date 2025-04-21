import userRoute from './user-route';
import authRoute from './auth-route';
import productRoute from './product-route';

const basePath = '/api/v1';

export const routes = [
    { path: `${basePath}/user`, router: userRoute },
    { path: `${basePath}/auth`, router: authRoute },
    { path: `${basePath}/product`, router: productRoute },
];

