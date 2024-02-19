import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin:['http://localhost:5173','https://frontend-login-pi.vercel.app','https://frontend-login.surge.sh','http://localhost:3000/signUp','http://localhost:3000/'],
  credentials:true,
}
));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/app',authRoutes);
app.use('/app',taskRoutes);
export default app;
