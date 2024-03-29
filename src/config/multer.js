 
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'upload'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cd(err);

        return cb(null, res.toLocaleString('hex') + extname(file.originalname));
      });
    },
  }),
};
