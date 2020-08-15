import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
const API_URL = 'http://localhost:8000/';

export const LeaderBoard = ({ winner }) => {
  const [board, setBoard] = useState([]);
  const [scoresList, setScoresList] = useState([]);

  useEffect(() => {
    updateBoard();
  }, [winner]);

  const updateBoard = async () => {
    try {
      const url = `${API_URL}board/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (response.status !== 200)
        throw new Error(`Unable to add score: ${json.message}`);
        setBoard(json.board)
    } catch (err) {
      console.log(err);
    }
    
  };

  const list = board.map((e) => {
    return <div key={e.username} className="entry">
    <p>{e.username}</p>
    <p>{e.score}</p>
  </div>;
  });
  return (
    <div className="leader-board">
      <h2>Leader board</h2>
      <div className="board">
        <div className="entry">
          <p>Name</p>
          <p>Wins</p>
        </div>
        {list}
      </div>
    </div>
  );
};
