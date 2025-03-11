import dotenv from "dotenv";

dotenv.config()

const jwtToken = process.env.JWT_KEY as string;

export const secret = new TextEncoder().encode(
  jwtToken
)

export const alg = 'HS256'
