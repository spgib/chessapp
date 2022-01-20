const express = require('express');
const { body } = require('express-validator');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/list/public', gamesControllers.getPublicList);

router.get('/list/user/:uid', gamesControllers.getUserList);

router.post(
  '/',
  [body('title').not().isEmpty(), body('string').not().isEmpty()],
  gamesControllers.postSaveGame
);

router.get('/:gid', gamesControllers.getLoadGame);

router.patch(
  '/:gid',
  [body('title').not().isEmpty(), body('string').not().isEmpty()],
  gamesControllers.patchEditGame
);

router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;
