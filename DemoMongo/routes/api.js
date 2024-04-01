var express = require('express');
var router = express.Router();

//Thêm model
const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');
//Api thêm distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;//Lấy dữ liệu từ body
        const newDistributors = new Distributors({
            name: data.name
        }); //tạo 1 đối tượng mới
        const result = await newDistributors.save();//Thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
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

router.get('/get-list-distributor',async (req,res) => {
    try {
        //Lấy danh sách theo thứ tự distributors mới nhất
        const data = await Distributors.find().sort({createdAt: -1});
        if(data){
            //Trả về danh sách
            res.json({
                "status":200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Thêm không thành công
            res.json({
                "status": 400,
                messenger:"Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/search-distributor',async(req,res) => {
    try {
        const key = req.query.key; //Nhận từ query
        //Láy danh sách theo thứ tự distributors mới nhất
        const data = await Distributors.find({name: {"$regex": key,"$options":"i"}})
                                        .sort({createdAt:-1});
        if(data){
            //Trả về danh sách
            res.json({
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        }else{
            //Nếu thêm không thành công, thông báo
            res.json({
                "status": 400,
                "messenger": "Lỗi",
                "data": []
            })
        }                       
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-distributor-by-id/:id',async(req,res) => {
    try {
        const {id} = req.params
        const result = await Distributors.findByIdAndDelete(id);
        if(result){
            res.json({
                "status": 200,
                "messenger": "Xoá Thành công",
                "data": result
            })
        }else{
            //Nếu xoá không thành công, thông báo
            res.json({
                "status": 400,
                "messenger": "Lỗi",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-distributor-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body;// lấy dữ liệu từ body
        const result = await Distributors.findByIdAndUpdate(id,{name: data.name})
        if(result){
            //Nếu thêm thành công result 
            res.json({
                "status": 200,
                "messenger": "Sửa Thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//api thêm fruit
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body;//Lấy dữ liệu từ body
        const newfruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        }); //Tạo 1 đối tượng mới
        const result = await newfruit.save();//Thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-list-fruit',async(req,res,next) => {
    const authHeader = req.headers['authorization']
    //Authorization thêm từ khoá 'Bearer token'
    //nên sẽ xử lý cắt chuỗi 
    const token = authHeader && authHeader.split(' ')[1]
    //Nếu không có token trả về 401
    if(token == null) return res.sendStatus(401)
    let payload;
    JWT.verify(token, SECRETKEY ,(err,_payload) => {
        //Kiểm tra token, nếu token không đúng, hoặc hết hạn
        //Trả status code 403
        //Trả status hêts hạn 401 khi token hết hạn
        if(err instanceof JWT.TokenExpiredError) return res.sendStatus(401)
        if(err) return res.sendStatus(403)
        //Nếu đúng sẽ log ra dữ liệu
        payload =_payload;
    })
    console.log(payload);
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-fruit-by-id/:id', async (req, res) => {
    //:id param
    try {
        const { id } = req.params //lấy dữ liệu thông qua :id trên url gọi là param
        const data = await Fruits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-list-fruit-in-price', async (req, res) => {
    //:id param
    try {
        const { price_start, price_end } = req.query //lấy dữ liệu thông qua :id trên url gọi là param

        const query = { price: { $gte: price_start, $lte: price_end } }
        // $gte lớn hơn hoặc bằng, $ge lớn hơn
        // $lte nhỏ hơn hoặc bằng, $le nhỏ hơn

        //truyền câu điều kiện và chỉ lấy các trường mong muốn
        const data = await Fruits.find(query, 'name quantity price id_distributor')
                                .populate('id_distributor')
                                .sort({ quantity: -1 }) //giảm dần =-1, tăng dần =1
                                .skip(0) //bỏ qua số lượng row
                                .limit(2) //lấy 2 sản phẩm
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-list-fruit-have-name-a-or-x', async(req, res) => {
    try {
      const query = {$or: [
        {name: {$regex: 'T'}},
        {name: {$regex: 'X'}},
      ]}  

      //truyền câu điều kiện, và chỉ lấy các trường mong muốn
        const data = await Fruits.find(query, 'name quantity price id_distributor')
            .populate('id_distributor')
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})


//api cập nhật fruit
router.put('/update-fruit-by-id/:id',async (req,res) => {
    try {
        const {id} =req.params
        const data = req.body; //Lấy dữ liệu từ body
        const updatefruit = await Fruits.findById(id)
        let result = null;
        if(updatefruit){
            updatefruit.name = data.name ?? updatefruit.name,
            updatefruit.quantity = data.quantity ?? updatefruit.quantity,
            updatefruit.price = data.price ?? updatefruit.price,
            updatefruit.status = data.status ?? updatefruit.status,
            updatefruit.image = data.image ?? updatefruit.image,
            updatefruit.description = data.description ?? updatefruit.description,
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor,
            result = await updatefruit.save();
        }

        // tạo 1 đối tượng mới
        // thêm vào database
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        } else {
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//api xoá fruit
router.delete('/destroy-fruit-by-id/:id',async(req,res) => {
    try {
        const {id} = req.params
        const result = await Fruits.findByIdAndDelete(id);
        if(result){
            // xoá thành công trả về thông tin item đã xoá
            res.json({
                "status" :200,
                "messenger": "Xoá thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, xoá không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//api upload
const Upload = require('../config/common/upload');
router.post('/add-fruit-with-file-image',Upload.array('image',5),async(req,res) => {
    //Upload.array('image',5) => tối đa 5 file
    //Upload.single('image') => 1 file
    try{
        const data = req.body;//lấy dữ liệu từ body
        const {files} = req //files nếu upload nhiều, file nếu upload 1 file
        const urlsImage = files.map((file) => `${req.get("host")}/uploads/${file.filename}`)

        //url hình ảnh sẽ được lưu dưới dạng: http://localhost:3000/upload/filename
        const newfruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImage,
            description: data.description,
            id_distributor: data.id_distributor
        }); 

        const result = await newfruit.save();//thêm vào database
        if(result){
            // xoá thành công trả về thông tin item đã xoá
            res.json({
                "status" :200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            })
        }
    }catch(error){
        console.log(error);
    }
});

// mail

const Users = require('../models/users');
const Transporter = require('../config/common/mail');
router.post('/register-send-email',Upload.single('avatar'), async(req,res) => {
    try {
        const data = req.body;
        const {file} = req;
        const newUser = Users({
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            //url avata http://localhost:3000/uploads/filename
        })
        const result = await newUser.save()
        if(result){
            //Gửi mail
            const mailOptions = {
                from: "namiiu2209@gmail.com",//email gửi đi
                to: result.email,//email nhận
                subject: "Đăng ký thành công", //subject
                text: "Cảm ơn bạn đã đăng ký",//nội dung 
            };
            // Nếu thêm thành công result !nul trả về dữ liệu
            await Transporter.sendMail(mailOptions);//gửi mail
            res.json({
                "status":200,
                "messenger":"Thêm thành công",
                "data": result
            })
        }else{
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status":400,
                "messenger":"Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//api Login

const JWT = require('jsonwebtoken');
const SECRETKEY = "FPTPOLYTECHNIC"

router.post('/login', async (req,res) => {
    try {
        const {username,password} = req.body;
        const user = await Users.findOne({username, password})
        if(user){
            //Token người dùng sẽ sử dụng gửi lên trên header mỗi lần muốn gọi api
            const token = JWT.sign({id:user._id}, SECRETKEY,{expiresIn:'1h'});
            //Khi token hết hạn, người dùng sẽ call 1 api khác để lấy token mới
            //Lúc này người dùng sẽ truyền refreshToken lên để nhận về 1 cặp token, refreshToken mới
            //Nếu cả 2 token đều hết hạn người dùng sẽ phải thoát app và đăng nhập lịa
            const refreshToken = JWT.sign({id: user._id},SECRETKEY,{expiresIn:'1d'})
            //expiresIn thời gian token
            res.json({
                "status":200,
                "messenger":"Đăng nhập thành công",
                "data": user,
                "token": token,
                "refreshToken": refreshToken
            })
        }else{
            //Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status":400,
                "messenger":"Lỗi đăng nhập không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/get-list-fruit',async(req,res,next) => {
    const authHeader = req.headers['authorization']
    //Authorization thêm từ khoá 'Bearer token'
    //nên sẽ xử lý cắt chuỗi
    const token = authHeader && authHeader.split('')[1]
    //Nếu không có token trả về 401
    if(token == null) return res.sendStatus(401)
    let payload;
    JWT.verify(token,SECRETARY,(err,_payload) => {
        //Kiểm tra token, nếu token không đúng, hoặc hết hạn
        //Trả status code 403
        //Trả status hêts hạn 401 khi token hết hạn
        if(err instanceof JWT.TokenExpiredError) return res.sendStatus(401)
        if(err) return res.sendStatus(403)
        //Nếu đúng sẽ log ra dữ liệu
        payload =_payload;
    })
    console.log(payload);
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;