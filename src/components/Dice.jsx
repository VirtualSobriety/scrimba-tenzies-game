import React, { useState } from "react";

export default function Dice({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };

  return (
    <div onClick={holdDice} className={"dice"} style={styles}>
      {value}
    </div>
  );
}
