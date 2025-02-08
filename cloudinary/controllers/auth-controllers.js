const prisma = require("../configs/prisma")
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(createError(400, "Email and Password are required"));
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return next(createError(400, "Email and Password must be strings"));
        }

        if (password.length < 8) {
            return next(createError(400, "Password must be at least 8 characters"));
        }

        const isUserExist = await prisma.user.findFirst({
            where: { email }
        });

        if (isUserExist) {
            return next(createError(400, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.json({ message: "Register successful" });
    } catch (err) {
        next(err);
    } finally {
        await prisma.$disconnect();
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createError(400, "Email and Password are required"));
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return next(createError(400, "Invalid type email or password"));
        }

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return next(createError(400, "User not found"));
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return next(createError(400, "Email or Password is invalid"));
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED_IN });

        res.json({ token });
    } catch (err) {
        next(err);
    } finally {
        await prisma.$disconnect();
    }
};