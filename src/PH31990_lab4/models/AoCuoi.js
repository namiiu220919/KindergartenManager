const mongoose=require('mongoose');
const Scheme = mongoose.Schema;

const AoCuoi = new Scheme({
    TenAo:{type:String},
    GiaThue:{type:Number},
    GiaBan:{type:Number},     
    image:{type:Array},
    MauSac:{type:String},
    KieuAo:{type:String},
    ChatLieu:{type:String},
    Size:{type:String},
},{
    timestamps:true
})
module.exports=mongoose.model('aocuoi',AoCuoi)