import { request } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
     console.log(req.cookies);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized" });
        } else {
            request.userId = decodedToken.userId;
            next();
        }
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};