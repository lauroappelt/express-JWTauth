import { verify } from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

export default async function(req, res, next) {
    console.log(req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({error: "token is missing"});
    }

    const [, token] = authHeader.split(' ');
    try {
        const decoded = await verify(token, jwtConfig.secret);

        const id = decoded.sub;
        req.user = id;

        return next();
    } catch (error) {
        return res.status(400).json({error: "invalid token"});
    }
}