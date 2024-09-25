// Login with Google controllers 

exports.loginSuccess = (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User Login",
            user: req.user,
        });
    } else {
        res.status(400).json({
            message: "Not Authorized",
        });
    }
};
