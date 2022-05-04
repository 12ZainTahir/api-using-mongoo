const express=require('express');
const {employee,validate} = require('../../models/employee');
let router=express.Router();
const cors = require("cors");
var app=express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
function somMid(req, res, next) {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  next();
}
router.get("/",somMid,async function(req,res){
let employees=await employee.find();
return res.send(employees);
});
router.get("/:id",somMid,async function(req,res){
  try{
    let employees=
    await employee.findById(req.params.id);
    if(!employees){
      return res.status(400)
      .send("Employee with given id not present");
    }

    return res.send(employees);
} catch(err){
    return res.status(400).send("Invalid ID")
}


});
 router.put("/:id",somMid,async (req,res)=>{
   let employees=await employee.findById(req.params.id);
  employees.Name=req.body.Name;
  employees.Description=req.body.Description;
  await employees.save();
  return res.send(employees);
 });   

 router.delete("/:id",somMid,async(req,res)=>{
  let employees=await employee.findByIdAndDelete(req.params.id);
  return res.send(employees);
 });

 router.post("/",somMid,async (req,res)=>{
      
   let employees=  new employee();
 employees.Name=req.body.Name;
 employees.Description=req.body.Description;
 await employees.save();
 return res.send(employees);
});

 module.exports=router;