import React, { useState } from "react";

export default function MyComponent(Card) {
  const [firstCardCompleted, setFirstCardCompleted] = useState(false);

  function handleFirstCard() {
    // Do some processing here
    setFirstCardCompleted(true);
  }

  return (
    <div>
      <div>
        <Card onClick={handleFirstCard}>First Card</Card>
        {firstCardCompleted ? <Card>Second Card</Card> : null}
      </div>
    </div>
  );
}
