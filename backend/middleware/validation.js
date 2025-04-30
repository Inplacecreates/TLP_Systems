const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format'
        });
    }

    // Password length validation
    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long'
        });
    }

    next();
};

module.exports = {
    validateLogin
};
