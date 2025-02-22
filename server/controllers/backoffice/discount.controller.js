import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.discount.findMany({
      select: {
        discountID: true,
        description: true,
        discountType: true,
        discountValue: true
      }
    })
    res.json(discounts)
  } catch (error) {
    console.error('Error getting discounts:', error)
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลส่วนลดได้' })
  }
}

export const createDiscount = async (req, res) => {
  try {
    const { name, description, discountType, discountValue } = req.body
    
    const discount = await prisma.discount.create({
      data: {
        name,
        description,
        discountType: discountType.toLowerCase(),
        discountValue: parseFloat(discountValue)
      }
    })
    
    res.status(201).json(discount)
  } catch (error) {
    console.error('Error creating discount:', error)
    res.status(500).json({ error: 'ไม่สามารถสร้างส่วนลดได้' })
  }
}

export const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, discountType, discountValue } = req.body
    
    const discount = await prisma.discount.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        discountType: discountType.toLowerCase(),
        discountValue: parseFloat(discountValue)
      }
    })
    
    res.json(discount)
  } catch (error) {
    console.error('Error updating discount:', error)
    res.status(500).json({ error: 'ไม่สามารถอัพเดทส่วนลดได้' })
  }
}

export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.discount.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'ลบส่วนลดเรียบร้อย' })
  } catch (error) {
    console.error('Error deleting discount:', error)
    res.status(500).json({ error: 'ไม่สามารถลบส่วนลดได้' })
  }
}