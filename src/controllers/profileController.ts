import { Response } from 'express';
import prisma from '../config/prisma.js';
import { AuthRequest, ProfileData } from '../types/index.js';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json({
      ...profile,
      email: profile.user.email
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fullName, bio, location }: ProfileData = req.body;

    const profile = await prisma.profile.update({
      where: { userId: req.user!.id },
      data: {
        fullName,
        bio,
        location
      }
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};