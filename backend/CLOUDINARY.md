# Cloudinary Integration

## Overview

Product images are now stored on Cloudinary instead of local file system.

## Configuration

Add these environment variables to `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=ddapxuvn7
CLOUDINARY_API_KEY=832644438852271
CLOUDINARY_API_SECRET=Po642u8Cst9QkA8bE_SvMMCVq9I
```

## Features

### Image Upload

- Images are automatically uploaded to Cloudinary when creating products
- Stored in folder: `PoklykYaru/merch`
- Automatic optimization: quality and format optimization enabled
- Temporary files are cleaned up after upload

### Image Deletion

- Images are automatically deleted from Cloudinary when products are deleted
- Handles multiple images per product

### Frontend Integration

- Product images use direct Cloudinary URLs
- No URL normalization needed (already full URLs)
- Optimized loading with lazy loading and async decoding

## Migration (Optional)

If you have existing products with local images, run the migration script:

```bash
cd backend
node src/scripts/migrateImagesToCloudinary.js
```

This will:

1. Find all products with images
2. Upload local images to Cloudinary
3. Update product records with new URLs
4. Skip images already on Cloudinary

## File Structure

### Backend

- `src/utils/cloudinary.js` - Cloudinary configuration and helper functions
- `src/controllers/merch/products.js` - Image upload in product creation
- `src/services/merch/products.js` - Image deletion when product deleted
- `src/scripts/migrateImagesToCloudinary.js` - Migration script

### Frontend

- `src/components/merch/ProductCard/ProductCard.tsx` - Updated image rendering
- `src/components/admin/AdminProductCard/AdminProductCard.tsx` - Updated admin card

## Folders (No Longer Needed)

The following folders can be removed as they're no longer used:

- `backend/temp/` - Temporary upload folder (now cleaned automatically)
- `backend/uploads/merch/` - Local image storage (images now on Cloudinary)

**Note**: Don't delete these folders yet if you want to run the migration script first.

## API Changes

### Product Creation

- POST `/merch/products/`
- Accepts multipart/form-data with images
- Returns product with Cloudinary URLs

### Product Deletion

- DELETE `/merch/products/:id`
- Automatically deletes images from Cloudinary

## Best Practices Implemented

✅ Automatic cleanup of temporary files
✅ Error handling for upload/delete operations
✅ Proper Cloudinary public_id extraction
✅ Image optimization (quality: auto, format: auto)
✅ Secure URL usage (HTTPS)
✅ Parallel uploads for multiple images
✅ Clean code structure with separate utility functions
