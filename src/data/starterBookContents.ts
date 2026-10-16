export interface StarterPage {
  pageNumber: number;
  chapterTitle: string;
  topicTitle: string;
  hindiTitle: string;
  summary: string;
  keyPoints: string[];
  clinicalCorrelations: string[];
  examPearls: string[];
  diagramDescription?: string;
  mnemonic?: string;
}

export const STARTER_BOOK_CONTENTS: Record<string, StarterPage[]> = {
  starter_grays_clinical_anatomy: [
    {
      pageNumber: 1,
      chapterTitle: 'Section 1: General Anatomy & Anatomical Position',
      topicTitle: 'Standard Anatomical Planes, Positions & Axes',
      hindiTitle: 'मानक शारीरिक स्थिति और तल (Planes & Axes)',
      summary:
        'All anatomical descriptions are expressed in relation to the standard anatomical position: standing erect, face looking forward, arms by side, palms forward, feet together.',
      keyPoints: [
        'Median / Sagittal Plane: Divides body into right and left halves.',
        'Coronal / Frontal Plane: Divides body into anterior and posterior parts.',
        'Transverse / Axial Plane: Divides body into superior and inferior segments.',
        'Superficial vs Deep: Relative distance from the external skin surface.',
      ],
      clinicalCorrelations: [
        'Surgical Incisions: Langer lines of skin tension determine optimal healing and minimal scar formation.',
        'CT & MRI scans are primarily viewed in the axial (transverse) perspective from the feet upwards.',
      ],
      examPearls: [
        'Anatomical snuffbox boundaries: Abductor pollicis longus, Extensor pollicis brevis laterally; Extensor pollicis longus medially. Floor: Scaphoid and Trapezium bones.',
      ],
      diagramDescription: 'Anatomical Planes Diagram: Sagittal (cyan), Coronal (rose), Transverse (amber).',
      mnemonic: 'Snuffbox tendons: Brevis sandwich (EPL medially, EPB + APL laterally).',
    },
    {
      pageNumber: 2,
      chapterTitle: 'Section 2: Upper Limb & Nervous Plexus',
      topicTitle: 'Brachial Plexus Architecture (Roots to Terminal Branches)',
      hindiTitle: 'ब्रेकियल प्लेक्सस और ऊपरी अंग की तंत्रिकाएं',
      summary:
        'The brachial plexus is formed by the anterior rami of spinal nerves C5 to T1, supplying motor and sensory innervation to the pectoral girdle and upper extremity.',
      keyPoints: [
        'Roots: C5, C6, C7, C8, T1 anterior rami.',
        'Trunks: Superior (C5-C6), Middle (C7), Inferior (C8-T1).',
        'Divisions: 3 Anterior and 3 Posterior divisions passing beneath the clavicle.',
        'Cords: Lateral, Posterior, and Medial cords named according to axillary artery relationship.',
      ],
      clinicalCorrelations: [
        "Erb-Duchenne Palsy (Upper Trunk C5-C6 injury): 'Waiter tip' deformity due to arm adducted, medially rotated, forearm extended and pronated.",
        "Klumpke Palsy (Lower Trunk C8-T1 injury): 'Claw hand' deformity from loss of intrinsic hand muscles; often associated with Horner syndrome.",
      ],
      examPearls: [
        'Long thoracic nerve (Roots C5, C6, C7) innervates Serratus Anterior; damage causes winged scapula.',
      ],
      diagramDescription: 'Brachial Plexus schematic: Roots (5) -> Trunks (3) -> Divisions (6) -> Cords (3) -> Branches (5).',
      mnemonic: 'Remember To Drink Cold Beer (Roots, Trunks, Divisions, Cords, Branches).',
    },
    {
      pageNumber: 3,
      chapterTitle: 'Section 3: Thorax & Cardiovascular Anatomy',
      topicTitle: 'Coronary Arterial Circulation & Dominance',
      hindiTitle: 'हृदय की कोरोनरी धमनी प्रणाली और प्रभुत्व',
      summary:
        'The heart is supplied by the Right Coronary Artery (RCA) and Left Coronary Artery (LCA), originating from the aortic sinuses of the ascending aorta just above the aortic valve.',
      keyPoints: [
        'LCA branches into Left Anterior Descending (LAD) and Circumflex artery.',
        'LAD supplies anterior 2/3 of interventricular septum, anterior LV wall, and cardiac apex.',
        'RCA supplies right atrium, right ventricle, posterior 1/3 of septum, and SA/AV nodes.',
        'Coronary Dominance is defined by which artery gives off the Posterior Descending Artery (PDA): RCA (85% - Right dominant), LCx (10% - Left dominant), Both (5% - Codominant).',
      ],
      clinicalCorrelations: [
        'LAD is the most commonly occluded artery in myocardial infarction, termed the "Widow Maker".',
        'AV nodal block often complicates inferior wall STEMI due to RCA occlusion in right-dominant hearts.',
      ],
      examPearls: [
        'SA node blood supply: RCA in 60% of people, LCA (circumflex) in 40%. AV node: RCA in 90%.',
      ],
      diagramDescription: 'Coronary anatomy: Ascending aorta showing LAD (widow maker) and RCA course down the AV groove.',
    },
    {
      pageNumber: 4,
      chapterTitle: 'Section 4: Head & Neck Neuroanatomy',
      topicTitle: 'Circle of Willis & Cranial Foramina',
      hindiTitle: 'सर्किल ऑफ विलिस (मस्तिष्क की रक्त आपूर्ति)',
      summary:
        'The cerebral arterial circle of Willis provides essential collateral blood flow to the brain at the base of the skull, connecting the internal carotid and vertebrobasilar systems.',
      keyPoints: [
        'Anterior cerebral arteries (ACA) joined by Anterior Communicating Artery.',
        'Internal carotid arteries communicate with Posterior Cerebral Arteries (PCA) via Posterior Communicating Arteries.',
        'Basilar artery bifurcates at the midbrain into bilateral Posterior Cerebral Arteries.',
      ],
      clinicalCorrelations: [
        'Berry aneurysms most commonly occur at the junction of ACA and Anterior Communicating Artery (ACom). Rupture causes subarachnoid hemorrhage ("worst headache of life").',
        'Middle cerebral artery (MCA) stroke typically manifests as contralateral hemiparesis and aphasia.',
      ],
      examPearls: [
        'Foramen ovale transmits MALE: Mandibular nerve (V3), Accessory meningeal artery, Lesser petrosal nerve, Emissary vein.',
      ],
      diagramDescription: 'Hexagonal Circle of Willis network connecting ICA and Basilar systems.',
      mnemonic: 'Foramen ovale contents: MALE.',
    },
  ],

  starter_guyton_hall_physiology: [
    {
      pageNumber: 1,
      chapterTitle: 'Unit 1: Membrane Potential & Nerve Physiology',
      topicTitle: 'Resting Membrane Potential & Action Potential Genesis',
      hindiTitle: 'विश्राम झिल्ली विभव एवं क्रिया विभव की क्रियाविधि',
      summary:
        'Resting membrane potential (-70 to -90 mV) is maintained by selective K+ permeability and the electrogenic Na+/K+ ATPase pump (3 Na+ pumped out, 2 K+ pumped in per ATP).',
      keyPoints: [
        'Depolarization: Voltage-gated Na+ channels rapidly open upon reaching threshold (-55 mV).',
        'Repolarization: Inactivation of Na+ gates and slow opening of voltage-gated K+ channels.',
        'Hyperpolarization: Prolonged K+ conductance before return to resting baseline.',
        'Refractory periods: Absolute (Na+ gates inactivated) and Relative (elevated threshold).',
      ],
      clinicalCorrelations: [
        'Local anesthetics (Lidocaine, Bupivacaine) reversibly block voltage-gated Na+ channels, arresting action potential propagation.',
        'Hyperkalemia depolarizes the resting membrane potential, leading to fatal cardiac arrhythmias.',
      ],
      examPearls: [
        'Nernst equation calculates equilibrium potential for individual ions: E_ion = (61.5/z) * log([ion]_out / [ion]_in).',
      ],
      diagramDescription: 'Action potential curve: baseline (-70mV) -> threshold (-55mV) -> spike (+30mV) -> undershoot (-80mV).',
    },
    {
      pageNumber: 2,
      chapterTitle: 'Unit 2: Cardiovascular Dynamics',
      topicTitle: 'Cardiac Cycle & The Wiggers Diagram Explained',
      hindiTitle: 'कार्डियक चक्र और विगर्स आरेख (Wiggers Diagram)',
      summary:
        'The cardiac cycle integrates left ventricular pressure, aortic pressure, left atrial pressure, ventricular volume, phonocardiogram (heart sounds), and ECG over a 0.8s cardiac cycle.',
      keyPoints: [
        'Ventricular Systole: Isovolumetric contraction (all valves closed) followed by rapid ejection.',
        'Ventricular Diastole: Isovolumetric relaxation, rapid filling, reduced filling, and atrial systole.',
        'S1 Heart Sound ("Lub"): Closure of Mitral and Tricuspid valves at the onset of systole.',
        'S2 Heart Sound ("Dub"): Closure of Aortic and Pulmonic semilunar valves at end of systole.',
      ],
      clinicalCorrelations: [
        'S3 gallop: Seen in volume overload states (congestive heart failure, mitral regurgitation) during early rapid filling.',
        'S4 gallop: Signifies non-compliant, stiff ventricular wall (hypertension, aortic stenosis) during atrial kick.',
      ],
      examPearls: [
        'Stroke Volume = End-Diastolic Volume (EDV) - End-Systolic Volume (ESV). Ejection Fraction = SV / EDV (normal 55-70%).',
      ],
      diagramDescription: 'Wiggers diagram displaying simultaneous LV pressure, aortic pressure, and ECG traces.',
    },
    {
      pageNumber: 3,
      chapterTitle: 'Unit 3: Renal Physiology & Water Balance',
      topicTitle: 'Glomerular Filtration & Countercurrent Multiplier',
      hindiTitle: 'वृक्क निस्यंदन और काउंटरकरंट मल्टीप्लायर',
      summary:
        'The loop of Henle acts as a countercurrent multiplier to establish a high hyperosmolar medullary gradient (300 to 1200 mOsm/L), essential for water reabsorption under ADH regulation.',
      keyPoints: [
        'Descending limb: Permeable to water via AQP1, impermeable to solutes (tubular fluid concentrates).',
        'Thick ascending limb: Active Na+/K+/2Cl- symport (NKCC2), impermeable to water (diluting segment).',
        'Vasa recta: Countercurrent exchanger maintaining medullary hyperosmolality without washing it out.',
        'ADH (Vasopressin): Inserts Aquaporin-2 (AQP2) channels into collecting duct principal cells.',
      ],
      clinicalCorrelations: [
        'Loop diuretics (Furosemide) inhibit the NKCC2 co-transporter in thick ascending limb, abolishing the medullary gradient.',
        'Diabetes Insipidus: Lack of ADH secretion (central) or renal resistance (nephrogenic) causing dilute polyuria (>3 L/day).',
      ],
      examPearls: [
        'Glomerular Filtration Rate (GFR) is clinically measured using inulin clearance or estimated using serum creatinine equations.',
      ],
      diagramDescription: 'Nephron loop of Henle osmolarity gradient: 300 cortex -> 1200 inner medulla.',
    },
  ],

  starter_wheaters_histology: [
    {
      pageNumber: 1,
      chapterTitle: 'Chapter 1: Epithelial Tissues',
      topicTitle: 'Epithelial Classification, Junctions & Basal Lamina',
      hindiTitle: 'उपकला ऊतक (Epithelial Tissues) और वर्गीकरण',
      summary:
        'Epithelia are avascular cellular sheets that line body surfaces and cavities. They are classified by cell shape (squamous, cuboidal, columnar) and number of layers (simple vs stratified).',
      keyPoints: [
        'Simple Squamous: Endothelium (blood vessels), mesothelium (peritoneum, pleura), alveolar air sacs.',
        'Simple Columnar with Microvilli: Gastrointestinal tract from stomach to rectum for absorption.',
        'Pseudostratified Ciliated Columnar: Respiratory tract (trachea, bronchi) with mucus-secreting goblet cells.',
        'Stratified Squamous Keratinized: Epidermis of skin for physical and dehydration barrier.',
      ],
      clinicalCorrelations: [
        'Metaplasia: Chronic acid reflux converts stratified squamous esophageal mucosa to columnar (Barrett esophagus).',
        'Pemphigus vulgaris: Autoantibodies against Desmoglein-3 break down desmosomes, causing painful flaccid bullae.',
      ],
      examPearls: [
        'Zonula occludens (tight junctions) seal paracellular paths; Claudins and Occludins are key structural proteins.',
      ],
      diagramDescription: 'Histology cross-sections showing simple vs stratified cell shapes and apical microvilli.',
    },
    {
      pageNumber: 2,
      chapterTitle: 'Chapter 2: Connective & Muscular Tissues',
      topicTitle: 'Cardiac Muscle vs Skeletal & Smooth Muscle',
      hindiTitle: 'हृदय पेशी बनाम कंकाल पेशी की सूक्ष्म संरचना',
      summary:
        'Cardiac myocytes are branched, striated cells with a single central nucleus, connected end-to-end by specialized intercalated discs.',
      keyPoints: [
        'Intercalated Discs contain 3 junctions: Fascia adherens, Macula adherens (desmosomes), and Gap junctions.',
        'Gap junctions (Connexins) allow low-resistance electrical coupling, enabling the myocardium to act as a functional syncytium.',
        'T-tubules are located at the Z-discs (diad structure with terminal cisterna), unlike the triad at A-I junctions in skeletal muscle.',
      ],
      clinicalCorrelations: [
        'Myocardial Infarction: Coagulative necrosis is histologically visible after 4-12 hours with loss of nuclei and wavy fibers.',
        'Hypertrophic cardiomyopathy displays marked myocyte disarray with interstitial fibrosis.',
      ],
      examPearls: [
        'Lipofuscin ("wear-and-tear pigment") accumulates in perinuclear cytoplasm of aging cardiac myocytes.',
      ],
      diagramDescription: 'Intercalated disc junction complex: desmosome, fascia adherens, and gap junction.',
    },
  ],

  starter_harpers_biochemistry: [
    {
      pageNumber: 1,
      chapterTitle: 'Chapter 1: Carbohydrate Metabolism',
      topicTitle: 'Glycolysis, Citric Acid Cycle & Net ATP Yield',
      hindiTitle: 'ग्लाइकोलाइसिस और क्रेब्स चक्र की जैव रसायन',
      summary:
        'Glycolysis converts one molecule of glucose into two molecules of pyruvate, generating a net of 2 ATP and 2 NADH in the cytoplasm.',
      keyPoints: [
        'Key regulatory committed step: Phosphofructokinase-1 (PFK-1), allosterically activated by Fructose-2,6-bisphosphate and AMP.',
        'Pyruvate Dehydrogenase Complex (PDC) bridges glycolysis to TCA cycle: Requires 5 cofactors (TLCFN: TPP, Lipoate, CoA, FAD, NAD).',
        'TCA Cycle rate-limiting step: Isocitrate Dehydrogenase, inhibited by ATP and NADH.',
        'Complete aerobic oxidation of 1 glucose yields 30-32 ATP via oxidative phosphorylation.',
      ],
      clinicalCorrelations: [
        'Wernicke-Korsakoff syndrome: Thiamine (B1) deficiency impairs PDC and alpha-ketoglutarate dehydrogenase.',
        'Warburg effect: Cancer cells exhibit elevated aerobic glycolysis even in the presence of oxygen, exploited in FDG-PET scans.',
      ],
      examPearls: [
        'Fluoride in blood collection tubes inhibits enolase, preventing in vitro glucose breakdown before lab analysis.',
      ],
      diagramDescription: 'Metabolic pathway: Glucose -> G6P -> F1,6BP -> Pyruvate -> Acetyl-CoA -> Citrate.',
      mnemonic: 'Pyruvate Dehydrogenase 5 coenzymes: Tender Loving Care For Nancy (Thiamine, Lipoate, CoA, FAD, NAD).',
    },
    {
      pageNumber: 2,
      chapterTitle: 'Chapter 2: Nitrogen Metabolism & Urea Cycle',
      topicTitle: 'Urea Cycle Enzymatic Steps & Hyperammonemia',
      hindiTitle: 'यूरिया चक्र और अमोनिया विषाक्तता',
      summary:
        'The urea cycle takes place partly in the mitochondria and partly in the cytosol of hepatocytes to dispose of toxic ammonia generated from amino acid deamination.',
      keyPoints: [
        'Rate-limiting step: Carbamoyl phosphate synthetase I (CPS1), requiring N-acetylglutamate (NAG) as obligate allosteric activator.',
        'Ornithine transcarbamylase (OTC) combines ornithine and carbamoyl phosphate to produce citrulline.',
        'Citrulline exits mitochondria to cytosol to react with Aspartate via argininosuccinate synthetase.',
        'Arginase cleaves arginine into Urea (excreted in urine) and regenerates Ornithine.',
      ],
      clinicalCorrelations: [
        'OTC deficiency (X-linked recessive): Most common urea cycle disorder; causes hyperammonemia and high orotic acid in urine.',
        'Hepatic encephalopathy: Liver failure leads to ammonia accumulation, crossing blood-brain barrier and causing asterixis ("flapping tremor").',
      ],
      examPearls: [
        'Urea nitrogen atoms come from two distinct sources: one from free NH4+ (via CPS1) and one from Aspartate.',
      ],
      diagramDescription: 'Urea Cycle compartments: Mitochondria (CPS1, OTC) -> Cytosol (ASS, ASL, Arginase).',
      mnemonic: 'Ordinarily, Careless Careless Crappy Old Cars Are Ruined (Ornithine, Carbamoyl, Citrulline, Aspartate, Argininosuccinate, Arginine, Urea).',
    },
  ],

  starter_campbell_human_biology: [
    {
      pageNumber: 1,
      chapterTitle: 'Chapter 1: Human Organ Systems Overview',
      topicTitle: 'Homeostatic Feedback Loops & Temperature Regulation',
      hindiTitle: 'मानव शरीर में होमियोस्टैसिस (Homeostasis) और तापमान नियंत्रण',
      summary:
        'Homeostasis is the dynamic maintenance of a stable internal environment despite external fluctuations, mediated primarily through negative feedback loops.',
      keyPoints: [
        'Negative Feedback: Output reduces the original stimulus (e.g. insulin secretion lowering blood glucose).',
        'Positive Feedback: Output amplifies the stimulus towards a terminal event (e.g. Oxytocin during labor, LH surge).',
        'Hypothalamic Thermostat: Preoptic anterior hypothalamus responds to heat; posterior hypothalamus responds to cold.',
      ],
      clinicalCorrelations: [
        'Fever vs Hyperthermia: In fever, pyrogens (IL-1, PGE2) elevate the hypothalamic set-point; in heat stroke, heat production overwhelms dissipation without a set-point change.',
      ],
      examPearls: [
        'Endocrine vs Nervous signaling: Nervous system provides rapid, millisecond, targeted responses; Endocrine provides slower, systemic, sustained regulation.',
      ],
      diagramDescription: 'Feedback loop cycle: Stimulus -> Receptor -> Control Center (Hypothalamus) -> Effector -> Response.',
    },
    {
      pageNumber: 2,
      chapterTitle: 'Chapter 2: Integrated Immune Defenses',
      topicTitle: 'Innate vs Adaptive Immunity & Memory Cell Formation',
      hindiTitle: 'प्रतिरक्षा प्रणाली: जन्मजात और अनुकूली रक्षा प्रणाली',
      summary:
        'The human immune system combines non-specific innate barriers (skin, neutrophils, complement) with antigen-specific adaptive immunity (B and T lymphocytes).',
      keyPoints: [
        'Innate Immunity: Rapid (hours), no immunological memory, pattern recognition receptors (TLRs).',
        'Adaptive Immunity: Slower initial onset (days), highly antigen-specific, produces lifelong memory cells.',
        'Humoral Immunity: Plasma cells producing antibodies (IgM, IgG, IgA, IgE, IgD).',
        'Cell-Mediated Immunity: CD4+ T-helper cells and CD8+ Cytotoxic T-lymphocytes.',
      ],
      clinicalCorrelations: [
        'Type I Hypersensitivity: IgE cross-linking on mast cells triggering immediate histamine release (anaphylaxis).',
        'Vaccine adjuvant action stimulates innate TLRs to enhance adaptive memory antibody titers.',
      ],
      examPearls: [
        'IgG is the only immunoglobulin class that crosses the human placenta to confer passive immunity to the fetus.',
      ],
      diagramDescription: 'Immune response timeline: Primary vs secondary booster antibody curve.',
      mnemonic: 'Antibody abundance in serum: GAMED (IgG > IgA > IgM > IgE > IgD).',
    },
  ],
};
