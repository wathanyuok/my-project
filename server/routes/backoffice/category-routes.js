// server/routes/backoffice/category-routes.js
import express from 'express'
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../controllers/backoffice/category.controller.js';
import { authCheck } from '../../middlewares/auth.js';

const router = express.Router();

// Protect all routes
router.use(authCheck);

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;