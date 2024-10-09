import path from 'node:path';
import fs from 'node:fs/promises';
import { UPLOAD_DIR } from '../constants/index.js';

export const deleteFileFromUploadDir = async (files, folder) => {
  for (let i = 0; i < files.length; i++) {
    const filename = files[i].split('/')[files.length - 1];
    await fs.rename(path.join(UPLOAD_DIR, folder, filename));
  }
};
