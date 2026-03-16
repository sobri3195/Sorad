import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';

export const HomePage = ({ activity, bookmarks, stats, recentModule }) => (
  <div className="stack">
    <SectionHeader title="Good day, learner" description="Continue mastering radiation oncology fundamentals." />
    <Card title="Dashboard Stats">
      <div className="grid-2">
        <p>Flashcards studied: <strong>{stats.cardsStudied || 0}</strong></p>
        <p>Quiz completed: <strong>{stats.quizDone || 0}</strong></p>
        <p>Bookmarks: <strong>{bookmarks.length}</strong></p>
        <p>Notes: <strong>{stats.notesCount || 0}</strong></p>
      </div>
      <p className="muted">Last opened module: {recentModule || 'Home'}</p>
    </Card>
    <Card title="Continue Learning" subtitle="Quick shortcuts">
      <div className="chips">
        <Link to="/learn">Learn Hub</Link>
        <Link to="/tools">Calculators</Link>
        <Link to="/notes">Notes</Link>
      </div>
    </Card>
    <Card title="Recent Activity">
      {activity.length ? activity.slice(0, 5).map((a) => <p key={a.id}>• {a.label}</p>) : <p className="empty">Belum ada aktivitas terbaru.</p>}
    </Card>
    <Card title="Bookmarked Items">
      {bookmarks.length ? bookmarks.slice(0, 5).map((b) => <p key={`${b.module}-${b.id}`}>{b.module.toUpperCase()} · {b.title}</p>) : <p className="empty">Belum ada bookmark.</p>}
    </Card>
  </div>
);
