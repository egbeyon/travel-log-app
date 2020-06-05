const router = require('express').Router();
const LogEntry = require('../model/LogEntry');

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/howfar', async (req, res) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

router.route('/:id').get((req, res) => {
    LogEntry.findById(req.params.id)
        .then(travelite => res.json(travelite))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    LogEntry.findByIdAndDelete(req.params.id)
        .then(() => res.json('LogEntry has been deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').put((req, res) => {
    LogEntry.findById(req.params.id)
        .then(travelite => {
            travelite.title = req.body.title;
            travelite.rating = Number(req.body.rating),
            travelite.description = req.body.description;
            travelite.image = req.body.image;
            travelite.comments = req.body.comments;
            travelite.longitude = Number(req.body.longitude);
            travelite.latitude = Number(req.body.latitude);
            travelite.visitDate = Date.parse(req.body.visitDate);

            travelite.save()
            .then(() => res.json('travelite has been updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
            
        .catch(err => res.status(400).json('Error: ' + err));
});
 
module.exports = router;