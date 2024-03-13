import { Request } from 'express';
import admin from 'firebase-admin';

declare module 'express-serve-static-core' {
  interface Request {
    user?: admin.auth.DecodedIdToken;
  }
}

interface ServiceAccount {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}
