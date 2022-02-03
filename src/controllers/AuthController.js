import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwtConfig";

class AuthController {
    async store(req, res){
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({error: "Credential do not match"});
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (checkPassword == false) {
            return res.status(400).json({error: "Credential do not match"});
        }

        const {secret, expiresIn} = jwtConfig;
        const token = jwt.sign({}, secret, {
            subject:String(user._id),
            expiresIn
        });

        return res.json({user:user.show(), token})
    }
}

export default new AuthController();