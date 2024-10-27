import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
    SEND_WELCOME_EMAIL_TEMPLATE
} from "./emailTemplates.js";
import { transporter, sender } from "./mail.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = process.env.API_URL/{verificationToken}; 
    const recipient = [{ email }];
    const mailOptions = {
        from: sender,
		to: email,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		category: "Email Verification",
    };

    return transporter.sendMail(mailOptions);
};

export const sendWelcomeEmail = async (email, name) => {
    //const verificationUrl = process.env.API_URL/{verificationToken}; 
    const recipient = [{ email }];
    const mailOptions = {
        from: sender,
		to: email,
		subject: "Verify your email",
		html: SEND_WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
		category: "Welcom",
    };

    return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = process.env.API_URL/{token};
    const recipient = [{ email }];
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetUrl}", resetUrl),
        category: "Password Reset",
    };

    return transporter.sendMail(mailOptions);
}

export const sendResetSuccessEmail = async (email) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset",
    };

    return transporter.sendMail(mailOptions);
};