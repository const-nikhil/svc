export default (err, req, res, next) => {
    res.json(
        {
            error: err.error,
            status: err.status,
            message: err.message || 'ERROR',
            timestamp: new Date()
        }
    );
};