import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return typeof password === 'string' && password.length >= 6;
};

export const validateFullName = (fullName: string): boolean => {
  return typeof fullName === 'string' && fullName.trim().length > 0;
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, fullName } = req.body;

  const errors: string[] = [];

  if (!email || !validateEmail(email)) {
    errors.push('Требуется указать действительный адрес электронной почты');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!validateFullName(fullName)) {
    errors.push('Full name is required');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  req.body.email = email.toLowerCase().trim();
  req.body.fullName = fullName.trim();

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  const errors: string[] = [];

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  req.body.email = email.toLowerCase().trim();

  next();
};

export const validateProfileUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { fullName, bio, location } = req.body;
  const errors: string[] = [];

  if (fullName !== undefined && !validateFullName(fullName)) {
    errors.push('Full name cannot be empty');
  }

  if (bio !== undefined && typeof bio !== 'string') {
    errors.push('Bio must be a string');
  }

  if (location !== undefined && typeof location !== 'string') {
    errors.push('Location must be a string');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  if (fullName) {
    req.body.fullName = fullName.trim();
  }

  next();
};