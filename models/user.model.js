// user.model.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
    },
    resetPasswordExpiresAt: {
        type: DataTypes.DATE,
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
    verificationTokenExpiresAt: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
});

export default User;