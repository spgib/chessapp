const express = require('express');
const { body } = require('express-validator');

const authCheck = require('../middleware/auth-check');
const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/list/public', gamesControllers.getPublicList);

router.get('/lookup/:gid', gamesControllers.getGameLookup);

router.get('/public/:gid', gamesControllers.getLoadPublic);

router.use(authCheck);

router.get('/private/:gid', gamesControllers.getLoadPrivate);

router.get('/list/user/:uid', gamesControllers.getUserList);

router.post(
  '/',
  [body('title').not().isEmpty(), body('string').not().isEmpty()],
  gamesControllers.postSaveGame
);

router.patch(
  '/:gid',
  [body('title').not().isEmpty()],
  gamesControllers.patchEditGame
);

router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;
