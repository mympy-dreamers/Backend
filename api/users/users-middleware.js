const userDB = require('./users-model');

module.exports = {
    validateUserId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userDB.get(id);
    
            user 
            ? next()
            : res.status(400).json({message: 'invalid id'});  
            
        } catch(err) {
            res.status(404).json({message: 'cannot find user id'});
        }
    },
    validateUserBody: (req, res, next) => {
        const { username, password, email } = req.body;
    
        username && password && email
        ? next()
        : res.status(400).json({message: 'Missing required fields.'})
    }   
}
