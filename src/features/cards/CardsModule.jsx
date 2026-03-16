import { useMemo, useState } from 'react';
import { Card } from '../../components/Card';
import { cardItems } from '../../data/contentData';

export const CardsModule = ({ progress, setProgress, onBookmark }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const cards = useMemo(() => shuffle ? [...cardItems].sort(() => Math.random() - 0.5) : cardItems, [shuffle]);
  const current = cards[index] || cards[0];

  if (!current) return null;

  return (
    <Card title="Flashcards" subtitle="Flip, shuffle, and track learning progress">
      <p className="chip">{current.category}</p>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
        <p>{flipped ? current.back : current.front}</p>
      </div>
      <p className="progress">{index + 1}/{cards.length}</p>
      <div className="row wrap">
        <button className="ghost" onClick={() => setIndex((v) => Math.max(0, v - 1))}>Previous</button>
        <button className="ghost" onClick={() => setIndex((v) => Math.min(cards.length - 1, v + 1))}>Next</button>
        <button className="ghost" onClick={() => setShuffle((v) => !v)}>{shuffle ? 'Unshuffle' : 'Shuffle'}</button>
      </div>
      <div className="row">
        <button onClick={() => setProgress((prev) => ({ ...prev, cardsStudied: (prev.cardsStudied || 0) + 1 }))}>Tandai Dipelajari</button>
        <button className="ghost" onClick={() => onBookmark({ id: current.id, module: 'cards', title: current.front })}>Bookmark</button>
      </div>
    </Card>
  );
};
