export default (req, res, next) => {
    next({
        error: "ROUTE NOT FOUND",
        code: 404
    });
};
