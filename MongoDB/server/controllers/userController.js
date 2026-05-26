const UserModel = require("../models/Users");
const CreateSchema = require("../validations/userValidation");
async function getUsers(req, res) {
  try {
    const data = await UserModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUser(req, res) {
  try {
    const data = await UserModel.findById(req.params.id);
    console.log("User data", data);
    res.json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  try {
  const { value, error } = CreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
    const { name, email } = value;
    const newUser = new UserModel({ name, email });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.log("FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
module.exports = { getUsers, getUser, createUser };
