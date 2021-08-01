import { NextFunction, Request, Response } from 'express'
import { verify, } from 'jsonwebtoken'

const { jwt_secret_key } = process.env

export default async (req: Request, res: Response, next: NextFunction) => {
  const auth_header = req.headers.authorization
  //@ts-ignore
  if (!auth_header) req.is_auth = false
  else {
    const token = auth_header.split(' ')[1]
    try {
      const is_auth = await verify(token, jwt_secret_key)
      //@ts-ignore
      req.is_auth = true
    } catch {
      //@ts-ignore
      req.is_auth = false
    }
  }
  next()
}
