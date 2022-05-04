var mongoose=require('mongoose');
const joi=require('@hapi/joi');
var EmployeeSchema=mongoose.Schema({
Name:String,
Description:String,

});
var employee=mongoose.model("Employee",EmployeeSchema);

function validateEmployee(data){
const schema=joi.object({
    Name:joi.string().min(3).max(12).required(),
    Description:joi.string().min(5).max(20).required()
});
return schema.validate(data,{abortEarly:false});

}
module.exports.employee=employee;
module.exports.validate=validateEmployee;