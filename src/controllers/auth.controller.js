import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createAccessToken } from "../libs/jwt.js";
import {TOKEN_SECRET} from '../config.js';

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {

    const userFound = await User.findOne({email});
    if(userFound)return res.status(400).json(['El email ya está en uso por otro usuario.']);

    const passhash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passhash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    // res.json({
    //   message: 'Usuario creado exitosamente'
    // })

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------Inicio de sesión ----------------------------------------

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarioGuardado = await User.findOne({ email });

    if (!usuarioGuardado)
      return res
        .status(400)
        .json({ message: "Email de usuario no encontrado." });

    const comparacion = await bcrypt.compare(
      password,
      usuarioGuardado.password
    );

    if (!comparacion)
      return res
        .status(400)
        .json({ message: "Las contraseñas no son iguales." });

    const token = await createAccessToken({ id: usuarioGuardado._id });

    res.cookie("token", token);
    // res.json({
    //   message: 'Usuario creado exitosamente'
    // })

    res.json({
      id: usuarioGuardado._id,
      username: usuarioGuardado.username,
      email: usuarioGuardado.email,
      createdAt: usuarioGuardado.createdAt,
      updatedAt: usuarioGuardado.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verify = async (req,res)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json(['No autorizado.']);
    jwt.verify(token,TOKEN_SECRET,async (error,user)=>{
      if(error) return res.status(401).json(['No autorizado.']);
      const usuarioEnc = await User.findById(user.id);
      if(!usuarioEnc) return res.status(401).json(['No autorizado.']);
    }
    )
  
    return res.json({
      id: usuarioEnc._id,
      username: usuarioEnc.user,
      email:usuarioEnc.email,
    });
  }

// --------------------Cerrar sesion----------------------------------------------

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const usuarioEncontrado = await User.findById(req.user.id);

  if (!usuarioEncontrado)
    return res.status(400).json({ message: "Ese usuario no se encuentra." });
  return res.json({
    id: usuarioEncontrado._id,
    username: usuarioEncontrado.username,
    email: usuarioEncontrado.email,
    createdAt: usuarioEncontrado.createdAt,
    updatedAt: usuarioEncontrado.updatedAt,
  });
};
