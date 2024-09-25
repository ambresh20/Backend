
const User = require("../model/user") ;

const getUser = async (req, res) => {
	try {
		const userData = await User.find({});
		res.json({ success: true, message:"All User Data", data: userData });
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};

module.exports = getUser ;