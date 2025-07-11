import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingsRouter from './routes/settings.js'
import dashboardRouter from './routes/dashboard.js'
import connectDB from "./database/db.js";

import {userRegister} from './userSeed.js'

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "https://gostaff.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/settings',settingsRouter);
app.use('/api/dashboard',dashboardRouter);

connectDB().then(async () => {
  await userRegister(); 

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
});

