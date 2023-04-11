const express = require('express');
const users = require('../models/userSchema');
const router = express.Router();

// router.get("/",(req,res) => {
//     console.log("connect");
// })




// Registering user API
//===============================================
router.post("/register",async(req,res)=>{
    //console.log(req.body)
    const {name,email,age,mobile,work,add,desc} = req.body; // Object Destructing
    console.log(req.body)
    // Checking required data and sending response from server
    if(!name || !email || !age || !mobile || !work || !add || !desc)
    {
        res.json("pleasse fill the required fields")
    }
    
    try {
        // Checking the user exists or not . If user exists then we throw an error msg.
        const preuser = await users.findOne({email:email})
        console.log(preuser)
        if(preuser)
        {
            res.status(404).json("This user already exists")
        }
        else
        {
            const adduser = new users({name,email,age,mobile,work,add,desc});
            await adduser.save();
            res.status(201).json(adduser)
            console.log(adduser)
        }
 
        
    } catch (error) {
        res.status(404).json(error)
    }
})

//Fetching user data API
//==============================================
router.get("/getdata",async(req,res)=>
{
    try {
        const userdata = await users.find()
        res.status(201).json(userdata)
        console.log(userdata)
        
    } catch (error) {
        res.status(404).json(error)
    }
})

// Fetching single user data API
//========================================
router.get("/getuser/:id",async(req,res)=>
{
    try {
        console.log(req.params)
        const {id} = req.params
        const userindividual = await users.findById({_id:id})
        console.log(userindividual)
        res.status(201).json(userindividual)
        
    } catch (error) {
        res.status(404).json(error)
    }
})

// Updating user data API
//========================================
router.patch("/updateuser/:id",async(req,res)=>
{
    try {
       // console.log(req.params)
        const {id} = req.params
        const updateuser = await users.findByIdAndUpdate(id,req.body,{new:true})
        console.log(updateuser)
        res.status(201).json(updateuser)
        
    } catch (error) {
        res.status(404).json(error)
    }
})
// Deleting user data API
//========================================
router.delete("/deleteuser/:id",async(req,res)=>
{
    try {
       // console.log(req.params)
        const {id} = req.params
        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser)
        res.status(201).json(deleteuser)
        
    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports = router;