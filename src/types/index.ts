import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

export interface UserData {
  email: string;
  password: string;
  fullName?: string;
}

export interface ProfileData {
  fullName?: string;
  bio?: string;
  location?: string;
}

export interface JwtPayload {
  userId: number;
}