import mongoose from 'mongoose';

export const connectDB = async ()=>{
   try{
    await mongoose.connect('mongodb+srv://cristians-12:vPZ5zrylQqEattGw@cluster0.ks8gf8z.mongodb.net/');
    console.log("Conectado correctamente")
   }catch(error){
    console.log(error)
   }
};