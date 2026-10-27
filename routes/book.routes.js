const express = require('express');
const router = express.Router();
const Book = require('../model/books.model');
const authtoken = require('../middleware/auth.middleware');

router.post('/create',(req,res)=>{
    const {title,auther}= req.body;
    const addbook = new Book({title,auther});
    addbook.save().then(()=>{res.status(201).json({ message: "Book created successfully" })}).catch((error) => {
			res.status(400).json({ error: "Unable to create book record", details: error });
		});
})

router.get('/get',async (req,res)=>{
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/update/:id',(req,res)=>{
 try {
        const updatedBook = Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/delete/:id',(req,res)=>{
    Book.findByIdAndDelete(req.params.id).then((Book) => {
			if (!Book) {
				return res.status(404).json({ error: "Book record not found" });
			}
			res.status(204).json({ message: "BOok record deleted successfully" });
		})
		.catch((error) => {
			res.status(500).json({ error: "Server error", details: error });
		});
})

module.exports = router;
