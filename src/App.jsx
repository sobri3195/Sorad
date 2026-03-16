import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { ToolsPage } from './pages/ToolsPage';
import { AboutPage } from './pages/AboutPage';
import { NotesModule } from './features/notes/NotesModule';
import { atlasItems, cardItems, guideItems, oarItems, terms } from './data/contentData';
import { storageKeys, pushUnique } from './utils/storage';
import { useLocalStorageState } from './hooks/useLocalStorageState';

const AppInner = () => {
  const [bookmarks, setBookmarks] = useLocalStorageState(storageKeys.bookmarks, []);
  const [calcHistory, setCalcHistory] = useLocalStorageState(storageKeys.calcHistory, []);
  const [quizScores, setQuizScores] = useLocalStorageState(storageKeys.quizScores, []);
  const [activity, setActivity] = useLocalStorageState(storageKeys.activity, []);
  const [notes, setNotes] = useLocalStorageState(storageKeys.notes, []);
  const [progress, setProgress] = useLocalStorageState(storageKeys.progress, { cardsStudied: 0, quizDone: 0, favoriteCategories: [] });
  const [recentSearches, setRecentSearches] = useLocalStorageState(storageKeys.recentSearches, []);
  const [searchResults, setSearchResults] = useLocalStorageState('sorad_global_results', []);
  const [moduleLastOpen, setModuleLastOpen] = useLocalStorageState(storageKeys.moduleLastOpen, 'Home');
  const location = useLocation();

  const onBookmark = (item) => setBookmarks((prev) => pushUnique(prev, item));
  const onSaveCalc = (item) => {
    setCalcHistory((prev) => [item, ...prev].slice(0, 20));
    setActivity((prev) => pushUnique(prev, { id: `calc-${Date.now()}`, label: `Saved ${item.type} calculation` }));
  };
  const onSaveScore = (item) => {
    setQuizScores((prev) => [item, ...prev].slice(0, 20));
    setProgress((prev) => ({ ...prev, quizDone: (prev.quizDone || 0) + 1 }));
  };
  const onActivity = (item) => setActivity((prev) => pushUnique(prev, item));

  const onRecentSearch = (q) => {
    if (!q) return;
    setRecentSearches((prev) => [q, ...prev.filter((x) => x !== q)].slice(0, 8));
  };

  const onSearch = (q, path) => {
    setModuleLastOpen(path);
    if (!q) return setSearchResults([]);
    const records = [
      ...atlasItems.map((x) => ({ module: 'Atlas', title: x.title, text: x.description })),
      ...terms.map((x) => ({ module: 'Terms', title: x.name, text: x.definition })),
      ...guideItems.map((x) => ({ module: 'Guide', title: x.site, text: x.overview })),
      ...oarItems.map((x) => ({ module: 'OAR', title: x.name, text: x.overview })),
      ...cardItems.map((x) => ({ module: 'Cards', title: x.front, text: x.back })),
    ];
    setSearchResults(records.filter((r) => `${r.title} ${r.text}`.toLowerCase().includes(q.toLowerCase())).slice(0, 8));
    onRecentSearch(q);
  };

  return (
    <Layout onSearch={onSearch}>
      {searchResults.length > 0 && <div className="search-panel">{searchResults.map((r, i) => <p key={i}><strong>{r.module}</strong> · {r.title}</p>)}</div>}
      <Routes>
        <Route path="/" element={<HomePage activity={activity} bookmarks={bookmarks} stats={{ ...progress, notesCount: notes.length }} recentModule={moduleLastOpen} />} />
        <Route path="/learn" element={<LearnPage onSaveScore={onSaveScore} favoriteCategories={progress.favoriteCategories || []} toggleFavoriteCategory={(cat) => setProgress((p) => ({ ...p, favoriteCategories: p.favoriteCategories?.includes(cat) ? p.favoriteCategories.filter((x) => x !== cat) : [...(p.favoriteCategories || []), cat] }))} onBookmark={onBookmark} onActivity={onActivity} progress={progress} setProgress={setProgress} onRecentSearch={onRecentSearch} />} />
        <Route path="/tools" element={<ToolsPage onSaveCalc={onSaveCalc} calcHistory={calcHistory} quizScores={quizScores} activity={activity} bookmarks={bookmarks} onBookmark={onBookmark} />} />
        <Route path="/notes" element={<NotesModule notes={notes} setNotes={setNotes} onBookmark={onBookmark} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {recentSearches.length > 0 && <div className="recent">Recent searches: {recentSearches.join(', ')}</div>}
      {location.pathname === '/' && <footer className="muted center">Sorad frontend-only · Offline ready with localStorage</footer>}
    </Layout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
