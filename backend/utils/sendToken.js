// Create token and save it in the cookie
export default (user, statusCode, res) => {
    // Create JWT token
    const token = user.getJwtToken();

    // options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true   //used http because http can only be accessed in the backend not in the frontend
    };

    res.status(statusCode).cookie("token", token, options).json({
        token,
    })
}