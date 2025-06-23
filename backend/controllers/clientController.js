import clientModel from "../models/clientModel.js";

// this is to get details of all clients assigned to each AWW worker

const getClientsByAww = async (req, res) => {
  const { awwId } = req.params;

  try {
    const clients = await clientModel.find({ assignedAwwId: awwId });
    res.json({ success: true, message: clients });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const addClient = async (req, res) => {
  try {
    const newClient = new clientModel(req.body);
    await newClient.save();
    res.json({ success: true, message: "Client added and assigned successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export { getClientsByAww, addClient };