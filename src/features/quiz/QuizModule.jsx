import { useMemo, useState } from 'react';
import { Card } from '../../components/Card';
import { quizCategories, quizQuestions } from '../../data/contentData';

export const QuizModule = ({ onSaveScore, favorites, toggleFavoriteCategory }) => {
  const [category, setCategory] = useState(quizCategories[0]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const filtered = useMemo(() => quizQuestions.filter((q) => q.category === category), [category]);
  const current = filtered[index] || filtered[0];
  const score = filtered.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);

  if (!current) return <Card title="Quiz"><p>Belum ada soal di kategori ini.</p></Card>;

  return (
    <Card title="Quiz Offline" subtitle="Practice & exam-style without external API">
      <div className="row wrap">
        <select value={category} onChange={(e) => { setCategory(e.target.value); setIndex(0); setAnswers({}); }}>
          {quizCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="ghost" onClick={() => toggleFavoriteCategory(category)}>{favorites.includes(category) ? '★ Favorit' : '☆ Favorite Category'}</button>
      </div>
      <p className="progress">Progress: {index + 1}/{filtered.length}</p>
      <progress max={filtered.length} value={index + 1} />
      <h4>{current.question}</h4>
      <div className="stack">
        {current.options.map((opt, i) => (
          <button key={opt} className={answers[current.id] === i ? 'selected' : ''} onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: i }))}>{opt}</button>
        ))}
      </div>
      <p className="muted">Pembahasan: {current.explanation}</p>
      <div className="row">
        <button className="ghost" disabled={index === 0} onClick={() => setIndex((v) => v - 1)}>Previous</button>
        <button className="ghost" disabled={index === filtered.length - 1} onClick={() => setIndex((v) => v + 1)}>Next</button>
      </div>
      <button onClick={() => onSaveScore({ category, score, total: filtered.length, mode: 'practice', at: new Date().toISOString() })}>Simpan Hasil ({score}/{filtered.length})</button>
    </Card>
  );
};
