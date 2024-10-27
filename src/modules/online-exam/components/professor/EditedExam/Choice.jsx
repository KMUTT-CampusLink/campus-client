import { useState } from 'react';

export default function Choice({ onAddChoice, choices, onDeleteChoice }) {
  const [choice, setChoice] = useState({ choiceText: '', isCorrect: false });

  const handleAddChoice = () => {
    if (choice.choiceText.trim()) {
      onAddChoice(choice);
      setChoice({ choiceText: '', isCorrect: false });
    }
  };

  return (
    <div className="flex gap-[10px]">
      <input
        className="border h-auto p-[10px] rounded-lg w-full"
        type="text"
        placeholder="Add choice"
        value={choice.choiceText}
        onChange={(e) => setChoice({ ...choice, choiceText: e.target.value })}
      />
      <button className="btn w-auto" onClick={handleAddChoice}>Add Choice</button>
    </div>
  );
};