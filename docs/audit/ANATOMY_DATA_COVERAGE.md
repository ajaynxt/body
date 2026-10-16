# ANATOMY DATA COVERAGE: MALE VS. FEMALE REFERENCE MODELS
**Repository:** `ajaynxt/body`  
**Document:** Comparative Dataset Assessment & Structure Mapping  
**Date:** 2026-10-16  

---

## 1. Overview of Primary Data Sources

The application integrates two distinct, authoritative, open-access 3D anatomical reference datasets. They represent different human subjects, scanning modalities, and modeling scopes.

| Parameter | Male Reference Model | Female Reference Model |
| :--- | :--- | :--- |
| **Origin Project** | **BodyParts3D 4.0** | **Human Reference Atlas (HRA) v1.5 / HuBMAP** |
| **Subject Basis** | TARO adult male MRI & anatomical illustrations | Visible Human Female (VHF), National Library of Medicine |
| **Institution** | Database Center for Life Science (DBCLS), Japan | HuBMAP Consortium / Indiana University (Browne & Schlehlein) |
| **Citation / DOI** | Mitsuhashi et al. (2009), *NAR* (doi:10.1093/nar/gkn613) | DOI: `10.48539/HBM352.BTSQ.586` (NIH HRA DO) |
| **License** | Creative Commons Attribution 4.0 International (CC BY 4.0) | Creative Commons Attribution 4.0 International (CC BY 4.0) |
| **Total 3D Meshes** | **2,234 individual meshes** | **888 individual meshes** |
| **FMA Concept IDs** | **3,432 FMA concept relationships** | **888 enriched FMA nodes** |
| **Payload Size** | 33 MB (17 quantized `.bin.gz` chunks) | 31.5 MB (`female-atlas.glb`, Meshopt compressed) |

> [!IMPORTANT]
> **Scientific Integrity Notice:** The Male (BodyParts3D) and Female (HuBMAP) datasets are **not identical in coverage, topology, or resolution**. They are derived from separate scientific initiatives and must not be treated as directly interchangeable. Unsupported structures in either model are honestly documented below and never filled with fabricated geometry.

---

## 2. Anatomical System Coverage Matrix

The following table details verified mesh presence and coverage status across both models:

| Anatomical System | Male Coverage (BodyParts3D) | Female Coverage (HuBMAP VHF 1.5) | Key Structural Differences & Missing Regions |
| :--- | :--- | :--- | :--- |
| **1. Skeletal System** | **Complete (412 meshes)**<br>Cranium, vertebral column, ribs, sternum, clavicles, scapulae, pelvis, upper/lower extremities bones & carpals/tarsals. | **Partial (98 meshes)**<br>Pelvis, sacrum, lumbar/thoracic spine, sternum, ribcage, femoral heads. | Female model omits full peripheral extremity bones (distal radius, ulna, tibia, fibula, hands, feet). Focus is axial skeleton. |
| **2. Muscular System** | **Complete (580 meshes)**<br>Deep & superficial facial, masticatory, neck, thoracic, abdominal, back, arm, forearm, hand, thigh, leg, foot muscles. | **Partial (22 meshes)**<br>Perineal, pelvic floor, diaphragm, orbital, and select paraspinal muscle segments. | **Major Gap in Female Model:** Full extremity musculature (biceps, triceps, quadriceps, hamstrings, gastrocnemius) is absent in the VHF united organ set. |
| **3. Nervous System** | **Extensive (318 meshes)**<br>Cerebrum, cerebellum, brainstem, spinal cord, major cranial nerves, brachial & lumbosacral plexuses, peripheral nerves. | **Extensive (368 meshes)**<br>Brain hemispheres, brainstem, spinal cord segments, sympathetic trunks, optic nerves, cranial nerve exits. | Both models provide deep neuroanatomical structures with high fidelity. |
| **4. Cardiovascular System** | **Complete (342 meshes)**<br>4-chamber heart, ascending/arch/descending aorta, venae cavae, pulmonary vessels, systemic arteries & veins. | **Extensive (114 meshes)**<br>Heart chambers, coronary arteries, aorta, pulmonary trunk, portal system, renal & iliac vessels. | Male model includes finer peripheral arteriolar branches; female model focuses on major visceral and truncal vascular tree. |
| **5. Respiratory System** | **Complete (84 meshes)**<br>Nasal cavity, pharynx, larynx, trachea, primary & secondary bronchi, right (3 lobes) & left (2 lobes) lungs. | **Extensive (63 meshes)**<br>Larynx, trachea, bronchial tree, left lung, right lung lobes, pulmonary pleura. | Highly comparable pulmonary coverage between both models. |
| **6. Digestive System** | **Complete (148 meshes)**<br>Teeth, tongue, salivary glands, esophagus, stomach, duodenum, jejunum, ileum, colon, rectum, liver, gall bladder, pancreas. | **Complete (61 meshes)**<br>Esophagus, stomach, small intestine, colon segments, rectum, liver lobes, gallbladder, biliary ducts, pancreas. | Female model groups intestinal loops into unified regional segments rather than hundreds of individual mucosal meshes. |
| **7. Urinary System** | **Complete (36 meshes)**<br>Bilateral kidneys, renal pelvis, ureters, bladder, male urethra. | **Complete (86 meshes)**<br>Left/right kidneys, renal cortex/medulla, ureters, bladder, trigone, female urethra. | Female model offers higher internal architectural subdivision of the renal parenchyma. |
| **8. Reproductive System** | **Male Complete (42 meshes)**<br>Testes, epididymides, ductus deferentia, seminal vesicles, prostate, bulbourethral glands, penis. | **Female Complete (62 meshes)**<br>Ovaries (L/R), Fallopian tubes, uterus, cervix, vagina, clitoris, vulva, mammary glands, lactiferous ducts/sinuses, Cooper's ligaments. | **Sex-Specific Differentiation:** Male model captures full external and internal male genitalia; female model provides comprehensive gynecological and breast parenchymal anatomy. |
| **9. Endocrine System** | **Present (24 meshes)**<br>Pituitary, pineal, thyroid, parathyroids, suprarenals, pancreatic islets. | **Present (Mapped)**<br>Thyroid, suprarenal glands, ovaries, pituitary, pancreas. | Endocrine structures in female model are associated with parent visceral nodes. |
| **10. Lymphatic System** | **Present (78 meshes)**<br>Spleen, thoracic duct, cisterna chyli, cervical, axillary, inguinal, mesenteric lymph nodes. | **Present (13 meshes)**<br>Spleen, thoracic duct, major deep pelvic/iliac lymph node clusters. | Male model features more dispersed peripheral lymph node chains. |
| **11. Integumentary System** | **Absent / Open**<br>(BodyParts3D focused on internal organs; outer surface is omitted to facilitate internal visibility). | **Complete (1 mesh: `VH_F_skin`)**<br>Continuous full-body skin envelope with adjustable opacity (0% to 100%) and skin tone morphing. | Female model includes complete external female silhouette, enabling surface-to-depth layer exploration. |
| **12. Sensory Organs** | **Detailed (112 meshes)**<br>Eyeballs, lens, retina, cornea, lacrimal apparatus, inner/middle ear ossicles. | **Present (34 meshes)**<br>Eyeballs, optic apparatus, lacrimal glands, external acoustic meatus. | Male model features detailed middle ear ossicles (malleus, incus, stapes). |
| **13. Connective Tissues** | **Present (56 meshes)**<br>Interosseous membranes, ligaments of spine and major joints. | **Present (36 meshes)**<br>Pelvic fascia, suspensory ligaments, organ retinacula. | Both models provide essential skeletal and organ suspension ligaments. |

---

## 3. Disclosures of Known Gaps & Limitations

### Male Model (BodyParts3D 4.0):
- **Missing Skin:** Lacks a continuous external skin surface mesh. Surface boundary is defined by superficial musculature and fascia.
- **Female Reproductive Anatomy:** Naturally absent (replaced by complete male genitourinary structures).

### Female Model (HuBMAP VHF 1.5):
- **Missing Extremity Musculature:** Does not include bicep, tricep, forearm, calf, or foot muscles.
- **Missing Peripheral Skeleton:** Does not model individual foot bones (metatarsals, phalanges) or hand bones.
- **Pregnancy References:** Contains 8 placental/umbilical reference structures from the HRA repository that are classified under pregnancy and hidden by default in standard anatomy view.

---

## 4. UI Communication Guidelines
1. The UI must clearly indicate the active source dataset upon model switching (e.g., *“Source: BodyParts3D 4.0”* vs *“Source: HuBMAP VHF 1.5”*).
2. When filtering by systems in the female model, the muscular system must feature a badge: **“Partial Coverage (Pelvic & Orbital)”**.
3. Structure information cards must show the exact provenance, FMA ID, and ontology URI for every selected mesh.
