const express = require('express');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/list/public', gamesControllers.getPublicList);

router.get('/list/user/:uid', gamesControllers.getUserList);

router.post('/', gamesControllers.postSaveGame);

router.get('/:gid', gamesControllers.getLoadGame);

router.patch('/:gid', gamesControllers.patchEditGame);

router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;