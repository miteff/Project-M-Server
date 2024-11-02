import prisma from '../config/prisma.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      ...profile,
      email: profile.user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, location } = req.body;

    const profile = await prisma.profile.update({
      where: { userId: req.user.id },
      data: {
        fullName,
        bio,
        location
      }
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};