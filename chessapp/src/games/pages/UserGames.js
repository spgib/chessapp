import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserGame from '../components/UserGame';
import { AuthContext } from '../../store/context/auth-context';

const UserGames = (props) => {
  const [games, setGames] = useState([]);
  const auth = useContext(AuthContext);
  const params = useParams();

  const uid = params.uid;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await fetch(
          `http://localhost:5000/api/games/list/user/${uid}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token,
            },
          }
        );

        const gamesData = await games.json();

        if (!games.ok) {
          throw new Error(gamesData.message);
        }
        
        setGames(gamesData.userGames);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGames();
  }, [setGames, uid, auth.token]);

  let content;
  if (games.length > 0) {
    content = games.map((game) => {
      return (
        <UserGame
          id={game.id}
          key={game.id}
          title={game.title}
          turns={game.turns}
          wPlayer={game.wplayer}
          bPlayer={game.bplayer}
          checkmate={game.checkmate}
          resignation={game.resignation}
          winner={game.winner}
          description={game.description}
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
