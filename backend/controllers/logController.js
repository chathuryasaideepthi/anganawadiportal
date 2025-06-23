// logController.js
import logModel from "../models/logModel.js";

// save a counselling log
const addLog = async (req, res) => {
  try {
    const newLog = new logModel(req.body);
    await newLog.save();
    res.json({ success: true, message: "Log saved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all logs (for admin)
const getAllLogs = async (req, res) => {
  try {
    const logs = await logModel.find().sort({ timestamp: -1 });
    res.json({ success: true, message: logs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addLog, getAllLogs };
