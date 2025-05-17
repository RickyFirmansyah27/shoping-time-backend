import { Request, Response } from 'express';
import { BaseResponse } from '../helper';
import authService from '../service/auth-service';

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, is_merchant = false } = req.body;

    if (!name || !email || !password) {
      return BaseResponse(res, 'Name, email, and password are required', 'badRequest');
    }

    const { user } = await authService.registerUser(name, email, password, is_merchant);

    return BaseResponse(res, 'User registered successfully', 'created', { user });
  } catch (err: any) {
    return BaseResponse(res, err.message || 'Error registering user', 'internalServerError');
  }
};
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BaseResponse(res, 'Email and password are required', 'badRequest');
    }

    const { token, user } = await authService.loginUser(email, password);

    return BaseResponse(res, 'Login successful', 'success', { token, user });
  } catch (err: any) {
    return BaseResponse(res, err.message, 'unauthorized');
  }
};
