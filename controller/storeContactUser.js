// Stored Contact us form into our DATABASE
const ContactUser = require("../model/contactUser") ;

const storeContactUser = async (req, res) => {
	
	try {
		const {name, email, message} = req.body ;

		if(!name || !email || !message){
			console.log("Not all Fields...") ;
			return res.status(400).json({
				status: 400,
				message: "Please fill all fields",
			  });
		}

		const contactUser = new ContactUser({
            name,
            email,
            message,
        });

        await contactUser.save();
        res.status(200).json({ message: 'Form submitted successfully!', data:contactUser });
	} 
	catch (error) {
		res.status(500).json({ error: 'An error occurred while saving data' })
	}
}


module.exports = storeContactUser ;