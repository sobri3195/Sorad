import { useMemo, useState } from 'react';
import { Card } from '../../components/Card';
import { terms } from '../../data/contentData';

export const TermsModule = ({ onBookmark, onRecentSearch }) => {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => terms.filter((t) => `${t.name} ${t.definition}`.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <Card title="Terms A-Z" subtitle="Realtime search for radiation oncology glossary">
      <input placeholder="Cari istilah" value={q} onChange={(e) => { setQ(e.target.value); onRecentSearch(e.target.value); }} />
      <div className="stack">
        {filtered.length ? filtered.map((term) => (
          <div key={term.id} className="list-item">
            <div>
              <h4>{term.name}</h4>
              <p>{term.definition}</p>
              <small>{term.category} · Related: {term.related.join(', ')}</small>
            </div>
            <button className="ghost" onClick={() => onBookmark({ id: term.id, module: 'terms', title: term.name })}>☆</button>
          </div>
        )) : <p className="empty">No results. Coba kata kunci lain.</p>}
      </div>
    </Card>
  );
};
