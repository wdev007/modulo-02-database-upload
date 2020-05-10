import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export const pathDestination = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  pathDestination,
  storage: multer.diskStorage({
    destination: pathDestination,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
