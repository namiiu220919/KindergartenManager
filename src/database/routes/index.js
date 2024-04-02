var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

const UserSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  phone: {type: String},
  address: {type: String},
});

router.get('/getListUser', async function (req, res, next) {
  try {
    const User = mongoose.model('User', UserSchema);

    const users = await User.find({}).exec();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getUserById/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    const User = mongoose.model('User', UserSchema);

    const user = await User.findOne({_id: id}).exec();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/createUser', function (req, res, next) {
  // lấy các tham số từ POST gửi lên
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const User = mongoose.model('User', UserSchema);
  User.create({id: id, name: name, phone: phone, address: address})
    .then(user => {
      // lưu user thành công
      res.send({errorCode: 200, message: 'Them Thanh Cong!!!'});
    })
    .catch(err => {
      // có lỗi xảy ra
      res.send({errorCode: 200, message: 'Them KHONG Thanh Cong!!!'});
    });
});

router.put('/updateUserById/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const User = mongoose.model('User', UserSchema);

    const updatedUser = await User.findOneAndUpdate(
      {_id: id},
      {
        name: name,
        phone: phone,
        address: address,
      },
      {new: true},
    );

    res.send({errorCode: 200, message: 'UPDATE Thanh Cong!!!'});
  } catch (error) {
    res.send({errorCode: 200, message: 'UPDATE KHONG Thanh Cong!!!'});
  }
});

router.delete('/deleteUserById/:id', function (req, res, next) {
  const id = req.params.id;
  const User = mongoose.model('User', UserSchema);

  // Xóa user có id là id
  User.deleteOne({_id: id})
    .then(() => {
      res.send({errorCode: 200, message: 'Xóa thành công!!!'});
    })
    .catch(err => {
      res.send({errorCode: 500, message: 'Lỗi xóa người dùng!!!'});
    });
});

router.get('/getUserByName/:name', function (req, res, next) {
  const name = req.params.name;
  const User = mongoose.model('User', UserSchema);

  // Tìm user có tên là name
  User.findOne({name: name})
    .then(user => {
      if (user) {
        res.send({errorCode: 200, user});
      } else {
        res
          .status(404)
          .send({errorCode: 404, message: 'Không tìm thấy người dùng!!!'});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({errorCode: 500, message: 'Lỗi tìm kiếm người dùng!!!'});
    });
});

module.exports = router;
