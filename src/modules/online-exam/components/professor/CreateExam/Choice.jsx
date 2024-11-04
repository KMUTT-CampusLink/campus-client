import { useState } from 'react';

export default function Choice({ onAddChoice, choices, onDeleteChoice }) {
  const [choice, setChoice] = useState('');
  // add choice
  const handleAddChoice = () => {
    if (choice.trim()) {
      onAddChoice(choice);
      setChoice('');
    }
  };

  return (
    <div className='flex gap-[10px]'>
      <input
        className='border h-auto p-[10px] rounded-lg w-full'
        type="text"
        placeholder="Choice Text"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
      />
      <button className='btn w-auto' onClick={handleAddChoice}>Add Choice</button>
    </div>
  );
};