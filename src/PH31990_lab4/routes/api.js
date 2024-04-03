

var express = require("express");
var router = express.Router();

const Users = require('../models/users');
const AoCuoi = require('../models/AoCuoi');
const DichVu = require("../models/DichVu");





//AoCuoi
const Upload = require('../config/common/upload');
router.post("/add-AoCuoi",Upload.array('image', 5), async (req, res) => {
  try {
    const data = req.body;
    const { files } = req
    const urlsImage =
      files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
    const newAoCuoi = new AoCuoi({
      TenAo: data.TenAo,
      GiaThue: data.GiaThue,
      GiaBan: data.GiaBan,
      image: urlsImage,
      MauSac: data.MauSac,
      KieuAo: data.KieuAo,
      ChatLieu: data.ChatLieu,
      Size: data.Size,
    });
    const result = await newAoCuoi.save();
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      })
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi, thêm không thành công",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-list-AoCuoi", async (req, res,next) => {
  try {
    const data = await AoCuoi.find().populate("_id");
    res.json({
      status: 200,
      messenger: "Danh sách Áo cưới",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

//Dịch vụ
router.post("/add-DichVu",Upload.array('image', 5), async (req, res) => {
  try {
    const data = req.body;
    const { files } = req
    const urlsImage =
      files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
    const newDichVu = new DichVu({
      TenDV: data.TenDV,
      GiaDV: data.GiaDV,
      NoiDung: data.NoiDung,
      image: urlsImage,
    });
    const result = await newDichVu.save();
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      })
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi, thêm không thành công",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-list-DichVu", async (req, res,next) => {
  try {
    const data = await DichVu.find().populate("_id");
    res.json({
      status: 200,
      messenger: "Danh sách Dịch Vụ",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});




//User
router.get('/getListUser', async function (req, res, next) {
  try {
    const data = await Users.find().populate("_id");
    res.json({
      status: 200,
      messenger: "Danh sách User",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/getUserById/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await Users.findById(id).populate("_id");
    res.json({
      status: 200,
      messenger: "Danh sách User theo id",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});


router.delete('/deleteUserById/:id', async (req, res, next) =>{
  try {
    const { id } = req.params
    const result = await Users.findByIdAndDelete(id);
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Xóa thành công",
        "data": result
      })
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi, Xóa không thành công",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
  }
});



router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const newUser = Users({
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
    })
    const result = await newUser.save();
    if (result) {

      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      })
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi, thêm không thành công",
        "data": []
      })
    }
  } catch (error) {
    console.log(error);
  }
})

const JWT = require('jsonwebtoken');

const SECRETKEY = "FPTPOLYTECHNIC"
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password })
    if (user) {
      const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1h' });
      const refreshToken = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1d' })
      res.json({
        "status": 200,
        "messenger": "Đăng nhâp thành công",
        "data": user,
        "token": token,
        "refreshToken": refreshToken

      })
    } else {
      res.json({
        "status": 400,
        "messenger": "Lỗi, đăng nhập không thành công",
        "data": []

      })
    }
  } catch (error) {
    console.log(error);
  }
})





module.exports = router;