import { useState } from 'react';
import { Card } from '../../components/Card';

const calcBED = (totalDose, dosePerFraction, alphaBeta) => totalDose * (1 + dosePerFraction / alphaBeta);
const calcEQD2 = (bed, alphaBeta) => bed / (1 + 2 / alphaBeta);

export const CalcModule = ({ onSaveHistory, onBookmark }) => {
  const [form, setForm] = useState({ totalDose: 60, dosePerFraction: 2, alphaBeta: 10 });
  const bed = calcBED(Number(form.totalDose), Number(form.dosePerFraction), Number(form.alphaBeta));
  const eqd2 = calcEQD2(bed, Number(form.alphaBeta));

  const onInput = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="stack">
      <Card title="BED Calculator" subtitle="Linear-Quadratic educational helper">
        <div className="grid-2">
          <label>Total Dose<input type="number" value={form.totalDose} onChange={(e) => onInput('totalDose', e.target.value)} /></label>
          <label>Dose/Fraction<input type="number" value={form.dosePerFraction} onChange={(e) => onInput('dosePerFraction', e.target.value)} /></label>
          <label>Alpha/Beta<input type="number" value={form.alphaBeta} onChange={(e) => onInput('alphaBeta', e.target.value)} /></label>
        </div>
        <p className="result">BED: <strong>{bed.toFixed(2)} Gy</strong></p>
        <p className="muted">Interpretasi edukatif: nilai BED membantu membandingkan dampak biologis regimen.</p>
        <div className="row">
          <button onClick={() => onSaveHistory({ type: 'BED', value: bed.toFixed(2), form })}>Simpan History</button>
          <button className="ghost" onClick={() => onBookmark({ id: `calc-bed-${Date.now()}`, module: 'calculator', title: `BED ${bed.toFixed(2)} Gy` })}>Bookmark</button>
        </div>
      </Card>
      <Card title="EQD2 Calculator" subtitle="Equivalent dose in 2 Gy fraction">
        <p className="result">EQD2: <strong>{eqd2.toFixed(2)} Gy</strong></p>
        <p className="muted">Interpretasi edukatif: EQD2 memudahkan komparasi antar skema fraksinasi.</p>
      </Card>
      <Card title="Dose & Fraction Helper" subtitle="Converter sederhana">
        <p>Total fractions: {(Number(form.totalDose) / Number(form.dosePerFraction)).toFixed(1)}</p>
        <p>Dose converter: {form.totalDose} Gy = {(Number(form.totalDose) * 100).toFixed(0)} cGy</p>
      </Card>
    </div>
  );
};
