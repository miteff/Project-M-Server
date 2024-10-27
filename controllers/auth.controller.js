import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailsendler/emails.js';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("Все поля обязательны к заполнению");
        }

        const userAlreadyExists = await User.findOne({ where: { email } });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Пользователь с таким email уже существует." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });

        // jwt
        generateTokenAndSetCookie(res, user.id); // Используйте user.id вместо user._id

        // Отправка email для подтверждения
        await sendVerificationEmail(user.email, verificationToken);

        res.status(200).json({
            success: true,
            message: "Пользователь успешно создан.",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                verificationToken: user.verificationToken,
                verificationTokenExpiresAt: user.verificationTokenExpiresAt,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const signin = async(req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "Полььзователь с таким email не найден." });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Неверный пароль." });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = Date.now();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Вы успешно вошли в аккаунт.",
			user: {
				...user._doc,
				password: undefined,
			},
		})
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
}

export const logout = async(req, res) => {
    res.clearCookie('token');
	res.status(200).json({ success: true, message: "Вы вышли из аккаунта." });
}

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Неверный или просроченный код подтверждения" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Электронная почта успешно подтверждена",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Не предвиденная ошибка при подтверждении электронной почты" });
	}
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
		console.log(resetToken);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};