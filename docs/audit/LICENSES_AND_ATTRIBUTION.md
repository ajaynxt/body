# LICENSES AND ATTRIBUTION REGISTER
**Repository:** `ajaynxt/body`  
**Compliance Standard:** Open-Source Software, Open-Data Attribution & Academic Fair Use  
**Last Verified:** 2026-10-16  

---

## 1. Application Software License

The custom application source code, UI components, state management, and Three.js WebGL integration in this repository are licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 AJAY NXT / Ashe Magalhaes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 2. Anatomical 3D Datasets Attribution

### A. Male Reference Anatomy — BodyParts3D 4.0
- **Copyright:** © Database Center for Life Science (DBCLS), Japan.
- **License:** **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
- **Official Database URL:** https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
- **License Terms:** https://creativecommons.org/licenses/by/4.0/
- **Source Geometry:** `isa_BP3D_4.0_obj_99.zip`, BodyParts3D 4.0.
- **Scientific Publication:** Mitsuhashi et al. (2009), *BodyParts3D: 3D structure database for anatomical concepts*, Nucleic Acids Research, 37(Database issue): D782–D785. DOI: `10.1093/nar/gkn613`.
- **Adaptations:** Coordinate transformation from millimeters/Z-up to meters/Y-up; translated to rest on the virtual floor; geometry simplified with meshoptimizer (0.2% relative error bound); normals quantized to signed 16-bit; packed into 17 binary chunks. 2,234 meshes preserved.

### B. Female Reference Anatomy — HuBMAP / HRA 3D Reference Organ Set v1.5
- **Creators:** Kristen Browne and Heidi Schlehlein.
- **Institution:** Human Reference Atlas (HRA) / HuBMAP Consortium.
- **Subject Data Basis:** Visible Human Female (VHF), National Library of Medicine (NLM).
- **DOI:** `10.48539/HBM352.BTSQ.586`
- **Official Dataset URL:** https://lod.humanatlas.io/ref-organ/united-female/v1.5
- **License:** **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
- **Source Asset:** `3d-vh-f-united.glb` via HRA CDN (https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb).
- **Adaptations:** Coincident vertices welded and normals averaged; geometry simplified using gltf-transform and meshopt (0.15 ratio, 0.001 error); coordinates centered and aligned to stage origin; mapped to 888 anatomical structures with FMA identifiers.

---

## 3. Educational Curriculum & Medical Citations

The educational descriptions, clinical notes, and exam pearls in this project are formulated for non-diagnostic medical education and cite the following core standard textbooks:

1. **Gray's Anatomy:** *The Anatomical Basis of Clinical Practice*, 42nd Edition, Susan Standring et al., Elsevier.
2. **Guyton and Hall Textbook of Medical Physiology:** 14th Edition, John E. Hall & Michael E. Hall, Elsevier.
3. **BD Chaurasia's Human Anatomy:** *Regional and Applied Dissection and Clinical*, 8th Edition, CBS Publishers.
4. **Wheater's Functional Histology:** *A Text and Colour Atlas*, 6th Edition, Barbara Young et al., Churchill Livingstone.
5. **Harper's Illustrated Biochemistry:** 31st Edition, Victor W. Rodwell et al., McGraw-Hill.
6. **Robbins & Cotran Pathologic Basis of Disease:** 10th Edition, Vinay Kumar et al., Elsevier.

---

## 4. Third-Party Software Libraries

| Library | Version | License | Source / Purpose |
| :--- | :--- | :--- | :--- |
| **Three.js** | `^0.186.1` | MIT | WebGL 3D rendering pipeline |
| **React & React-DOM** | `^19.2.8` | MIT | Reactive UI component framework |
| **Lucide React** | `^1.58.0` | ISC | Medical and UI iconography |
| **PDF.js (`pdfjs-dist`)** | `^6.4.299` | Apache 2.0 | Client-side PDF page rendering |
| **fflate** | `^0.8.3` | MIT | High-speed gzip decompression in browser |
| **Vite** | `^8.3.4` | MIT | Frontend development server & bundler |
| **TypeScript** | `~6.0.2` | Apache 2.0 | Static type checking and compiler |
| **oxlint** | `^1.81.0` | MIT | Rust-based high-speed linter |

---

## 5. Non-Medical Disclaimer

> [!CAUTION]
> **DISCLAIMER:** This application is created strictly for academic learning, visual education, and reference study. It is **NOT** a clinical diagnostic tool, surgical planning software, or medical advice device. Always consult certified healthcare professionals for personal health or clinical diagnosis.
