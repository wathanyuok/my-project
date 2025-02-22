import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    })

    // Generate token
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        email: user.email,
        username: user.username
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'ไม่สามารถลงทะเบียนได้' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        email: user.email,
        username: user.username
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'ไม่สามารถเข้าสู่ระบบได้' })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email }
    })

    if (!user) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้' })
    }

    res.json({
      email: user.email,
      username: user.username,
    })
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' })
  }
}