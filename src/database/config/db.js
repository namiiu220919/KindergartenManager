//import hàm thư viện
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

//Đối với database dùng atlas
const atlas = "mongodb+srv://nam:NamiiU2209@cluster0.kn7owr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connect = async() => {
    try {
        await mongoose.connect(atlas,{
           
        })
        console.log('connect success');
    } catch (error) {
        console.log(error);
        console.log('connect fail');
    }
}
module.exports = {connect}