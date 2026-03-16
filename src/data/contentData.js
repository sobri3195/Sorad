export const atlasItems = [
  { id: 'gtv', title: 'GTV', category: 'Volume Concepts', description: 'Gross Tumor Volume adalah volume tumor yang terlihat klinis/radiologis.', related: ['CTV', 'PTV'] },
  { id: 'ctv', title: 'CTV', category: 'Volume Concepts', description: 'Clinical Target Volume mencakup GTV dan area mikroskopik berisiko.', related: ['GTV', 'ITV', 'PTV'] },
  { id: 'oar', title: 'OAR', category: 'Safety', description: 'Organ at Risk adalah organ normal yang perlu dilindungi dari dosis berlebih.', related: ['Dose Constraints', 'Toxicity'] },
  { id: 'sim', title: 'Simulation', category: 'Workflow', description: 'Simulasi adalah tahap akuisisi imaging untuk setup perencanaan terapi.', related: ['Immobilization', 'Setup Margin'] },
];

export const terms = [
  { id: 'alpha-beta', name: 'Alpha/Beta Ratio', category: 'Radiobiology', definition: 'Parameter sensitivitas fraksinasi jaringan pada model LQ.', related: ['BED', 'EQD2'] },
  { id: 'imrt', name: 'IMRT', category: 'Treatment Planning', definition: 'Teknik modulasi intensitas untuk optimasi distribusi dosis.', related: ['VMAT', 'PTV'] },
  { id: 'igrt', name: 'IGRT', category: 'Imaging and Simulation', definition: 'Pencitraan harian/periodik untuk verifikasi posisi target.', related: ['Setup Error', 'CBCT'] },
  { id: 'rbe', name: 'RBE', category: 'Radiation Physics', definition: 'Relative Biological Effectiveness membandingkan efektivitas biologis radiasi.', related: ['LET'] },
];

export const guideItems = [
  { id: 'breast', site: 'Breast', overview: 'Radioterapi adjuvan untuk kontrol lokal pasca operasi.', role: 'Meningkatkan kontrol lokal dan menurunkan kekambuhan regional.', fractionation: 'Skema hipofraksinasi moderat sering dibahas secara edukatif.', oar: ['Heart', 'Ipsilateral Lung'], toxicity: ['Dermatitis', 'Fatigue'] },
  { id: 'hn', site: 'Head and Neck', overview: 'Kasus kompleks dengan target multipel dan OAR kritikal.', role: 'Definitif, adjuvan, atau paliatif sesuai konteks klinis.', fractionation: 'Fraksinasi konvensional sering jadi dasar pembelajaran.', oar: ['Spinal Cord', 'Parotid'], toxicity: ['Mucositis', 'Xerostomia'] },
  { id: 'cervix', site: 'Cervix', overview: 'Kombinasi EBRT ± brachytherapy pada banyak skenario.', role: 'Kontrol penyakit lokal-regional pada stadium terpilih.', fractionation: 'Pembahasan umum fraksinasi pelvis dan boost.', oar: ['Bladder', 'Rectum', 'Bowel'], toxicity: ['Cystitis', 'Proctitis'] },
  { id: 'lung', site: 'Lung', overview: 'Pendekatan tergantung stadium dan kondisi pasien.', role: 'Definitif, adjuvan, atau paliatif sesuai site dan stadium.', fractionation: 'Bisa konvensional atau regimen terpilih secara edukatif.', oar: ['Lung', 'Heart', 'Esophagus'], toxicity: ['Esophagitis', 'Pneumonitis'] },
];

export const oarItems = [
  { id: 'spinal-cord', name: 'Spinal Cord', site: 'Head and Neck', overview: 'Struktur neural kritikal dengan toleransi dosis terbatas.', concern: 'Paparan berlebih dapat meningkatkan risiko myelopathy.', related: ['Brainstem', 'Vertebral Bodies'] },
  { id: 'parotid', name: 'Parotid Gland', site: 'Head and Neck', overview: 'Kelenjar saliva mayor penting untuk kualitas hidup.', concern: 'Dosis tinggi terkait xerostomia.', related: ['Submandibular Gland', 'Oral Cavity'] },
  { id: 'heart', name: 'Heart', site: 'Breast', overview: 'OAR utama pada iradiasi thoraks sisi kiri.', concern: 'Minimisasi dosis jantung penting untuk risiko jangka panjang.', related: ['LAD', 'Pericardium'] },
  { id: 'rectum', name: 'Rectum', site: 'Prostate', overview: 'Organ posterior prostate yang sering terkena dosis.', concern: 'Perlu perhatian terhadap toksisitas GI.', related: ['Bladder', 'Anal Canal'] },
];

export const cardItems = [
  { id: 'c1', category: 'Radiobiology', front: 'Apa itu 4R radiobiology?', back: 'Repair, Reassortment, Repopulation, Reoxygenation.' },
  { id: 'c2', category: 'Radiation Physics', front: 'Tujuan PTV?', back: 'Mengakomodasi ketidakpastian setup dan pergerakan target.' },
  { id: 'c3', category: 'Organ at Risk', front: 'Contoh OAR pada breast kiri?', back: 'Heart dan ipsilateral lung.' },
  { id: 'c4', category: 'Treatment Planning Terminology', front: 'Definisi CTV?', back: 'Volume klinis target mencakup penyakit mikroskopik potensial.' },
];

export const quizCategories = [
  'Radiobiology',
  'Radiation Physics',
  'Treatment Planning Basics',
  'Fractionation',
  'Radiation Safety',
  'Head and Neck',
  'Breast',
  'Gynecologic',
  'Palliative Radiotherapy',
];

export const quizQuestions = [
  { id: 1, category: 'Radiobiology', question: 'Model yang umum dipakai untuk BED adalah?', options: ['Linear', 'Linear-Quadratic', 'Exponential', 'Poisson'], answer: 1, explanation: 'BED secara edukatif paling sering dijelaskan dengan model Linear-Quadratic.' },
  { id: 2, category: 'Radiation Physics', question: 'IGRT terutama digunakan untuk?', options: ['Sedasi', 'Verifikasi posisi', 'Kemoterapi', 'Analgesia'], answer: 1, explanation: 'IGRT berfokus pada verifikasi dan akurasi setup.' },
  { id: 3, category: 'Fractionation', question: 'EQD2 digunakan untuk?', options: ['Bandingkan regimen', 'Hitung volume', 'Setup immobilisasi', 'Cek CBC'], answer: 0, explanation: 'EQD2 memudahkan perbandingan biologis ke ekuivalen 2 Gy/fx.' },
];

export const noteTemplates = [
  { id: 'nt1', title: 'Case Reflection', body: 'Site:\nLearning points:\nOAR concern:\nFollow-up topic:' },
  { id: 'nt2', title: 'Journal Summary', body: 'Citation:\nKey findings:\nClinical relevance:\nQuestions:' },
];
