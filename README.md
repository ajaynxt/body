<div align="center">
  <img src="public/ajaynxt-avatar.png" width="90" height="90" alt="AJAYNXT" style="border-radius: 18px; box-shadow: 0 4px 20px rgba(0,240,255,0.4);" />
  
  # सचित्र मानव शरीर विज्ञान (3D Human Anatomy Atlas)
  
  [![Live on GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-00f0ff?style=for-the-badge&logo=github)](https://ajaynxt.github.io/body/)
  [![Custom Domain](https://img.shields.io/badge/Domain-body.ajaynxt.com-8b5cf6?style=for-the-badge)](https://body.ajaynxt.com/)
  [![Creator](https://img.shields.io/badge/Architect-AJAYNXT-f59e0b?style=for-the-badge)](https://github.com/ajaynxt)
  [![3D Meshes](https://img.shields.io/badge/3D_Meshes-2%2C234_Organs-10b981?style=for-the-badge)](#)

  <p><b>An interactive, bilingual 3D Human Anatomy Atlas, Virtual Stethoscope, Cadaver Dissection & Clinical Diagnostics Suite.</b></p>
  <p><i>Designed for MBBS, NEET-UG/PG, Nursing, and Biology students.</i></p>
</div>

---

## 🌟 Key Features

* **📖 Interactive 3D Anatomy Book (सचित्र अध्ययन पुस्तक):**
  * Side-by-side textbook layout: read about an organ on the left while the 3D model automatically focuses, isolates, and highlights that exact structure in real-time.
  * **Click-to-Learn ("jis per click karein vo 3D me open ho jaye"):** Click any organ in the 3D viewport or book chapter to immediately open its comprehensive study card.
  * Bilingual explanations: Clear, friendly **Hinglish + Hindi notes** alongside official **English and Latin anatomical nomenclature**.

* **🩺 Clinical Disease Encyclopedia (रोग कोश एवं चिकित्सा):**
  * Integrated disease database covering conditions across all 15 systems (Heart Attack, Stroke, Asthma, Pneumonia, Cirrhosis, Osteoporosis, Kidney Stones, Diabetes, and more).
  * Clinical breakdown: **Symptoms (प्रमुख लक्षण)**, **Causes & Risks (कारण व जोखिम)**, and **Prevention & Care (बचाव एवं स्वास्थ्य उपाय)**.
  * Click **"3D में देखें"** on any disease to immediately isolate and inspect the affected organs in 3D.

* **💥 Two-Phase Explosion Mathematics & 2D Knolling:**
  * **0% to 45% Explosion:** Organs expand radially along cylindrical coordinates grouped by anatomical system.
  * **45% to 100% Explosion:** Organs transition smoothly into an algorithmic **2D knolled inventory grid** flat on the $Z=0$ plane.
  * Left-click dragging automatically switches from 3D Orbit to 2D Pan when exploded above 80%.

* **⚡ GPU State-Texture Architecture:**
  * Zero per-mesh draw call bottleneck: 2,234 parts are batched into ~12–14 system meshes.
  * Vertex transformations, explosion displacements, and visibility discards are driven by a dynamic `Float32Array` `partState` `DataTexture` inside vertex shaders.
  * Instant selection glow (`vec3(0.42, 0.85, 0.78)`) via a `Uint8Array` `selectionState` `DataTexture`.

* **⚡ स्टूडेंट ज़ोन (Student Fun Zone · NEET/MBBS Special):**
  * 🩺 **3D Virtual Stethoscope & Live ECG Lead II:** Real-time Web Audio API synthesized heartbeats (S1/S2 Lub-Dub), systolic murmur (Aortic stenosis), and wheezing sounds across 5 auscultation landmarks with an interactive BPM slider (45-160 BPM).
  * 🔪 **Cadaver Dissection Lab:** Step-by-step 4-layer virtual dissection (Skin & Fascia -> Pectoral Wall -> Ribcage & VAN bundles -> Visceral Organs) with scalpel audio and Cunningham's manual dissection pearls.
  * 💡 **Topper Mnemonics Vault:** Searchable high-yield exam mnemonics (12 Cranial Nerves, 8 Carpal Bones, Femoral Triangle NAVEL, Rotator Cuff SITS, Spleen odd numbers, etc.) with 1-click 3D camera targeting.
  * 🏆 **3D Spotter Speed Exam:** 30-second rapid timer spotter test with points, streak multiplier 🔥, and medical ranks (Intern -> Senior Resident -> Chief Surgeon).

* **🫀 Clinical Photography & Diagnostics Suite (जांच व X-Ray):**
  * High-risk early cardiac detection: **CT Calcium Scoring (CAC)**, **High-Sensitivity Troponin I (hs-cTnI)**, **CT Coronary Angiography (CTCA)**, **hs-CRP**, and **12-Lead ECG**.
  * Complete radiology & imaging guide: **Chest X-Ray**, **Brain MRI**, **CT Abdomen**, and **Ultrasound (USG)** with normal vs abnormal values and preparation protocols.

* **🎯 Student & NEET Exam Focus:**
  * High-yield clinical facts, organ locations, physiological roles, and fun memory tricks.
  * Step-by-step part navigation with Next/Previous and Auto-Tour modes.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **UI Framework** | React 19 (`react`, `react-dom`) |
| **Language** | TypeScript |
| **3D Graphics** | Three.js (r152+ with ACESFilmicToneMapping & custom shader injections) |
| **Build System** | Vite + esbuild |
| **Styling** | Vanilla CSS with Glassmorphism, CSS Custom Properties & Responsive Design |
| **Icons** | Lucide React |
| **Decompression** | Native browser `DecompressionStream('gzip')` + `fflate` fallback |

---

## 🚀 Quick Start

### Prerequisites
* Node.js v18+ (tested on Node v24)
* npm v9+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/ajaynxt/body.git
cd body

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
├── public/
│   ├── ajaynxt-avatar.png        # Official AJAYNXT brand avatar
│   ├── logo.png                  # High-resolution brand logo
│   ├── CNAME                     # Custom domain (body.ajaynxt.com)
│   ├── favicon.svg               # Application vector icon
│   └── models/
│       ├── atlas.json            # Male anatomy manifest (2,234 parts, bounds)
│       ├── atlas-female.json     # HuBMAP VHF 1.5 female anatomy manifest (888 parts)
│       └── body-0.bin.gz ...     # 15 gzip-compressed binary geometry chunks (~31.4 MB total)
├── src/
│   ├── components/
│   │   ├── AboutModal.tsx        # Attribution, license, dataset citations & developer card
│   │   ├── BookReader.tsx        # Collapsible textbook reader with study & disease tabs
│   │   ├── ControlsOverlay.tsx   # Floating layer strip, camera presets, auto-rotate & explode
│   │   ├── DiseaseExplorerModal.tsx # Searchable clinical disease encyclopedia
│   │   ├── Header.tsx            # Navigation, mode toggle, AJAYNXT logo badge & modal triggers
│   │   ├── MedicalDiagnosticsModal.tsx # Cardiac prevention, X-Ray, CT, MRI & imaging guide
│   │   ├── QuickOrganFocusBar.tsx# Instant 3D click focus pill (Solo, Hide, Audio, AI Guide)
│   │   ├── StudentFunZoneModal.tsx # 3D Stethoscope, Dissection Lab, Mnemonics & Spotter Exam
│   │   ├── StudentQuizModal.tsx  # Active recall quiz modal with 1,50,000+ AI questions
│   │   ├── StudyLibrary.tsx      # Medical PDF bookshelf and study document reader
│   │   ├── StudySuiteModal.tsx   # Flashcards, layer controls, and medical glossary
│   │   └── ThreeCanvas.tsx       # Three.js canvas wrapper & WebGL viewport
│   ├── data/
│   │   ├── chapters.ts           # 12 comprehensive MBBS chapters with organ catalogs
│   │   ├── diseases.ts           # Clinical disease database with symptoms and causes
│   │   ├── studentMnemonics.ts   # NEET-PG / MBBS high-yield mnemonics with 3D jump links
│   │   └── systems.ts            # 15 anatomical systems (colors, descriptions)
│   ├── engine/
│   │   └── ThreeViewer.ts        # Three.js WebGL engine, GPU DataTextures, shaders, hide/solo
│   ├── types/
│   │   └── atlas.ts              # TypeScript interfaces & medical study data types
│   ├── utils/
│   │   ├── medicalAudio.ts       # Web Audio API synthesizer for heartbeat, scalpel & sounds
│   │   ├── anatomicalResolver.ts # 3D mesh to human organ resolver (Male & Female)
│   │   ├── decompression.ts      # Native DecompressionStream + fflate fallback
│   │   └── knolling.ts           # 2D bin-packing layout algorithm
│   ├── App.tsx                   # Main application coordinator & routing
│   ├── index.css                 # Cyber-medical glassmorphism design system & responsive UI
│   └── main.tsx                  # React DOM root entry
├── CNAME                         # Root custom domain pointer
├── ATTRIBUTION.md                # BodyParts3D & HuBMAP CC BY 4.0 attribution
├── LICENSE.txt                   # MIT License
└── package.json                  # Project manifest and scripts
```

---

## 📜 Dataset Attribution & Licensing

* **Male 3D Geometry (BodyParts3D 4.0):** © The Database Center for Life Science (DBCLS), Japan. Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
  * Citation: Mitsuhashi et al. (2009), *BodyParts3D: 3D structure database for anatomical concepts*, Nucleic Acids Res, 37: D782–D785.
* **Female 3D Geometry (HuBMAP VHF 1.5):** NIH Human BioMolecular Atlas Program & Human Reference Atlas. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
  * DOI: `10.48539/HBM352.BTSQ.586`
* **Medical Literature Citations:** Gray's Anatomy (42nd Ed), Guyton & Hall Physiology (14th Ed), Cunningham's Manual of Practical Anatomy, BD Chaurasia's Human Anatomy.
* **Application Architecture & Code:** Developed by **Ajay Saini (AJAYNXT)**, licensed under the [MIT License](LICENSE.txt).

---

*Educational disclaimer: This application is designed for educational, study, and visualization purposes only. It is not intended for clinical diagnosis or surgical planning.*
