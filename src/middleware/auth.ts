import { Request,Response,NextFunction } from "express";

import  jwt from "jsonwebtoken";

const SECRET_KEY="abcdefghijklmn";

export const authenticateToken=(req:Request,res:Response,next:NextFunction):void=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(401).json({Message:"Unauthorized"});
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {        
        if (err) return res.status(403).json({ message: "Forbidden" });
        next();
    });
}