import { useState } from 'react';
import { Card } from '../../components/Card';
import { noteTemplates } from '../../data/contentData';

export const NotesModule = ({ notes, setNotes, onBookmark }) => {
  const [draft, setDraft] = useState({ id: '', title: '', body: '', tags: '' });

  const save = () => {
    if (!draft.title) return;
    const payload = { ...draft, id: draft.id || `n-${Date.now()}`, favorite: false, updatedAt: new Date().toISOString() };
    setNotes((prev) => [payload, ...prev.filter((n) => n.id !== payload.id)]);
    setDraft({ id: '', title: '', body: '', tags: '' });
  };

  return (
    <div className="stack">
      <Card title="Personal Notes" subtitle="Autosave local, template, export/import JSON">
        <div className="row wrap">
          {noteTemplates.map((t) => <button key={t.id} className="ghost" onClick={() => setDraft({ ...draft, title: t.title, body: t.body })}>{t.title}</button>)}
        </div>
        <input placeholder="Title" value={draft.title} onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))} />
        <textarea rows="5" placeholder="Write your note..." value={draft.body} onChange={(e) => setDraft((p) => ({ ...p, body: e.target.value }))} />
        <input placeholder="Tags (comma separated)" value={draft.tags} onChange={(e) => setDraft((p) => ({ ...p, tags: e.target.value }))} />
        <div className="row">
          <button onClick={save}>Save Note</button>
          <button className="ghost" onClick={() => setDraft({ id: '', title: '', body: '', tags: '' })}>Reset</button>
        </div>
        <div className="row">
          <button className="ghost" onClick={() => {
            const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'sorad-notes.json'; a.click(); URL.revokeObjectURL(url);
          }}>Export JSON</button>
          <label className="file-upload">Import JSON<input type="file" accept="application/json" onChange={async (e) => {
            const file = e.target.files?.[0]; if (!file) return;
            const text = await file.text();
            const incoming = JSON.parse(text);
            if (Array.isArray(incoming)) setNotes(incoming);
          }} /></label>
        </div>
      </Card>
      <Card title="Recent Notes">
        {notes.length ? notes.map((n) => (
          <div className="list-item" key={n.id}>
            <div onClick={() => setDraft({ id: n.id, title: n.title, body: n.body, tags: n.tags || '' })}>
              <h4>{n.title}</h4><p>{n.body.slice(0, 80)}...</p><small>{n.tags || '-'}</small>
            </div>
            <div className="row">
              <button className="ghost" onClick={() => onBookmark({ id: n.id, module: 'notes', title: n.title })}>☆</button>
              <button className="ghost" onClick={() => setNotes((prev) => prev.map((x) => x.id === n.id ? { ...x, favorite: !x.favorite } : x))}>{n.favorite ? '★' : '☆'}</button>
              <button className="ghost" onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))}>🗑</button>
            </div>
          </div>
        )) : <p className="empty">Belum ada notes. Mulai dari template.</p>}
      </Card>
    </div>
  );
};
