import { useMemo, useState } from 'react';
import { Card } from '../../components/Card';
import { oarItems } from '../../data/contentData';

export const OarModule = ({ onBookmark }) => {
  const [q, setQ] = useState('');
  const [site, setSite] = useState('All');
  const filtered = useMemo(() => oarItems.filter((o) => (site === 'All' || o.site === site) && `${o.name} ${o.site}`.toLowerCase().includes(q.toLowerCase())), [q, site]);

  return (
    <Card title="Organ at Risk" subtitle="Search and filter by disease site">
      <div className="row wrap">
        <input placeholder="Search OAR" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={site} onChange={(e) => setSite(e.target.value)}>
          <option>All</option>{[...new Set(oarItems.map((item) => item.site))].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {filtered.map((o) => (
        <div key={o.id} className="list-item">
          <div>
            <h4>{o.name}</h4><p>{o.overview}</p>
            <small>{o.site} · {o.concern}</small><br />
            <small>Related: {o.related.join(', ')}</small>
          </div>
          <button className="ghost" onClick={() => onBookmark({ id: o.id, module: 'oar', title: o.name })}>☆</button>
        </div>
      ))}
    </Card>
  );
};
