const cloudinary = require("../configs/cloudinary");
const fs = require("fs");
const prisma = require("../configs/prisma");

exports.getUsers = (req, res, next) => {
  res.send({ user: req.user });
};

exports.getProfile = (req, res, next) => {
  res.send({ message: "Get my profile" });
};

exports.updateProfile = async (req, res, next) => {
  try {
    // รับค่าจาก request body
    const { firstName, lastName } = req.body;

    // สร้าง object สำหรับเก็บข้อมูลที่จะอัพเดท
    const toUpdateInputs = {
      firstName,
      lastName,
    };

    // ถ้ามีการอัพโหลดไฟล์
    if (req.file) {
      // อัพโหลดไฟล์ไปที่ Cloudinary
      const image = await cloudinary.uploader.upload(req.file.path);
      // เพิ่ม URL ของรูปภาพลงใน object
      toUpdateInputs.profileImage = image.secure_url;
    }

    // ลบ properties ที่มีค่า falsy ออก
    for (let key in toUpdateInputs) {
      if (!toUpdateInputs[key]) {
        delete toUpdateInputs[key];
      }
    }

    // อัพเดทข้อมูลผู้ใช้ใน database
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: toUpdateInputs
    });

    // ส่ง response กลับ
    res.json({ 
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    next(err);
  } finally {
    // ลบไฟล์ชั่วคราวหลังจากอัพโหลดเสร็จ
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
