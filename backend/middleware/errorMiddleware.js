const errorMiddleware = (err,req, res, next) => {
    res.status(err.status || 500);

    // development error handler
    // will print stacktrace
    if (process.env.DEV_MODE === 'development') {
    
        res.send({
            message: 'something went wrong',
            error: err
        });
    }

    // production error handler
    // no stacktraces leaked to user
    res.send( {
        message:  'something went wrong',
        error: {},
        
    });
    
}

export default errorMiddleware;