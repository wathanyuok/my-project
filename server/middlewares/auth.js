// server/middlewares/auth.js
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log("decoded",decoded)

    const user = await prisma.user.findFirst({
      where: { userID: decoded.id }
    })

    if (!user) {
      return res.status(401).json({ error: 'ไม่พบผู้ใช้งาน' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth error:', error)
    res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' })
  }
}

// สำหรับ auth-route.js
export const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log("decoded",decoded)

    const user = await prisma.user.findFirst({
      where: { userID: decoded.id }
    })

    if (!user) {
      return res.status(401).json({ error: 'ไม่พบผู้ใช้งาน' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth error:', error)
    res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' })
  }
}