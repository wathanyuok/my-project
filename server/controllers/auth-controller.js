import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password, confirmPassword } = req.body

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'อีเมลหรือชื่อผู้ใช้นี้ถูกใช้งานแล้ว' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      }
    })

    // Generate token
    const token = jwt.sign(
      { id: user.userID },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user.userID,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'ไม่สามารถลงทะเบียนได้' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email }
    })

    if (!user) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    // Generate token
    const token = jwt.sign(
      { id: user.userID },
      process.env.SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.userID,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'ไม่สามารถเข้าสู่ระบบได้' })
  }
}

export const currentUser = async (req, res) => {
  try {
    res.json({ message: "Hello, current user" });
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' })
  }
}
