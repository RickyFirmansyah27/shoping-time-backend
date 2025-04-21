import { Request, Response } from 'express';
import { BaseResponse, Logger } from '../helper';
import productService from '../service/product-service';
const contextLogger = 'ProductController';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    Logger.info(`${contextLogger} | addProduct | payload`, { payload: req.body });
    try {
        Logger.info(`${contextLogger} | addProduct | start`);
        const { image, productName, sku, price, quantity, description } = req.body;

        if (!productName || !sku || !price || !quantity) {
            return BaseResponse(res, 'Some fields are required', 'badRequest');
        }

        const result = await productService.createProduct(image, productName, sku, price, quantity, description);

        return BaseResponse(res, 'Product created successfully', 'success', result);
    } catch (err: any) {
        return BaseResponse(res, err.message, 'unauthorized');
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        Logger.info(`${contextLogger} | getAllProducts`);
        const result = await productService.getAllProducts();
        return BaseResponse(res, 'Product retrieved successfully', 'success', { productList: result });
    } catch (error) {
        Logger.error(`${contextLogger} | getAllProducts`, error);
        return BaseResponse(res, 'error', 'internalServerError', null);
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    Logger.info(`${contextLogger} | deleteProduct | id`, { id: req.params.id });
    try {
        const { id } = req.params;

        if (!id) {
            return BaseResponse(res, 'Product ID is required', 'badRequest');
        }

        const result = await productService.deleteProductById(id);

        if (!result) {
            return BaseResponse(res, 'Product not found', 'notFound');
        }

        return BaseResponse(res, 'Product deleted successfully', 'success');
    } catch (err: any) {
        Logger.error(`${contextLogger} | deleteProduct`, err);
        return BaseResponse(res, err.message || 'Failed to delete product', 'internalServerError');
    }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
    Logger.info(`${contextLogger} | editProduct | id, payload`, { id: req.params.id, payload: req.body });
    try {
        const { id } = req.params;
        const { image, productName, sku, price, quantity } = req.body;

        if (!id) {
            return BaseResponse(res, 'Product ID is required', 'badRequest');
        }

        if (!image && !productName && !sku && price === undefined && quantity === undefined) {
            return BaseResponse(res, 'At least one field must be provided for update', 'badRequest');
        }

        const result = await productService.editProduct(id, { image, productName, sku, price, quantity });

        return BaseResponse(res, 'Product updated successfully', 'success', result);
    } catch (err: any) {
        Logger.error(`${contextLogger} | editProduct`, err);
        return BaseResponse(res, err.message || 'Failed to update product', 'internalServerError');
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  Logger.info(`${contextLogger} | getProductById | id`, { id: req.params.id });
  try {
      const { id } = req.params;

      if (!id) {
          return BaseResponse(res, 'Product ID is required', 'badRequest');
      }

      const [result] = await productService.getProductById(id);

      if (!result) {
          return BaseResponse(res, 'Product not found', 'notFound');
      }

      return BaseResponse(res, 'Product retrieved successfully', 'success', { productData: result });
  } catch (err: any) {
      Logger.error(`${contextLogger} | getProductById`, err);
      return BaseResponse(res, err.message || 'Failed to fetch product', 'internalServerError');
  }
};