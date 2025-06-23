// userModel controller for aww users
//takes login inputs form AWW users
import awwModel from "../models/awwModel.js";


// POST: Add a new AWW
const addUser = async (req, res) => {
  const { awwId, name } = req.body;

  try {
    const newAww = new awwModel({ awwId, name });
    await newAww.save();
    res.json({ success: true, message: "AWW added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUser = async (req,res)=>{
    try{
        const awws = await awwModel.find()
        res.json({success:true, message : awws})
    }
    catch(error){
        res.json({success : true, message : error.message})
    }
}

export {getUser, addUser}