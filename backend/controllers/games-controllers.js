const { validationResult } = require('express-validator');

const GameRepo = require('../repos/game-repo');
const HttpError = require('../models/http-error');

module.exports.getPublicList = async (req, res, next) => {
  let publicGames;
  try {
    publicGames = await GameRepo.findAllPublic();
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!publicGames) {
    const error = new HttpError('Failed to load resource.', 404);
    return next(error);
  }

  res.status(200).json({
    message: 'Resource successfully retrieved.',
    publicGames,
  });
};

module.exports.getUserList = async (req, res, next) => {
  const { userId } = req.body;

  let userGames;
  try {
    userGames = await GameRepo.findByUser(userId);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!userGames) {
    const error = new HttpError('Failed to load resource.', 404);
    return next(error);
  }

  res.status(200).json({
    message: 'Resource successfully retrieved.',
    userGames,
  });
};

module.exports.postSaveGame = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs, please check your data.', 422);
    return next(error);
  }

  const { gameObject } = req.body;

  let game;
  try {
    game = await GameRepo.insert(gameObject);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!game) {
    const error = new HttpError('Failed to save game.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Game successfully saved.', game });
};

module.exports.getLoadGame = async (req, res, next) => {
  const gameId = req.params.gid;

  let game;
  try {
    game = await GameRepo.findById(gameId);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!game) {
    const error = new HttpError('Failed to retrieve game.', 404);
    return next(error);
  }

  res.status(200).json({ message: 'Game successfully retrieved.', game });
};

module.exports.patchEditGame = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs, please check your data.', 422);
    return next(error);
  }

  const gameId = req.params.gid;
  const { gameObject } = req.body;

  let game;
  try {
    game = await GameRepo.update(gameId, gameObject);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!game) {
    const error = new HttpError('Failed to update game.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Game successfully updated.', game });
};

module.exports.deleteGame = async (req, res, next) => {
  const gameId = req.params.gid;

  let game;
  try {
    game = await GameRepo.delete(gameId);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!game) {
    const error = new HttpError('Failed to delete game.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deletion successful.', game });
};
