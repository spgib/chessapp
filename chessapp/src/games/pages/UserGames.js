import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserGame from '../components/UserGame';
import { AuthContext } from '../../store/context/auth-context';



const UserGames = (props) => {
  const auth = useContext(AuthContext);
  // const [games, setGames] = useState(auth.games.filter(game => game.userId === auth.userId));
  const navigate = useNavigate();

  const reviewGame = (id) => {
    navigate(`/${id}`);
  };

  const deleteGame = (id) => {
    auth.updateGames(auth.games.filter(game => game.id !== id));
  };

  // const editGame = (id, title, wPlayer, bPlayer, description, isPublic) => {
  //   const game = games.filter(game => game.userId === id);
  //   const index = games.indexOf()
  // };

  let content;

  if (auth.games.length > 0) {
    content = auth.games.filter(game => game.userId === auth.userId).map((game) => {
      return (
        <UserGame
          id={game.id}
          key={game.id}
          title={game.title}
          turns={game.turns}
          wPlayer={game.wPlayer}
          bPlayer={game.bPlayer}
          victoryState={game.victoryState}
          description={game.description}
          onDelete={deleteGame}
          onReview={reviewGame}
          // onEdit={editGame}
          isUser={auth.isLoggedIn}
          public={game.public}
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

export default UserGames;
