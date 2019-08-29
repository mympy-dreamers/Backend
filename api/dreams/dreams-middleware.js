const dreamsDB = require('./dreams-model');

//Vaidates the dream id when dreams are updated and deleted using a dream id

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
        const { dream_name, dream_short_description, donation_goal, user_id } = req.body;
        user_id ?
            dream_name && dream_short_description && donation_goal
                ? next()
                : res.status(400).json({ message: 'Missing required fields.' })
            : res.status(400).json({ message: 'Dreams Require a User Id.' })
    }
}

//makes sure that all required fields are filled when when dream is posted