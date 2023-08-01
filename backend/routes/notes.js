const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Fetch all notes who is loggedIn
// Part-1 GET all notes using: GET "/api/notes/fetchallnotes" Login require

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); //User wise Fetch note 
        res.json(notes);
        // console.log(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
//-----------------------------------------------------------------------------------


// Part-2 Add new notes using: POST "/api/notes/addnote" Login require

router.post('/addnote', fetchuser, [
    // Validation using express-validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter at least 5 characters of description').isLength({ min: 5 })
], async (req, res) => {

    try {
        // If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }

        // Destructer Method
        const { title, description, tag } = req.body;

        // If no error then save that note
        const note = new Note({ // It will return promise
            title, description, tag, user: req.user.id
        });

        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
//-----------------------------------------------------------------------------------


// Part-3 Update notes using: PUT "/api/notes/updatenote" Login require

router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // Create new note object
            const newNote = {};
            // If we get title as a part of request the we will add into newNote Onject
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            // Find the note to be updated and update it
            let note = await Note.findById(req.params.id); // Is this id which is we wants to update
            
            if (!note) {
                return res.status(404).send("Not Found");
            }

            // Compate the user is that req user and who has add note
            if(note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
 
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
            res.json({note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    });
//-----------------------------------------------------------------------------------


// Part-4 Delete notes using: DELETE "/api/notes/deletenote" Login require
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {

            // Find the note to be deleted and delete it
            let note = await Note.findById(req.params.id); // Is this id which is we wants to update
            if (!note) {
                return res.status(404).send("Not Found");
            }

            // Allow deletion only if user owns this note
            if(note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
 
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({"Success": "Note has been Deleted", note: note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    });
//-----------------------------------------------------------------------------------

module.exports = router;