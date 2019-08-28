const Journals = require('./journals-model');

module.exports = {

    //Validates journal Id is valid when journals are updated
    validateJournalID: async (req, res, next) => {
        try {
            const { id } = req.params;
            const journal = await Journals.findById(id);

            journal
                ? next()
                : res.status(400).json({ message: 'invalid id' });

        } catch (err) {
            res.status(404).json({ message: 'cannot find journal id' });
        }
    },
    validateUserID: async (req, res, next) => { //Validates user Id is valid when journals are updated
        try {
            const { user_id } = req.body;
            const user = await Journals.findUser(user_id);

            user
                ? next()
                : res.status(400).json({ message: 'invalid user id' });

        } catch (err) {
            res.status(500).json({ message: 'sumting wong wit user' });
        }
    },
    validateDreamID: async (req, res, next) => { //Validates dream Id is valid when journals are updated
        try {
            const { dream_id } = req.body;
            const dream = await Journals.findDream(dream_id);

            dream
                ? next()
                : res.status(400).json({ message: 'invalid dream id' });

        } catch (err) {
            res.status(500).json({ message: 'sumting wong wit dream' });
        }
    },
    validateJournalBody: (req, res, next) => { //Validates journal Id is valid when journals are updated
        const { title, body, user_id, dream_id } = req.body;
        user_id && dream_id ?
            title && body
                ? next()
                : res.status(400).json({ message: 'Missing required fields.' })
            : res.status(400).json({ message: 'user_id and dream_id missing' })
    }
}