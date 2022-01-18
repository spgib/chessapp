import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserGame from '../components/UserGame';
import { AuthContext } from '../../store/context/auth-context';

const PublicGames = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const reviewGame = (id) => {
    navigate(`/${id}`);
  };

  let content;

  if (auth.games.length > 0) {
    content = auth.games
      .filter((game) => game.public)
      .map((game) => {
        return (
          <UserGame
            id={game.id}
            key={game.id}
            title={game.title}
            turns={game.turns}
            wPlayer={game.wPlayer}
            bPlayer={game.bPlayer}
            checkmate={game.checkmate}
            resignation={game.resignation}
            winner={game.winner}
            description={game.description}
            onReview={reviewGame}
            public={true}
            userId={game.userId}
          />
        );
      });
  }

  return (
    <React.Fragment>
      {content && <ul className='gamelist'>{content}</ul>}
      {!content && <h2>No games found! Go play some chess!</h2>}
    </React.Fragment>
  );
};

export default PublicGames;
