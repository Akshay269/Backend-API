const User = require("../Models/UserModel");

module.exports.uploadImages = async (req, res,next) => {
  try {
    const userId = req.user.id; 
    const { filename } = req.body; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.images.push({ filename });
    await user.save();
    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




