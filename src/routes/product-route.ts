import { Router } from 'express';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById } from '../controller/product-controller';

const productRoute = Router();
productRoute.route('/').get(getAllProducts);
productRoute.route('/add').post(addProduct);
productRoute.route('/edit').post(editProduct);
productRoute.route('/:id').delete(deleteProduct);
productRoute.route('/:id').get(getProductById);

export default productRoute;