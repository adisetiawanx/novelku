import Cloudinary from "cloudinary";

const cloudinary = Cloudinary.v2;
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleUploadImage(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  return res;
}
export async function handleUploadAnything(file: string, format: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "raw",
    format,
  });
  return res;
}

export default cloudinary;
