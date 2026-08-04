import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'do4mbqgjn',
  api_key: process.env.CLOUDINARY_API_KEY || '559518252881535',
  api_secret: process.env.CLOUDINARY_API_SECRET || '6QqsQvDaSPxTgludFqBc9TN9U6Q',
  secure: true,
});

export default cloudinary;
