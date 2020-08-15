import React, { useState } from 'react';
import { PlayerRegister } from '../PlayerRegister/PlayerRegister';
import { PointManagementSystem } from '../PointManager/PointManagementSystem';

export const Game = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player1IsServing, setPlayer1IsServing] = useState(true);

  const canStartGame = () => {
    return player1.length > 0 && player2.length > 0 && player1 !== player2;
  };

  return (
    <div>
      {canStartGame() ? (
        <PointManagementSystem player1={player1} player2={player2} />
      ) : (
        <div>
          <PlayerRegister addPlayer={setPlayer1} />
          <PlayerRegister addPlayer={setPlayer2} />{' '}
        </div>
      )}
    </div>
  );
};
