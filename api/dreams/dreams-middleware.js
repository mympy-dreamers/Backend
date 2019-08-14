const dreamsDB = require('./dreams-model');

module.exports = {
    validateDreamId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const dream = await dreamsDB.getDreamById(id);

            dream
                ? next()
                : res.status(400).json({ message: 'invalid id' });

        } catch (err) {
            res.status(404).json({ message: 'cannot find dream id' });
        }
    },
    validateDreamBody: (req, res, next) => {
        const { dream_name, dream_short_description, user_id } = req.body;

        dream_name && dream_short_description && user_id
            ? next()
            : res.status(400).json({ message: 'Missing required fields.' })
    }
}