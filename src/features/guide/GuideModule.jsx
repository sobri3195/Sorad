import { useMemo, useState } from 'react';
import { Card } from '../../components/Card';
import { guideItems } from '../../data/contentData';

export const GuideModule = ({ onBookmark, onActivity }) => {
  const [q, setQ] = useState('');
  const [site, setSite] = useState('All');
  const filtered = useMemo(() => guideItems.filter((g) => (site === 'All' || g.site === site) && g.site.toLowerCase().includes(q.toLowerCase())), [q, site]);

  return (
    <Card title="Disease Site Guide" subtitle="Educational quick reference">
      <div className="row wrap">
        <input placeholder="Search site" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={site} onChange={(e) => setSite(e.target.value)}>
          <option>All</option>{guideItems.map((g) => <option key={g.id}>{g.site}</option>)}
        </select>
      </div>
      {filtered.map((g) => (
        <div key={g.id} className="list-item" onClick={() => onActivity({ id: `guide-${g.id}`, label: `Read guide ${g.site}` })}>
          <div>
            <h4>{g.site}</h4><p>{g.overview}</p>
            <small>Role: {g.role}</small><br />
            <small>Fractionation: {g.fractionation}</small><br />
            <small>OAR: {g.oar.join(', ')} | Toxicities: {g.toxicity.join(', ')}</small>
          </div>
          <button className="ghost" onClick={(e) => { e.stopPropagation(); onBookmark({ id: g.id, module: 'guide', title: g.site }); }}>☆</button>
        </div>
      ))}
    </Card>
  );
};
