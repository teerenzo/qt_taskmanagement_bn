import express from 'express';
import routes from './src/routes/index.js'
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/db.js';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cors

app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes);

app.listen(PORT, async () => {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    console.log(`Server is running on port ${PORT}`);
});


