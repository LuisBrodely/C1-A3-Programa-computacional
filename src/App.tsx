import React, { useState } from 'react';

const isValidCharacter = (char: string, position: number, previousValid: boolean): boolean => {
  if (position === 3 && previousValid) {
    return /^[0-9]$/.test(char);
  }

  if (position === 0 || position === 1 || position === 2) {
    if (previousValid) {
      return /^[0-9]$/.test(char);
    } else {
      return /^[1-9]$/.test(char);
    }
  }

  return false;
};

const isInRange = (value: string): boolean => {
  const intValue = parseInt(value, 10);
  return intValue >= 1 && intValue <= 9999;
};

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [characters, setCharacters] = useState<string[]>([]);
  const [invalidCharacterDetected, setInvalidCharacterDetected] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validChars: string[] = [];

    let previousValid = true;
    let invalidCharacterFound = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (isValidCharacter(char, i, previousValid)) {
        validChars.push(char);
        previousValid = true;
      } else {
        if (!invalidCharacterFound) {
          invalidCharacterFound = true;
          validChars.push(char);
        }
        previousValid = false;
      }
    }

    if (validChars.length === 4) {
      const value = validChars.join('');
      if (!isInRange(value)) {
        invalidCharacterFound = true;
      }
    }

    setInputValue(input);
    setCharacters(validChars);
    setInvalidCharacterDetected(invalidCharacterFound);
  };

  return (
    <div>
      <h1>Validador de Cadenas</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        {characters.length > 0 && (
          <p>Caracteres: {characters.join(', ')}</p>
        )}
        {invalidCharacterDetected && (
          <p>Carácter inválido detectado.</p>
        )}
      </div>
    </div>
  );
};

export default App;
