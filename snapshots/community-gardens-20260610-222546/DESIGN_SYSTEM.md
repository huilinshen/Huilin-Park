# Huilin Park Portfolio — Design System

## Core Concept

This portfolio is designed as **Huilin Park**, a playful 3D amusement park homepage that opens into clean, minimal UI/UX case study pages.

The homepage should feel colourful, playful, and imaginative.
Each attraction represents one portfolio destination:

* Three amusement rides = three UI/UX projects
* One ice cream truck = About Me page

The 3D models are placeholders for now. Keep the current models and structure. The final 3D attractions will be modelled later.

The case study pages should feel very different from the homepage: clean, minimal, calm, premium, and easy to read.

---

## Homepage

The homepage remains an amusement park.

Top-left content only:

* Main title: `Huilin Park`
* Small decorative label: `PLAYABLE UIUX PORTFOLIO`

Remove the four explanatory lines:

* “click a ride to open a case study...”
* any similar instruction text under the title

Homepage structure:

* 3 amusement rides for 3 UI/UX projects
* 1 ice cream truck for the About Me page

About Me page should include:

* Contact details
* Direct link to download CV
* LinkedIn profile
* Personal introduction

---

## Global Case Study Style

All UI/UX project pages use:

* Background: `#FFFFFF`
* Overall feeling: clean, minimal, premium, calm, clear
* No unnecessary decoration
* No yellow background blocks
* Generous spacing
* Smooth and calm interactions
* Content should be structured into collapsible sections

The homepage can be colourful and playful, but the case study pages should remain minimal and editorial.

---

## Typography

Use **DM Sans** for all text.

Font source: Google Fonts.

### Project Name / Largest Heading

Used for the project title at the top of a case study page, for example:

* Community Gardens Forres

Style:

* Font: DM Sans
* Size: `64px`
* Weight: Black / `900`
* Color: `#000000`
* Community Gardens Forres project-specific accent color: `#75A723`

### H1 / Primary Heading

Used for major section titles, for example:

* Gardening Calendar
* Community Garden Map
* Stage 1: Desk Research
* Stage 2: Interview with Stakeholder

Style:

* Font: DM Sans
* Size: `40px`
* Weight: Black / `900`
* Color: `#000000`
* Community Gardens Forres project-specific H1 accent color: `#75A723`

### H2 / Collapsible Section Heading

Used for subsection titles, for example:

* About Forres
* Desk Research
* Interview Findings
* Persona

Style:

* Font: DM Sans
* Size: `34px`
* Weight: ExtraBold / `800`
* Color: `#000000`

Some H2 headings should be collapsible accordion headers.

### H3 / Small Heading

Style:

* Font: DM Sans
* Size: `30px`
* Weight: Black / `900`
* Color: `#000000`

### Body Text

Style:

* Font: DM Sans
* Size: `28px`
* Weight: Regular / `400`
* Color: `#000000`
* Line height should be comfortable and readable

---

## Accordion / Dropdown Component

Many case study sections should use a collapsible accordion component.

Default state:

* Show only:

  * Solid triangle icon
  * H2 section title
* Triangle points downward by default

Interaction:

* On click, triangle changes direction
* When collapsed: triangle points downward
* When opened: triangle points right
* The content expands smoothly below the heading

Important:

* The pale yellow area in Figma is only a design note / content area guide.
* Do not implement the pale yellow background.
* Actual project page background must remain pure white: `#FFFFFF`.

Use accordions for less important or supporting process sections, so the page does not feel too long or overwhelming by default.

---

## Motion

Motion should feel:

* Calm
* Smooth
* Natural
* Subtle
* Not playful or bouncy inside case study pages

Recommended interaction style:

* Accordion open / close: smooth height or opacity transition
* Hover: subtle opacity change or underline
* No dramatic animations
* No heavy motion on reading pages

---

## Visual Rules

Case study pages:

* Background: `#FFFFFF`
* Text: `#000000`
* No shadows
* No gradients
* No unnecessary decorative elements
* Avoid heavy borders
* Keep layout clean and readable
* Use whitespace generously
* Images should appear crisp and high resolution

Homepage:

* Can be colourful
* Can be playful
* Keep the current 3D amusement park structure
* Do not redesign the 3D models now
* Final 3D model refinement will happen later

---

## Development Rules for Codex

When implementing new sections:

* Implement only one section at a time
* Do not modify homepage unless explicitly requested
* Do not modify park layout unless explicitly requested
* Do not redesign the project
* Do not change global typography unless explicitly requested
* Do not refactor unrelated files
* Do not modify other project sections
* Stop after implementing the requested section and wait for review

Each section should be built from the Figma screenshot and supplied high-resolution assets.

Figma screenshot = layout reference
Exported assets = actual images used in the website
