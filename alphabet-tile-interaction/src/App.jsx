import { useState } from 'react'
import './App.css'

function App() {
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter) => {
    const newOutputString = outputString + letter;
    setOutputString(handleConsecutiveLetters(newOutputString));
  };

  const handleConsecutiveLetters = (str) => {
    let result = str;
    for (let i = 0; i < result.length - 2; i++) {
      if (result[i] === result[i + 1] && result[i] === result[i + 2]) {
        const letter = result[i];
        let consecutiveCount = 3;
        while (result[i + consecutiveCount] === letter) {
          consecutiveCount++;
        }
        result = result.substring(0, i) + '_'.repeat(consecutiveCount) + result.substring(i + consecutiveCount);
      }
    }
    return result;
  };

  const renderAlphabetTiles = () => {
    const tiles = [];
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      tiles.push(<div key={i} className="tile" onClick={() => handleTileClick(letter)}> {letter} </div>);
    }
    return tiles;
  };

  return (
    <div className="alphabet-tile-app">
      <p>{ outputString }</p>
      <div className="alphabet-tile-grid">
        { renderAlphabetTiles() }
      </div>
    </div>
  );
}

export default App
