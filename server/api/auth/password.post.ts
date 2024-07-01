import { setUserPassword } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const userInToken = await isUserAuthorize(event);

    const body = await readBody(event);
    const password = body.password;
    const confirmPassword = body.confirm_password;

    if (!password || !confirmPassword) {
      throw new ErrorWithCode(
        400,
        "Password and password confirmation are required"
      );
    }

    if (password.length < 6) {
      throw new ErrorWithCode(400, "Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      throw new ErrorWithCode(
        400,
        "Password and password confirmation not match"
      );
    }

    const userDB = await setUserPassword(userInToken.email, password);

    return {
      msg: "Password has been updated",
      data: {
        user: {
          email: userDB.email,
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
