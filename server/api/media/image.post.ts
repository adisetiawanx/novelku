import { handleUploadImage } from "~/configs/cloudinary";
import multer from "multer";
import { callNodeListener } from "h3";
import { addMediaFile } from "~/server/models/media-file";

let fileName = "";
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    fileName = file.originalname;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export default defineEventHandler(async (event) => {
  try {
    await isUserAuthorize(event);

    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.single("file"),
      event.node.req,
      event.node.res
    );

    //@ts-expect-error
    const file = event.node.req.file || "";

    if (!file) {
      throw new ErrorWithCode(400, "File is required!");
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUploadImage(dataURI);

    await addMediaFile({
      name: fileName,
      url: cldRes.url,
      size: file.size, // in bytes
      type: "IMAGE",
    });

    return {
      msg: "Image uploaded successfully",
      data: {
        image: {
          name: fileName,
          url: cldRes.url,
        },
      },
    };
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      return sendError(
        event,
        createError({
          statusCode: error.statusCode,
          statusMessage: error.message,
        })
      );
    } else {
      console.error(error);
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        })
      );
    }
  }
});
