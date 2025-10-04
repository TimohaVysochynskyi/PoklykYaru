import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
  secure: true,
});

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Path to the file to upload
 * @param {string} folder - Cloudinary folder (e.g., 'PoklykYaru/merch')
 * @returns {Promise<string>} - Cloudinary secure URL
 */
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      // Optimization options
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of file objects with 'path' property
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<Array<string>>} - Array of Cloudinary secure URLs
 */
export const uploadMultipleToCloudinary = async (files, folder) => {
  const uploadPromises = files.map((file) =>
    uploadToCloudinary(file.path, folder),
  );

  return Promise.all(uploadPromises);
};

/**
 * Delete file from Cloudinary by URL
 * @param {string} url - Cloudinary URL
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (url) => {
  try {
    // Extract public_id from Cloudinary URL
    // Example URL: https://res.cloudinary.com/ddapxuvn7/image/upload/v1234567890/PoklykYaru/merch/filename.jpg
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');

    if (uploadIndex === -1) {
      console.error('Invalid Cloudinary URL:', url);
      return;
    }

    // Get everything after 'upload/v{version}/'
    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');

    // Remove file extension to get public_id
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');

    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    console.log(`Deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw error - file might already be deleted
  }
};

/**
 * Delete multiple files from Cloudinary
 * @param {Array<string>} urls - Array of Cloudinary URLs
 * @returns {Promise<void>}
 */
export const deleteMultipleFromCloudinary = async (urls) => {
  const deletePromises = urls.map((url) => deleteFromCloudinary(url));
  await Promise.all(deletePromises);
};

export default cloudinary;
