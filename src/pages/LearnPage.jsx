import { useState } from 'react';
import { CardsModule } from '../features/cards/CardsModule';
import { QuizModule } from '../features/quiz/QuizModule';
import { AtlasModule } from '../features/atlas/AtlasModule';
import { TermsModule } from '../features/terms/TermsModule';
import { GuideModule } from '../features/guide/GuideModule';
import { OarModule } from '../features/oar/OarModule';

const tabs = ['Quiz', 'Cards', 'Atlas', 'Terms', 'Guide', 'OAR'];

export const LearnPage = (props) => {
  const [tab, setTab] = useState('Quiz');
  return (
    <div className="stack">
      <div className="chips">{tabs.map((t) => <button key={t} className={`chip-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Quiz' && <QuizModule onSaveScore={props.onSaveScore} favorites={props.favoriteCategories} toggleFavoriteCategory={props.toggleFavoriteCategory} />}
      {tab === 'Cards' && <CardsModule progress={props.progress} setProgress={props.setProgress} onBookmark={props.onBookmark} />}
      {tab === 'Atlas' && <AtlasModule onBookmark={props.onBookmark} onActivity={props.onActivity} />}
      {tab === 'Terms' && <TermsModule onBookmark={props.onBookmark} onRecentSearch={props.onRecentSearch} />}
      {tab === 'Guide' && <GuideModule onBookmark={props.onBookmark} onActivity={props.onActivity} />}
      {tab === 'OAR' && <OarModule onBookmark={props.onBookmark} />}
    </div>
  );
};
