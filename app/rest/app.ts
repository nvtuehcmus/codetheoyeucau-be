import express from 'express';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';

import { cors } from 'rest/config/cors';
import { apiLimiter } from 'rest/config/rateLimit';
import { loginHandler } from 'rest/controler/Auth/loginHandler';
import { context } from 'rest/middleware/context';
import { catchHandler } from 'rest/middleware/catchControler';
import { registerHandler } from 'rest/controler/Auth/registerHandler';
import { changePasswordHandler } from 'rest/controler/Auth/changePasswordHandler';
import { verifyOTPHandler } from 'rest/controler/Auth/verifyOTPHandler';
import {
  requestForgotPasswordHandler,
  setPasswordHandler,
  verifyForgotPasswordToken,
} from 'rest/controler/Auth/forgotPasswordHandler';
import { auth } from 'rest/middleware/auth';
import { deleteUserHandler } from 'rest/controler/User/deleteUserHandler';
import { getProfileHandler } from 'rest/controler/User/getProfileHandler';
import { putEditProfileHandler } from 'rest/controler/User/putEditProfileHandler';
import { requestOTPHandler } from 'rest/controler/Auth/requestOTPHandler';
import { putProfileAvatarHandler } from 'rest/controler/User/putProfileAvatarHandler';
import { singleImage } from 'rest/middleware/fileUpload';
import { listTagsHandler } from 'rest/controler/Requests/listTagsHandler';
import { listRequestHandler } from 'rest/controler/Requests/listRequestHandler';
import { postCreateRequestHandler } from 'rest/controler/Requests/postCreateRequestHandler';
import { getRequestHandler } from 'rest/controler/Requests/getRequestHandler';
import { putRegisterRequestHandler } from 'rest/controler/Requests/putRegisterRequestHandler';

const app = express();

app.set('trust proxy', 'loopback');
app.all('*', cors);
app.all('*', apiLimiter);
app.use(bodyParser.json({ limit: '3mb' }));

console.log(process.platform);

app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'live' });
});

app.post('/v1/login', context, asyncHandler(catchHandler(loginHandler)));

app.post('/v1/sign-up', context, asyncHandler(catchHandler(registerHandler)));
app.post('/v1/verify', context, asyncHandler(catchHandler(verifyOTPHandler)));
app.post('/v1/request-otp', context, asyncHandler(catchHandler(requestOTPHandler)));
app.post('/v1/change-password', context, asyncHandler(catchHandler(changePasswordHandler)));

app.post('/v1/forgot', context, asyncHandler(catchHandler(requestForgotPasswordHandler)));
app.post('/v1/verify-forgot', context, asyncHandler(catchHandler(verifyForgotPasswordToken)));
app.post('/v1/set-password', context, asyncHandler(catchHandler(setPasswordHandler)));

app.delete('/v1/delete-user', context, auth, asyncHandler(catchHandler(deleteUserHandler)));
app.get('/v1/profile', context, auth, asyncHandler(catchHandler(getProfileHandler)));
app.put('/v1/profile-avatar', context, auth, singleImage, asyncHandler(catchHandler(putProfileAvatarHandler)));
app.put('/v1/profile', context, auth, asyncHandler(catchHandler(putEditProfileHandler)));

app.get('/v1/tags', context, asyncHandler(catchHandler(listTagsHandler)));
app.get('/v1/requests', context, asyncHandler(catchHandler(listRequestHandler))); // test
app.get('/v1/request/:request_id', context, asyncHandler(catchHandler(getRequestHandler))); // test
app.put('/v1/request/:request_id', context, auth, asyncHandler(catchHandler(putRegisterRequestHandler))); // test
app.post('/v1/request', context, auth, asyncHandler(catchHandler(postCreateRequestHandler))); // test
export default app;
