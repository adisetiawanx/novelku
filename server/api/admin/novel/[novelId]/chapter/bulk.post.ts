import fs from "fs/promises";
import path from "path";

import extract from "extract-zip";
import multer from "multer";
import { createChapterBulk } from "~/server/models/chapter";

import { callNodeListener } from "h3";

let fileName = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "public", "upload");
    fs.mkdir(dir, { recursive: true })
      .then(() => {
        cb(null, dir);
      })
      .catch((err) => {
        cb(err, dir);
      });
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const originalName = file.originalname;
    const newName = `${
      path.parse(originalName).name
    }-${randomString}${path.extname(originalName)}`;
    cb(null, newName);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    fileName = file.originalname;
    if (
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-rar-compressed" ||
      file.mimetype === "application/x-zip-compressed" ||
      file.mimetype === "multipart/x-zip"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export default defineEventHandler(async (event) => {
  try {
    const userInToken = await isAdminAuthorize(event);

    const params = getRouterParams(event);

    await callNodeListener(
      // @ts-expect-error: Nuxt 3
      upload.single("file"),
      event.node.req,
      event.node.res
    );

    //@ts-expect-error
    const file = event.node.req.file || "";

    if (!file) {
      throw new ErrorWithCode(400, "File not found");
    }

    let chaptersExtracted = [];
    const uploadDir = path.join(process.cwd(), "public", "upload", "temp");
    const extractedDir = path.join(uploadDir, path.parse(file.filename).name);
    try {
      await extract(file.path, { dir: extractedDir });

      const chapterFolders = await fs.readdir(extractedDir);

      for (const chapterFolder of chapterFolders) {
        const chapterPath = path.join(extractedDir, chapterFolder);
        const contentFilePath = path.join(chapterPath, "content_text.txt");

        const fileContent = await fs.readFile(contentFilePath, "utf-8");

        const chapterFolderArr = chapterFolder.split(" ");
        const chapterIndex = chapterFolderArr.findIndex(
          (t) => t.toLowerCase() === "chapter"
        );
        const chapterNumber = parseInt(chapterFolderArr[chapterIndex + 1]);

        chaptersExtracted.push({
          title: chapterFolder,
          number: chapterNumber,
          text: fileContent,
          novelId: params.novelId,
          userId: userInToken.id,
        });
      }
    } catch (error) {
      console.error(error);
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        })
      );
    } finally {
      await fs.rm(extractedDir, { recursive: true, force: true });
      await fs.rm(file.path);
    }

    const chaptersData = await createChapterBulk(chaptersExtracted);

    return {
      msg: "Chapters created successfully",
      data: {
        totalChapter: chaptersData.count,
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
