import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('Hoang Duy')

  const handleChangeName = () => {
    setName('Duy')
  }

  return (
    <div className="App">
      <div>{name}</div>
      <button onClick={handleChangeName}>Change name</button>
    </div>
  );
}

export default App;
