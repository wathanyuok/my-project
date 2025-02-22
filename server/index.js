// server/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import handleErrors from './middlewares/error.js';

// Import routes
import backofficeAuthRouter from './routes/backoffice/auth-route.js';
import backofficeProductRouter from './routes/backoffice/product-routes.js';
import backofficeCategoryRouter from './routes/backoffice/category-routes.js';
import discountRoutes from './routes/backoffice/discount-routes.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

// Backoffice routes
app.use("/api/backoffice/auth", backofficeAuthRouter);
app.use("/api/backoffice/products", backofficeProductRouter);
app.use("/api/backoffice/categories", backofficeCategoryRouter);
app.use("/api/backoffice/discounts", discountRoutes);

// Handle errors
app.use(handleErrors);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))