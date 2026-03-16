import { useState } from 'react';
import { CalcModule } from '../features/calc/CalcModule';
import { Card } from '../components/Card';

export const ToolsPage = ({ onSaveCalc, calcHistory, quizScores, activity, bookmarks, onBookmark }) => {
  const [tab, setTab] = useState('Calc');
  return (
    <div className="stack">
      <div className="chips">{['Calc', 'History', 'Bookmarks'].map((t) => <button key={t} className={`chip-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Calc' && <CalcModule onSaveHistory={onSaveCalc} onBookmark={onBookmark} />}
      {tab === 'History' && (
        <Card title="Unified History">
          <h4>Latest Calculations</h4>{calcHistory.slice(0, 5).map((h, i) => <p key={i}>{h.type}: {h.value}</p>)}
          <h4>Latest Quiz Scores</h4>{quizScores.slice(0, 5).map((s, i) => <p key={i}>{s.category}: {s.score}/{s.total}</p>)}
          <h4>Latest Learning Activity</h4>{activity.slice(0, 5).map((a) => <p key={a.id}>{a.label}</p>)}
        </Card>
      )}
      {tab === 'Bookmarks' && (
        <Card title="Unified Bookmarks">
          {bookmarks.length ? bookmarks.map((b) => <p key={`${b.module}-${b.id}`}>{b.module.toUpperCase()} · {b.title}</p>) : <p className="empty">Belum ada bookmark lintas modul.</p>}
        </Card>
      )}
    </div>
  );
};
