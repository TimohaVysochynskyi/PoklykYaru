/**
 * Migration script to upload existing product images to Cloudinary
 * This script is optional and should be run only if you have existing products with local images
 *
 * Usage: node src/scripts/migrateImagesToCloudinary.js
 */

import { ProductsCollection } from '../models/merch/product.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { initMongoDB } from '../db/initMongoDB.js';
import path from 'node:path';
import { UPLOAD_DIR } from '../constants/index.js';

const migrateImages = async () => {
  try {
    console.log('Starting image migration to Cloudinary...');

    await initMongoDB();
    console.log('MongoDB connected');

    // Get all products with local images
    const products = await ProductsCollection.find({
      images: { $exists: true, $ne: [] },
    });

    console.log(`Found ${products.length} products with images`);

    for (const product of products) {
      try {
        console.log(`\nProcessing product: ${product.name} (${product._id})`);

        const cloudinaryUrls = [];

        for (const imageUrl of product.images) {
          // Check if image is already on Cloudinary
          if (imageUrl.includes('cloudinary.com')) {
            console.log(`  - Image already on Cloudinary: ${imageUrl}`);
            cloudinaryUrls.push(imageUrl);
            continue;
          }

          // Extract filename from local URL
          // Example: "localhost:3000/uploads/merch/733088164_1731947352726_avatar.jpg"
          const urlParts = imageUrl.split('/');
          const filename = urlParts[urlParts.length - 1];
          const localPath = path.join(UPLOAD_DIR, 'merch', filename);

          console.log(`  - Uploading: ${filename}`);

          try {
            // Upload to Cloudinary
            const cloudinaryUrl = await uploadToCloudinary(
              localPath,
              'PoklykYaru/merch',
            );
            cloudinaryUrls.push(cloudinaryUrl);
            console.log(`  ✓ Uploaded to: ${cloudinaryUrl}`);
          } catch (uploadError) {
            console.error(
              `  ✗ Failed to upload ${filename}:`,
              uploadError.message,
            );
            // Keep original URL if upload fails
            cloudinaryUrls.push(imageUrl);
          }
        }

        // Update product with new Cloudinary URLs
        await ProductsCollection.findByIdAndUpdate(product._id, {
          images: cloudinaryUrls,
        });

        console.log(`✓ Product ${product.name} updated successfully`);
      } catch (error) {
        console.error(
          `✗ Error processing product ${product._id}:`,
          error.message,
        );
      }
    }

    console.log('\n✓ Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateImages();
