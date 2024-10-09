import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Math.round(Math.random() * 1e9);
    const uniqueSuffix = Date.now();

    cb(null, `${uniquePrefix}_${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
