import { useState } from 'react';
import { Card } from '../../components/Card';
import { atlasItems } from '../../data/contentData';

export const AtlasModule = ({ onBookmark, onActivity }) => {
  const [selected, setSelected] = useState(atlasItems[0]);
  return (
    <div className="stack">
      <Card title="Atlas" subtitle="GTV, CTV, ITV, PTV, OAR, simulation concepts">
        <div className="chips">{atlasItems.map((item) => <button key={item.id} className="chip-btn" onClick={() => { setSelected(item); onActivity({ id: `atlas-${item.id}`, label: `Viewed atlas ${item.title}` }); }}>{item.title}</button>)}</div>
      </Card>
      <Card title={selected.title} subtitle={selected.category} action={<button className="ghost" onClick={() => onBookmark({ id: selected.id, module: 'atlas', title: selected.title })}>Bookmark</button>}>
        <p>{selected.description}</p>
        <p className="muted">Related: {selected.related.join(', ')}</p>
        <div className="placeholder-ill">Atlas illustration placeholder</div>
      </Card>
    </div>
  );
};
