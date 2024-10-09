import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (files, folder) => {
  const response = [];

  for (let i = 0; i < files.length; i++) {
    await fs.rename(
      path.join(TEMP_UPLOAD_DIR, files[i].filename),
      path.join(UPLOAD_DIR, folder, files[i].filename),
    );
    response.push(
      `${env('APP_DOMAIN')}/uploads/${folder}/${files[i].filename}`,
    );
  }

  return response;
};
