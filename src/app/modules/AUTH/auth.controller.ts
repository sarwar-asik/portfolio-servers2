/* eslint-disable no-console */
import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';

import config from '../../../config';
import { IRefreshTokenResponse } from './auth.Interface';
import { authServices } from './auth.sevices';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const signupController = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  // console.log(user, 'from controller=================');

  const result1 = await authServices.SighUpAuthServices(user);

  const result = await authServices.authLoginServices(user);

  const { refreshToken, ...others } = result;
  console.log(
    '🚀 ~ file: auth.controller.ts:25 ~ signupController ~ others:',
    others
  );

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  if (result1) {
    sendResponse(res, {
      success: true,
      message: 'successfully SIgn Up',
      statusCode: 200,
      data: result1,
    });
    // next()
  }
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  // console.log(loginData,"asdfsd");

  const result = await authServices.authLoginServices(loginData);

  const { refreshToken, ...others } = result;

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  if (result) {
    sendResponse(res, {
      success: true,
      message: 'successfully User Login',
      statusCode: 200,
      data: others,
    });
  }
});

const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.headers.authorization;
    // const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, `You are not authorized`);
    }

    const result = await authServices.refreshTokenServices(refreshToken);

    // set refresh token into cookie

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User loggedIn successfully !',
      data: result || null,
    });
  }
);

export const authController = {
  loginController,
  refreshTokenController,
  signupController,
};
