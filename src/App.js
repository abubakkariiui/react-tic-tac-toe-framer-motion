import React, { useState } from 'react';
import Confetti from 'react-confetti'; // Importing Confetti
import { motion } from 'framer-motion';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex',
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: '#333',
  borderRadius: '8px',
  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease',
};

const disabledSquareStyle = {
  ...squareStyle,
  cursor: 'not-allowed',
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '250px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px solid #ccc',
  borderRadius: '12px',
  padding: '20px',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const instructionsStyle = {
  marginTop: '10px',
  marginBottom: '10px',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#555',
};

const buttonStyle = {
  marginTop: '20px',
  marginBottom: '20px',
  width: '100px',
  height: '50px',
  backgroundColor: '#6ab4e1',
  color: 'white',
  fontSize: '18px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease',
};

const winnerAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const Square = ({ value, onClick, winner }) => {
  return (
    <button
      className="square"
      onClick={() => onClick(value)}
      style={
        value !== null || winner !== 'None' ? disabledSquareStyle : squareStyle
      }
      disabled={value !== null || winner !== 'None'}
    >
      {value}
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('None');
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [confettiActive, setConfettiActive] = useState(false); // State to control confetti

  const matches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (let i = 0; i < matches.length; i++) {
      const [a, b, c] = matches[i];
      if (
        newBoard[a] === player &&
        newBoard[b] === player &&
        newBoard[c] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const onClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(player);
      setConfettiActive(true); // Activate confetti when a player wins
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner('None');
    setConfettiActive(false); // Deactivate confetti when resetting the game
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{player === 'X' ? 'O' : 'X'}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        {winner !== 'None' && (
          <>
            <motion.div
              style={{ marginTop: '10px' }}
              initial="hidden"
              animate="visible"
              variants={winnerAnimation}
            >
              Winner: <span>{winner}</span>
            </motion.div>
            {confettiActive && <Confetti />} {/* Render confetti when active */}
          </>
        )}
      </div>
      <button style={buttonStyle} onClick={onReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={board[0]} onClick={() => onClick(0)} winner={winner} />
          <Square value={board[1]} onClick={() => onClick(1)} winner={winner} />
          <Square value={board[2]} onClick={() => onClick(2)} winner={winner} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[3]} onClick={() => onClick(3)} winner={winner} />
          <Square value={board[4]} onClick={() => onClick(4)} winner={winner} />
          <Square value={board[5]} onClick={() => onClick(5)} winner={winner} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[6]} onClick={() => onClick(6)} winner={winner} />
          <Square value={board[7]} onClick={() => onClick(7)} winner={winner} />
          <Square value={board[8]} onClick={() => onClick(8)} winner={winner} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
