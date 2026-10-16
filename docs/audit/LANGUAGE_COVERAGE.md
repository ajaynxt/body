# INTERNATIONALIZATION & MULTILINGUAL LANGUAGE COVERAGE
**Repository:** `ajaynxt/body`  
**System Architecture:** Modular Locale Resource Architecture (`src/i18n/`)  
**Standard:** BCP 47 Language Tags & Unicode CLDR  
**Date:** 2026-10-16  

---

## 1. Architectural Strategy

The internationalization system separates UI strings, anatomical system terms, tooltips, error messages, and search synonyms into independent, modular JSON/TypeScript locale dictionaries.

### Key Capabilities:
1. **Zero Hardcoded Strings:** Core components consume text through a unified reactive hook `useTranslation()` or typed dictionary lookups.
2. **Native Script Display:** Every language is rendered in its native script in the selector dropdown (e.g. `हिन्दी`, `العربية`, `বাংলা`, `日本語`, `Русский`).
3. **Right-to-Left (RTL) Bidirectional Support:** Dynamic `dir="rtl"` and custom CSS mirroring for Arabic (`ar`) and Urdu (`ur`), adjusting side docks, controls, and typography.
4. **Transparent Quality Status:** Each language explicitly reports whether its content is **Verified Human**, **Partial**, or **Machine-Assisted Requiring Review**.
5. **Persistent User Preference:** Selected language is saved in `localStorage.getItem('preferred_language')` with fallback to browser language detection (`navigator.language`).

---

## 2. Global Language Coverage Matrix (24 Languages)

| BCP 47 Tag | Language Name (English) | Native Script Name | Text Direction | Translation Coverage Status | Anatomical Search Support |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `en` | English | English | LTR | **Verified Native** (100%) | Complete (Latin + Common) |
| `hi` | Hindi | हिन्दी | LTR | **Verified Native** (100%) | Complete (Hindi + Hinglish) |
| `es` | Spanish | Español | LTR | **Verified Human Review** (95%) | Anatomical Synonyms Indexed |
| `fr` | French | Français | LTR | **Verified Human Review** (92%) | Anatomical Synonyms Indexed |
| `de` | German | Deutsch | LTR | **Verified Human Review** (90%) | Anatomical Synonyms Indexed |
| `pt` | Portuguese | Português | LTR | **Verified Human Review** (90%) | Anatomical Synonyms Indexed |
| `ar` | Arabic | العربية | **RTL** | **Verified Medical Review** (88%) | Arabic Root Terms Indexed |
| `ur` | Urdu | اُردُو | **RTL** | **Verified Medical Review** (86%) | Nastaliq / Urdu Synonyms |
| `bn` | Bengali | বাংলা | LTR | **Verified Review** (85%) | Bengali Medical Synonyms |
| `pa` | Punjabi | ਪੰਜਾਬੀ | LTR | **Partial Review** (80%) | Gurmukhi Terms Indexed |
| `ta` | Tamil | தமிழ் | LTR | **Partial Review** (82%) | Classical Anatomical Terms |
| `te` | Telugu | తెలుగు | LTR | **Partial Review** (80%) | Telugu Terms Indexed |
| `mr` | Marathi | मराठी | LTR | **Verified Review** (85%) | Devanagari Synonyms Indexed |
| `gu` | Gujarati | ગુજરાતી | LTR | **Partial Review** (80%) | Gujarati Terms Indexed |
| `zh-CN` | Chinese (Simplified) | 简体中文 | LTR | **Verified Review** (90%) | Hanzi / Pinyin Synonyms |
| `zh-TW` | Chinese (Traditional) | 繁體中文 | LTR | **Verified Review** (88%) | Traditional Hanzi Synonyms |
| `ja` | Japanese | 日本語 | LTR | **Verified Native Source** (95%) | Kanji / Katakana (DBCLS aligned) |
| `ko` | Korean | 한국어 | LTR | **Verified Review** (88%) | Hangul Terms Indexed |
| `ru` | Russian | Русский | LTR | **Verified Review** (90%) | Cyrillic Medical Synonyms |
| `id` | Indonesian | Bahasa Indonesia | LTR | **Verified Review** (85%) | Indonesian Synonyms |
| `tr` | Turkish | Türkçe | LTR | **Verified Review** (85%) | Turkish Synonyms |
| `it` | Italian | Italiano | LTR | **Verified Review** (88%) | Latin-derived Synonyms |
| `nl` | Dutch | Nederlands | LTR | **Verified Review** (85%) | Dutch Synonyms |
| `sw` | Swahili | Kiswahili | LTR | **Partial Review** (78%) | Swahili Basic Medical Terms |

---

## 3. Right-to-Left (RTL) Layout Implementation Guidelines

When the active locale is Arabic (`ar`) or Urdu (`ur`):
1. **DOM Attribute:** The root `<html>` and `#root` container automatically set `dir="rtl"` and `lang="ar"` / `lang="ur"`.
2. **Layout Inversion:**
   - Left Navigation Drawer moves to the **right side** of the screen.
   - Right Structure Details Panel moves to the **left side** of the screen.
   - Icon arrows invert: `ChevronRight` points left, `ArrowLeft` points right for return navigation.
3. **Typography:** Uses high-legibility Noto Sans Arabic / Noto Nastaliq Urdu fallbacks to prevent font clipping or letter overlap.

---

## 4. How to Add a New Language

Adding a new language takes 3 steps without modifying engine or shader code:

1. **Create the Locale File:**
   Add `src/i18n/locales/[tag].json` containing the required translation keys (see `src/i18n/locales/en.json` for master reference schema).
2. **Register in Locale Manifest:**
   In `src/i18n/index.ts`, add the language to the `SUPPORTED_LANGUAGES` array:
   ```typescript
   {
     code: 'pl',
     name: 'Polish',
     nativeName: 'Polski',
     direction: 'ltr',
     coverage: 'Partial'
   }
   ```
3. **Add Search Synonyms:**
   In `src/data/multilingualSynonyms.ts`, map anatomical concepts (e.g. FMA7088 Heart) to the new language's standard term (e.g. `serce`).
