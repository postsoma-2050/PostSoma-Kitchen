---
name: geo-seo-optimization
description: Standardized workflow and audit checklist for Generative Engine Optimization (GEO), AI bot indexing, Rich JSON-LD Schemas, and E-E-A-T multi-source provenance enhancement for modern web applications.
---

# GEO & SEO Optimization Standard (PostSoma Kitchen)

This skill documents the complete specifications, rules, and audit checklists for maintaining peak search engine optimization (SEO) and generative engine optimization (GEO) across **PostSoma Kitchen** (`https://recipelab.cc/`).

---

## 1. Core Principles of GEO (Generative Engine Optimization)

Generative Engine Optimization ensures that AI models (ChatGPT, Claude, Perplexity, Google Gemini, Apple Intelligence, ByteDance) can fetch, understand, and cite site content with zero friction and explicit source attribution.

### Key Requirements:
1. **Unrestricted AI Crawler Access**: Explicitly allow AI crawler User-Agents in `robots.txt`.
2. **Machine Knowledge Feeds (`llms.txt` & `llms-full.txt`)**:
   - `llms.txt`: Compact Markdown index summarizing site intent, visual matrix engine architecture, core capabilities, multi-source provenance map, and citation guidance.
   - `llms-full.txt`: Comprehensive, structured Markdown text of all core features, services, and complete recipe catalog with explicit `source_type` and `original_reference` metadata.
3. **Structured Data (Schema.org JSON-LD)**:
   - Provide explicit machine semantics (`Recipe`, `WebSite`, `Organization`, `SoftwareApplication`, `HowTo`, `BreadcrumbList`, `AboutPage`).
   - Separate platform entity (`publisher`: PostSoma Kitchen) from original source attribution (`isBasedOn`, `citation`, `author`).
4. **Canonical Host Enforcement**:
   - Every page and sitemap entry MUST strictly use the primary production domain `https://recipelab.cc/`.

---

## 2. AI Crawler Rules (`robots.txt`)

`robots.txt` located at `public/robots.txt` must explicitly grant full access to major AI & Search crawlers:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Diffbot
Allow: /

Sitemap: https://recipelab.cc/sitemap.xml
```

---

## 3. Schema.org JSON-LD Standard Specifications

### 3.1 Global Root Schemas (`WebSite`, `Organization`, `SoftwareApplication`)
Injected globally into head:
- `WebSite`: Title, URL (`https://recipelab.cc/`), and `SearchAction` target (`https://recipelab.cc/?search={search_term_string}`).
- `Organization`: Name "PostSoma Kitchen", logo URL, URL, and brand description ("Visual Recipe Standardization & Health Modeling Engine").
- `SoftwareApplication`: Name, applicationCategory ("LifestyleApplication", "HealthApplication"), operatingSystem ("Web"), and visual flow card feature descriptions.

### 3.2 Recipe Schema (`Recipe`) with Provenance
For individual recipe pages (`/recipe/:id`):
```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Recipe Title",
  "description": "Recipe Description",
  "recipeCuisine": "Chinese / Western / etc.",
  "prepTime": "PT10M",
  "cookTime": "PT15M",
  "totalTime": "PT25M",
  "recipeYield": "2-3 servings",
  "publisher": {
    "@type": "Organization",
    "name": "PostSoma Kitchen",
    "url": "https://recipelab.cc/"
  },
  "isBasedOn": "Zhang Ye Healthy Recipe Guide (Phase-1 Collection)",
  "recipeIngredient": [
    "Ingredient 1 200g",
    "Ingredient 2 1 tbsp"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "name": "Step Name",
      "text": "Detailed action description with heat level and timing"
    }
  ]
}
```

### 3.3 Breadcrumb Schema (`BreadcrumbList`)
Present on all content views to enable rich snippet breadcrumbs in search engines.

---

## 4. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Audit Checklist

- [x] **Platform Architecture**: Clear positioning as a Visual Recipe Standardization & Health Modeling Engine.
- [x] **Dataset Provenance**: Multi-source attribution framework (Phase-1 Inaugural Collection: Zhang Ye's 102 healthy recipes + 16 Western private recipes, with open lineage for future collections).
- [x] **Privacy & Transparency**: Explicit local-first architecture and encryption disclosures.
- [x] **Citation Policy**: BibTeX and Markdown citation standards provided for AI researchers and academic tools.
- [x] **Machine Feed Links**: Public footer and about page entries pointing directly to `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, and `/robots.txt`.
