const mongoose=require('mongoose');
const Scheme = mongoose.Schema;

const DichVu = new Scheme({
    TenDV:{type:String},
    GiaDV:{type:Number},    
    image:{type:Array},
    NoiDung:{type:String},

},{
    timestamps:true
})
module.exports=mongoose.model('dichvu',DichVu)