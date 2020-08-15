import React, { useState, useEffect } from 'react';
import { LeaderBoard } from '../LeaderBoard/LeaderBoard';
const API_URL = 'http://localhost:8000/';

export const PointManagementSystem = ({ player1, player2 }) => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    checkWinner();
    updateTurn();
  }, [player1Score, player2Score]);

  const [player1IsServing, setPlayer1IsServing] = useState(false);

  const addPointPlayer1 = () => {
    if (winner) return;
    setPlayer1Score((prev) => prev + 1);
  };

  const addPointPlayer2 = () => {
    if (winner) return;
    setPlayer2Score((prev) => prev + 1);
  };

  const updateTurn = () => {
    if ((player1Score + player2Score) % 2 !== 0) return;
    setPlayer1IsServing((prev) => !prev);
    setTurn((prev) => prev + 1);
  };

  const declareWinner = async (player) => {
    setWinner(player1);
    try {
      const url = `${API_URL}board/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: player }),
      });
      const json = await response.json();
      if (response.status !== 200)
        throw new Error(`Unable to add score: ${json.message}`);
    } catch (err) {
      console.log(err);
    }
  };

  const checkWinner = () => {
    if (player1Score <= 10 && player2Score <= 10) return;

    if (player1Score >= 10 && player2Score >= 10) {
      if (player1Score - player2Score >= 2) declareWinner(player1);
      else if (player2Score - player1Score >= 2) declareWinner(player2);
    } else if (player1Score > 10) {
      declareWinner(player1);
    } else if (player2Score > 10) {
      declareWinner(player2);
    }
  };

  return (
    <div>
      <LeaderBoard winner={winner} />
      <h3>
        Player 1 {player1} points: {player1Score}
      </h3>
      <button onClick={addPointPlayer1}>add point</button>
      <h3>
        Player 2 {player2} points: {player2Score}
      </h3>
      <button onClick={addPointPlayer2}>add point</button>
      {/* <h3>Current Turn: {turn}</h3> */}
      <h3>Current Server: {player1IsServing ? player1 : player2}</h3>
      <h2>winner: {winner}</h2>
    </div>
  );
};
