import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      is_auth: boolean
    }
  }
}
