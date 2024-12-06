import { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Game() {
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDiceValue((oldDice) =>
      oldDice.map((prevValue) =>
        prevValue.isHeld ? { ...prevValue } : generateNewDie()
      )
    );
    setRollCount(rollCount + 1);
  }

  function holdDice(id) {
    setDiceValue((oldDice) =>
      oldDice.map((prevValue) =>
        prevValue.id === id
          ? { ...prevValue, isHeld: !prevValue.isHeld }
          : prevValue
      )
    );
  }

  const diceElements = diceValue.map((die) => (
    <Dice
      holdDice={() => holdDice(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ));

  function newGame() {
    setDiceValue(allNewDice);
    setTenzies(false);
    setRollCount(1);
  }

  useEffect(() => {
    if (
      diceValue.every((die) => die.value === diceValue[0].value)
      //   &&
      //   diceValue.every((die) => die.isHeld === diceValue[0].isHeld)
    ) {
      setTenzies(true);
    }
    if (tenzies) alert("you win!");
  }, [diceValue, tenzies]);

  return (
    <div>
      {tenzies && <Confetti />}
      <div className="game-main-container">
        <div className="game-inner-container">
          <h2 className="game-header">Tenzies</h2>
          <p className="game-paragraph">
            Roll until dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          {!tenzies && (
            <button className="roll-button" onClick={rollDice}>
              Roll
            </button>
          )}
          {tenzies && (
            <button className="roll-button" onClick={newGame}>
              New Game
            </button>
          )}
          <div>number of rolls: {rollCount}</div>
        </div>
      </div>
    </div>
  );
}
