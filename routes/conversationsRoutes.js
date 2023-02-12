const express = require('express');

const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.get('/', conversationController.blog_index);
router.get('/:id', conversationController.blog_details);
// router.post('/', conversationController.blog_post);
router.delete('/:id', conversationController.blog_delete)

module.exports = router;