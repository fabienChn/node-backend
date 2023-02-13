const express = require('express');

const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.get('/', conversationController.conversation_index);
router.get('/:id', conversationController.conversation_details);
// router.post('/', conversationController.conversation_post);
// router.delete('/:id', conversationController.conversation_delete)

module.exports = router;