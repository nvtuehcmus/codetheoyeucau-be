import multer from 'multer';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import express from 'express';
import { responseError } from 'shared/core/context';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callback(null, true);
    } else {
      return callback(new Error(ErrorVars.E026_INVALID_MIME_TYPE));
    }
  }
});

const uploadSingleImage = upload.single('avatarImg');

export const singleImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return uploadSingleImage(req as any, res as any, (err) => {
    if (err) {
      responseError(new LogError(err.message, 'LOGIC'), req, res);
    }
    return next();
  });
};
