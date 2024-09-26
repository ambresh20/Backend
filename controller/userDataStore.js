// Stored User Dashboard from after login
const UserDashboardData = require("../model/userDashboardData") ;

const storeUserDashboard = async (req, res) => {
	
	try {
		const {name, dob, occupation, interest, bio} = req.body ;

		if(!name || !dob || !occupation || !interest){
			console.log("Not all Fields...") ;
			return res.status(400).json({
				status: 400,
				message: "Please fill all fields",
			  });
		}

		const dashboardUser = new UserDashboardData({
            name,
            dob,
            occupation,
			interest,
			bio
        });

        await dashboardUser.save();
        res.status(200).json({ message: 'Form submitted successfully!', data:dashboardUser });
	} 
	catch (error) {
		res.status(500).json({ error: 'An error occurred while saving data' })
	}
}


module.exports = storeUserDashboard ;