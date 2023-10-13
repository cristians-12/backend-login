import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js'

export const authRequerida = (req,res,next)=>{
    console.log("Autenticando token..")
    const {token} = req.cookies;
    // console.log(token)
    if(!token) return res.status(401).json({message: "No hay token existente, iniciar sesión."})

    jwt.verify(token, TOKEN_SECRET, (err,user)=>{
        if(err) return res.status(403).json({message: "Token invalido."});
        req.user = user;
    })
    next()
}