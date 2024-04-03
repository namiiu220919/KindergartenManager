const mongoose=require('mongoose')
mongoose.set('strictQuery', true)
const atlas = "mongodb+srv://nam:NamiiU2209@cluster0.kn7owr1.mongodb.net/DBWeddingDress?retryWrites=true&w=majority&appName=Cluster0"

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