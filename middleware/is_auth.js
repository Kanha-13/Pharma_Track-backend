const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>
{
    const check  = req.cookies.***REMOVED***
    if(!check)
    {
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        res.status(401).json({error:error})
        throw error;
    }
    const token  = check;
   
    let decodedToken;
    try{    
            decodedToken = jwt.verify(token,'***REMOVED***');
    } catch(err)
    {
        err.statusCode = 600;
        res.status(401).json({error:err})
        throw err;
    }
    
    if(!decodedToken)
    {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        res.status(401).json({error:error})
        throw error;
    }
    next();
};