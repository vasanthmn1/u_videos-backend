

const usererrHandel = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack,
    })
}

module.exports = usererrHandel