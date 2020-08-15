import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/';

export const PlayerRegister = ({ addPlayer }) => {
  const [player, setPlayer] = useState('');
  const [listOfNames, setListOfNames] = useState([]);
  const handleUpdate = (e) => {
    setPlayer(e.target.value);
  };

  useEffect(() => {
    getNames();
  }, []);

  const selectPlayer = (name) => {
    addPlayer(name);
  };

  const getNames = async () => {
    try {
      const url = `${API_URL}user/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (response.status !== 200)
        throw new Error(`Unable to register: ${json.message}`);
      setListOfNames(json.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async () => {
    if (player.length === 0) return;
    const url = `${API_URL}user/register`;
    try {
      const url = `${API_URL}user/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: player, password: 'fdsafad' }),
      });
      const json = await response.json();
      if (response.status !== 201)
        throw new Error(`Unable to register: ${json.message}`);
      addPlayer(player);
    } catch (err) {
      console.log(err);
    }
  };

  const list = listOfNames.map((e) => {
    return (
      <option key={e.username} value={e.username}>
        {e.username}
      </option>
    );
  });
  list.unshift(<option key="empty" value={''}></option>);
  return (
    <div>
      <input type="text" value={player} onChange={handleUpdate} />
      <button onClick={handleRegister}>Register</button>
      <select onChange={(e) => addPlayer(e.target.value)}>{list}</select>
    </div>
  );
};
