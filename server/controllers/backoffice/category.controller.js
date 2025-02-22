// server/controllers/backoffice/category.controller.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    })

    res.json(categories)
  } catch (error) {
    next(error)
  }
}

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await prisma.category.findUnique({
      where: { categoryID: id },
      include: {
        products: true
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'ไม่พบหมวดหมู่' })
    }

    res.json(category)
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req, res, next) => {
  try {
    const { categoryName, description } = req.body

    // Check if category exists
    const existingCategory = await prisma.category.findFirst({
      where: { categoryName }
    })

    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists' })
    }

    const category = await prisma.category.create({
      data: {
        categoryName,
        description
      }
    })

    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { categoryName, description } = req.body

    // Check if category exists
    const existingCategory = await prisma.category.findFirst({
      where: { 
        categoryName,
        NOT: { categoryID: id }
      }
    })

    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists' })
    }

    const category = await prisma.category.update({
      where: { categoryID: id },
      data: {
        categoryName,
        description
      }
    })

    res.json(category)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' })
    }
    next(error)
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params

    // Check if category has products
    const category = await prisma.category.findUnique({
      where: { categoryID: id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    if (category._count.products > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category with products. Please remove or move products first.' 
      })
    }

    await prisma.category.delete({
      where: { categoryID: id }
    })

    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    next(error)
  }
}