import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [shapes, setShapes] = useState([]);

  // Função para gerar uma cor aleatória
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Função para gerar uma figura geométrica aleatória
  const randomShape = () => {
    const shapeTypes = ['circle', 'square', 'triangle'];
    const shape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const size = Math.floor(Math.random() * 50) + 30; // Tamanho aleatório entre 30 e 80px
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    return {
      shape,
      size,
      x,
      y,
      color: randomColor(),
    };
  };

  // Atualiza a posição do mouse e cria novos elementos
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setBackgroundColor(randomColor()); // Muda a cor do fundo

    // Adiciona uma nova figura geométrica à tela (com limite de 10)
    setShapes((prevShapes) => {
      const newShape = randomShape();
      const updatedShapes = [...prevShapes, newShape];
      if (updatedShapes.length > 10) {
        updatedShapes.shift(); // Remove a figura mais antiga se ultrapassar o limite
      }
      return updatedShapes;
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App" style={{ backgroundColor }}>
      <h1 className="title">Caos Interativo</h1>
      <div className="shapes-container">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={`shape ${shape.shape}`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              transform: shape.shape === 'triangle' ? 'rotate(45deg)' : '',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
