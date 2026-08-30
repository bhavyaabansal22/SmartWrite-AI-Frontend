# Write Flow AI

MASTER PRODUCT PROMPT — SMARTWRITE AI

PROJECT

SmartWrite AI

Tagline:

Write Faster. Write Smarter. Write Beautifully.

Animated Hero Subheading:

Write smarter, write better.

This should have a continuous typing/deleting animation similar to a GitHub README typing animation:

Write smarter, write better.

→ pause

→ delete

→ type again

→ repeat

==================================================

IMPORTANT — FRONTEND ONLY / STRICT SCOPE

==================================================

Build ONLY the frontend/UI.

DO NOT create, modify, replace, or implement any backend logic.

The FastAPI backend already exists and is deployed.

The frontend must communicate with the existing FastAPI backend through one centralized configurable variable:

API_BASE_URL = "https://smartwrite-ai.onrender.com/"

All API requests MUST use this variable.

Architecture:

Frontend

   ↓

FastAPI Backend

   ↓

My NLP Models / Gemini

NEVER:

Frontend → Gemini directly

IMPORTANT:

Do NOT create:

- Supabase

- Database

- Database tables

- Authentication

- Login/signup

- User accounts

- Server functions

- Edge Functions

- Backend API routes

- New backend services

- Gemini API calls directly from the frontend

- Any replacement backend

Do not modify the existing FastAPI backend.

This project is strictly a frontend client for the already-deployed FastAPI backend.

==================================================

CENTRALIZED CONFIGURATION

==================================================

Do not require me to search through multiple components to change configuration values.

Create one centralized configuration file/module containing:

API_BASE_URL = "https://smartwrite-ai.onrender.com/"

USE_MOCK_API = false

GITHUB_URL = "https://github.com/bhavyaabansal22"

PORTFOLIO_URL = "https://portfolio-website-theta-lemon.vercel.app/"

LINKEDIN_URL = "https://www.linkedin.com/in/bhavyaa-bansal-0b5170334/"

All components and API utilities must import configuration values from this centralized location.

Do NOT scatter URLs throughout components.

==================================================

API ARCHITECTURE

==================================================

Create one centralized API utility/service layer.

Example reusable functions:

autocompleteText()

autocorrectText()

generateText()

rewriteText()

summarizeText()

getHealth()

All network requests must go through this API layer.

Do not scatter fetch/axios calls throughout React components.

Before implementing API integrations:

1. Create the centralized API utility layer.

2. Use API_BASE_URL for every request.

3. Use the exact request and response structures specified below.

4. Do not invent undocumented backend fields.

5. Do not assume character positions are returned by the backend.

6. Handle loading, errors, timeouts, and unavailable services gracefully.

The deployed FastAPI backend is the source of truth.

==================================================

MOCK MODE

==================================================

Keep mock API implementations isolated in a dedicated mock API module.

Configuration:

USE_MOCK_API = false

The final application MUST use the real deployed FastAPI backend by default.

Mock mode may exist only to make isolated frontend development easier.

Do not hardcode mock responses throughout components.

If USE_MOCK_API is changed to true, all API functions should use the isolated mock implementation.

If USE_MOCK_API is false, all requests must go to the real FastAPI backend.

==================================================

PRODUCT VISION

==================================================

Create a simple, elegant and genuinely useful writing workspace.

The product should feel like a combination of:

- a modern writing editor

- a lightweight spelling assistant

- an autocomplete assistant

- an AI writing assistant

It should NOT feel like:

- a complicated dashboard

- a ChatGPT clone

- a CRM

- an analytics platform

The main experience should be:

User starts writing

       ↓

Autocomplete helps complete thoughts

       ↓

Autocorrect detects spelling mistakes

       ↓

User chooses whether to accept corrections

       ↓

User can use AI when they need higher-level writing help

==================================================

DESIGN PHILOSOPHY

==================================================

Use:

- Minimal

- Elegant

- Modern

- Calm

- Professional

- Friendly

- Productivity-focused

- Distraction-free

Avoid:

- excessive cards

- excessive gradients

- excessive animations

- complicated dashboards

- unnecessary navigation

- too many buttons

- chatbot-style UI

The writing editor must remain the main visual focus.

==================================================

COLOR PALETTE

==================================================

Light Mode:

Salmon Pink:       #ECC8AF

Soft Sandstone:    #E7AD99

Pearl:             #F7F3EE

Olive Slate:       #495867

Dark Pewter:       #2F3437

Dark Mode:

Create darker variants of the same palette.

Use:

- warm near-black background

- dark pewter surfaces

- muted salmon accents

- olive slate secondary accents

- pearl text

The theme transition should be smooth.

==================================================

THEME

==================================================

Provide:

Light

Dark

System

Remember the user's preference using frontend/local storage.

Add a simple theme toggle in the header.

The application should respect the user's system theme when System is selected.

==================================================

TYPOGRAPHY

==================================================

Use a combination of fonts rather than one font everywhere.

Hero:

Elegant serif or premium display font.

Headings:

Modern geometric sans-serif.

Body:

Clean readable sans-serif.

Technical/statistical information:

Monospace where appropriate.

Maintain strong hierarchy without making the interface visually busy.

==================================================

ANIMATION STYLE

==================================================

Use subtle, purposeful animation.

Include:

- hero typing animation

- fade-in

- slide-in

- hover transitions

- button micro-interactions

- autocomplete dropdown animation

- correction popover animation

- AI result animation

- loading skeletons

- smooth theme transitions

- subtle floating effects where appropriate

Do not animate everything.

The application should feel fast, not flashy.

Respect prefers-reduced-motion where appropriate.

==================================================

NAVIGATION

==================================================

Keep navigation extremely simple.

Header:

SmartWrite AI

Navigation:

Workspace

About

Right side:

Theme Toggle

Optional:

Your GitHub

Your Portfolio

Use:

GITHUB_URL

PORTFOLIO_URL

Do not create navigation for features that don't exist.

On mobile, collapse navigation into a simple mobile menu.

==================================================

LANDING / HERO

==================================================

Create a polished landing section before the workspace.

Display:

SmartWrite AI

Write Faster.

Write Smarter.

Write Beautifully.

Then the animated subheading:

Write smarter, write better.

Use the typing/deleting animation described above.

Animation behavior:

Write smarter, write better.

→ pause

→ delete

→ type again

→ repeat

Hero description:

An intelligent writing assistant that combines custom NLP-powered autocomplete and autocorrect with AI-powered writing tools.

Buttons:

Start Writing

Explore Features

Start Writing should smoothly move to/open the workspace.

Explore Features should scroll to a simple feature explanation.

==================================================

FEATURE INTRODUCTION

==================================================

Show three simple feature areas.

Autocomplete:

Explain that SmartWrite predicts what the user may want to type next using the application's custom autocomplete engine.

Autocorrect:

Explain that spelling mistakes are detected and suggested corrections are shown without silently changing the user's writing.

AI Writing:

Explain that Gemini-powered features can help generate, rewrite and summarize text when the user needs higher-level assistance.

Do NOT claim:

- grammar correction

- translation

- tone detection

- plagiarism detection

- sentiment analysis

- any other feature not listed in this specification

==================================================

MAIN WORKSPACE

==================================================

The workspace is the heart of the application.

Do NOT make users navigate through multiple complicated pages.

Use one central writing environment.

Suggested structure:

SmartWrite AI                              Theme

               Writing Workspace

┌──────────────────────────────────────────────────┐

│                                                  │

│ Start writing something...                       │

│                                                  │

│                                                  │

└──────────────────────────────────────────────────┘

Autocomplete ●       Autocorrect ●

[ Generate ] [ Rewrite ] [ Summarize ]

Keep the editor large.

The workspace should be visually dominant.

==================================================

WRITING EDITOR

==================================================

Create a large multiline writing editor.

Placeholder:

Start writing something...

The editor should support:

- multiline text

- natural typing

- cursor positioning

- text selection

- copy

- paste

- undo

- redo

- clear

- word count

- character count

Do not make the editor feel like a form.

It should feel like a real writing environment.

IMPORTANT EDITOR PRIORITY:

Use the simplest robust editor architecture possible.

Do NOT sacrifice:

- normal text editing

- cursor positioning

- text selection

- copy/paste

- undo/redo

- keyboard navigation

- mobile usability

merely to achieve spellcheck highlighting.

If precise inline highlighting cannot be implemented reliably from the current API response, use a lightweight contextual correction UI instead of inventing character-position data.

Do not invent backend fields.

==================================================

WRITING STATISTICS

==================================================

Display lightweight live statistics below or beside the editor.

At minimum:

Words: 0

Characters: 0

Optionally:

Sentences: 0

Reading time: 0 min

Keep these subtle.

Do not create a separate analytics dashboard.

==================================================

AUTOCOMPLETE

==================================================

Integrate the existing backend.

Endpoint:

POST /autocomplete

Request:

{

  "text": "...",

  "top_n": 3

}

Response:

{

  "text": "...",

  "suggestions": [...]

}

Use the real backend endpoint.

Do not hardcode suggestions.

Do not invent suggestions when the real API is enabled.

==================================================

AUTOCOMPLETE UX

==================================================

Autocomplete should feel like a natural writing assistant.

Example:

User types:

I would like to sched

Show a subtle floating suggestion popup:

┌────────────────────┐

│ schedule           │

│ scheduled          │

│ scheduling         │

└────────────────────┘

The suggestions must come from the API.

Interaction:

- click a suggestion

- select using keyboard

- press Enter/Tab to accept

- continue typing to dismiss suggestions

- Escape dismisses suggestions

Do not interrupt normal typing.

Autocomplete should never block the editor.

==================================================

AUTOCOMPLETE PERFORMANCE

==================================================

Debounce autocomplete requests.

Do NOT send a request for every individual keystroke.

Only request suggestions when appropriate, for example after the user has typed enough characters.

Use a sensible debounce interval.

Show a small loading indicator when fetching suggestions.

Cancel or ignore stale autocomplete requests where appropriate so an older response cannot overwrite a newer suggestion state.

If the backend is unavailable, autocomplete should fail gracefully without breaking the editor.

If autocomplete fails, the user must still be able to continue writing normally.

==================================================

AUTOCORRECT

==================================================

Integrate:

POST /autocorrect

Request:

{

  "text": "..."

}

Response:

{

  "original": "...",

  "corrected": "...",

  "corrections": [...],

  "correction_count": 0

}

Use the actual backend response.

Do not create fake corrections.

Do not silently replace text.

==================================================

AUTOCORRECT UX

==================================================

Do NOT silently replace misspelled words.

Instead, behave like a modern spelling assistant.

Example:

User writes:

I definately want to recieve this opportunity.

Display:

I definately want to recieve this opportunity.

  ~~~~~~~~~~        ~~~~~~~

Use a subtle red/wavy/dotted underline or equivalent visual indication.

The user must remain in control.

==================================================

CORRECTION INTERACTION

==================================================

When the user hovers over or clicks a misspelled word, display a small contextual popup.

Example:

┌─────────────────────────┐

│ Spelling                │

│                         │

│ ✓ definitely            │

│                         │

│ Ignore mistake          │

└─────────────────────────┘

If multiple suggestions are available:

┌─────────────────────────┐

│ Spelling                │

│                         │

│ ✓ receive               │

│   relieve               │

│   revive                │

│                         │

│ Ignore mistake          │

└─────────────────────────┘

The correction UI must be keyboard accessible.

==================================================

ACCEPT CORRECTION

==================================================

When the user selects:

✓ definitely

replace only that word.

Preserve:

- remaining text

- punctuation

- whitespace

- capitalization where possible

Remove the warning after correction.

Do not replace unrelated occurrences of the same word.

==================================================

IGNORE MISTAKE

==================================================

When the user selects:

Ignore mistake

keep the original word.

Remove the warning for that occurrence.

Do not modify the user's writing.

==================================================

IMPORTANT AUTOCORRECT LIMITATION

==================================================

The interface should communicate that this is spelling assistance, not full grammar correction.

Do NOT claim grammar checking.

Do NOT silently change user content.

The current backend returns correction details but not explicit character positions.

Therefore:

- Do not invent character positions.

- Do not assume the backend returns offsets.

- Do not break if the same misspelled word appears more than once.

- Handle correction highlighting carefully.

- Prefer robust, conservative highlighting over inaccurate highlighting.

If exact word positions cannot be determined reliably from the backend response, provide the correction through a contextual spelling assistant UI rather than incorrectly underlining unrelated occurrences.

==================================================

AUTOCORRECT TOGGLE

==================================================

Provide:

Autocorrect [ ON ]

If disabled:

- don't request autocorrect

- don't show spelling warnings

Remember this preference locally.

Default:

Autocorrect ON

==================================================

AUTOCOMPLETE TOGGLE

==================================================

Provide:

Autocomplete [ ON ]

If disabled:

- don't request autocomplete

- don't show suggestion popup

Remember this preference locally.

Default:

Autocomplete ON

==================================================

AI WRITING ACTIONS

==================================================

Provide exactly three main actions:

✨ Generate

↻ Rewrite

📝 Summarize

These are the only Gemini-powered features.

Do NOT add other AI features.

Do not create:

- AI chat

- chatbot

- grammar AI

- tone detector

- translation AI

- prompt builder

==================================================

GENERATE

==================================================

Endpoint:

POST /generate

When the user clicks Generate, open a clean panel/modal rather than navigating to another complicated page.

Purpose dropdown:

- Email

- LinkedIn Post

- Blog Post

- Essay

- Cover Letter

- Social Media Post

- General Writing

- Custom

Tone dropdown:

- Professional

- Friendly

- Casual

- Formal

- Persuasive

- Confident

- Creative

- Polite

Platform dropdown:

- General

- LinkedIn

- Email

- Instagram

- X / Twitter

- Blog

- Academic

- Custom

Audience dropdown:

- General

- Recruiters

- Customers

- Students

- Professionals

- Executives

- Custom

Length dropdown:

- Short

- Medium

- Long

Additional Instructions:

Multiline input

Placeholder:

Tell SmartWrite anything specific you'd like...

Button:

✨ Generate

Use the actual backend endpoint.

Do not call Gemini directly.

==================================================

REWRITE

==================================================

Endpoint:

POST /rewrite

Open a compact Rewrite panel.

Tone dropdown:

- Professional

- Friendly

- Casual

- Formal

- Persuasive

- Concise

- Creative

Additional Instructions:

Multiline input

Placeholder:

Make this clearer, more concise, and professional...

Button:

↻ Rewrite

The result should appear separately.

Do not immediately destroy the original text.

Provide:

Use this version

to replace the editor content.

==================================================

SUMMARIZE

==================================================

Endpoint:

POST /summarize

Provide:

Length dropdown:

- Short

- Medium

- Detailed

Button:

📝 Summarize

Show the result in a clean result panel.

Provide:

Copy

Use result

Do not automatically replace the original text.

==================================================

AI RESULT PANEL

==================================================

AI responses should appear without navigating away from the workspace.

Display:

AI Result

────────────────────

[result]

[Copy] [Use this version]

Include:

- loading state

- skeleton

- error state

- copy button

- replace/use-result button where appropriate

Use smooth transitions.

The original editor content must remain intact until the user explicitly chooses to use the generated result.

==================================================

API ERROR HANDLING

==================================================

Handle:

Backend unavailable:

"SmartWrite is temporarily unavailable.

Please try again in a moment."

429:

"You're making requests a little too quickly.

Please wait a moment and try again."

Other API errors:

Display a friendly user-facing message.

Do NOT expose:

- API keys

- stack traces

- internal backend errors

- Gemini credentials

- raw server errors

Do not expose implementation details to users.

==================================================

SLOW BACKEND / RENDER HANDLING

==================================================

The backend is deployed on Render.

The first API request may take several seconds if the service has been idle.

Do NOT show an error merely because the backend takes several seconds to respond.

Show an appropriate loading state and allow the request enough time to complete.

The interface should remain usable while requests are pending.

Do not freeze the editor while the backend is responding.

==================================================

API CONFIGURATION

==================================================

Create one centralized configuration/API utility layer.

Example:

API_BASE_URL = "https://smartwrite-ai.onrender.com/"

USE_MOCK_API = false

All API requests must use API_BASE_URL.

Create reusable API functions such as:

autocompleteText()

autocorrectText()

generateText()

rewriteText()

summarizeText()

getHealth()

Do not scatter fetch/axios logic throughout components.

==================================================

HEALTH STATUS

==================================================

Use:

GET /health

to determine whether the custom NLP services are available.

Display a very subtle status indicator:

● SmartWrite ready

or:

● Some services unavailable

Do not make this a large dashboard element.

Health status should not dominate the UI.

If the health request fails, do not prevent the user from using the editor.

==================================================

ABOUT SECTION

==================================================

Create a small About section explaining:

SmartWrite AI

An AI-powered writing assistant combining custom NLP models with modern generative AI.

Mention only technologies actually used:

Python

FastAPI

NLP

Scikit-learn

PySpellChecker

Gemini API

React

PROJECT_DESCRIPTION = "YOUR_DESCRIPTION_HERE"

Do not invent additional technologies.

==================================================

TECHNOLOGY SECTION

==================================================

Keep this small.

Show:

Custom Autocomplete

Custom Autocorrect

FastAPI

Python

NLP

Gemini

React

Do not create an elaborate architecture dashboard.

==================================================

FOOTER

==================================================

Simple footer.

SmartWrite AI

Write Faster. Write Smarter. Write Beautifully.

Links:

GitHub

Portfolio

LinkedIn

Use centralized configuration values:

GITHUB_URL

PORTFOLIO_URL

LINKEDIN_URL

Add:

© 2026 SmartWrite AI

==================================================

RESPONSIVENESS

==================================================

The application must work well on:

- Desktop

- Laptop

- Tablet

- Mobile

On mobile:

- collapse navigation

- make editor full width

- make autocomplete popup responsive

- make AI panels stack vertically

- keep buttons easily tappable

- prevent horizontal scrolling

- preserve comfortable editor padding

- ensure modals/panels fit within the viewport

Do not create horizontal scrolling.

==================================================

ACCESSIBILITY

==================================================

Implement:

- keyboard navigation

- visible focus states

- semantic HTML

- accessible buttons

- accessible form labels

- sufficient contrast

- screen-reader-friendly labels

Autocomplete and autocorrect must be usable with keyboard navigation.

Use appropriate ARIA attributes where necessary.

Do not rely only on color to communicate errors or correction states.

==================================================

COMPONENT ARCHITECTURE

==================================================

Build reusable components.

Suggested structure:

App

│

├── Header

├── Hero

├── FeatureOverview

│

└── Workspace

    │

    ├── WritingEditor

    │   ├── AutocompleteSuggestions

    │   ├── AutocorrectMarkers

    │   └── WritingStats

    │

    ├── EditorActions

    │   ├── GeneratePanel

    │   ├── RewritePanel

    │   └── SummarizePanel

    │

    └── AIResult

│

├── About

├── Technology

└── Footer

Keep components independent and reusable.

Keep API/network logic separate from presentation components.

Keep configuration separate from components.

Keep mock API logic separate from real API logic.

==================================================

IMPORTANT UX RULES

==================================================

1. Don't overwhelm the user.

The first thing the user should see is:

Write something...

Not 15 settings.

2. Progressive disclosure.

Only show advanced controls when the user chooses:

Generate

Rewrite

Summarize

3. The editor is the hero.

The writing experience should always remain the primary focus.

4. Custom NLP should feel useful.

Autocomplete and autocorrect should be visible and interactive.

Do not hide them behind a separate page.

5. AI should be optional.

The user should be able to write normally using:

Editor

+

Autocomplete

+

Autocorrect

and use Gemini only when they want:

Generate

Rewrite

Summarize

6. Never silently modify writing.

Especially autocorrect.

Always give the user control over corrections.

7. Do not block normal writing.

Backend requests, autocomplete loading, autocorrect processing, or AI generation must never make the editor unusable.

8. Prefer simplicity.

If there are two ways to implement something, choose the simpler and more reliable frontend implementation.

==================================================

FEATURES NOT IMPLEMENTING

==================================================

Do NOT create these:

- Analytics dashboard

- History system

- Templates system

- Personal dictionary

- Resume builder

- Customer support module

- Prompt Builder

- Profile system

- User authentication

- Team workspace

- Voice typing

- Translation

- Browser extension

- Mobile application

- Grammar correction

- Tone detection

- AI chat

- Document management system

- Database

These may be future roadmap ideas, but they are NOT part of the current application.

Do not create fake UI for them.

==================================================

FINAL EXPERIENCE

==================================================

The final application should feel like this:

                SmartWrite AI

       Write Faster. Write Smarter.

              Write Beautifully.

          Write smarter, write better.

          ↻ typing animation

┌───────────────────────────────────────────────┐

│                                               │

│ Start writing something...                    │

│                                               │

│                                               │

│                                               │

└───────────────────────────────────────────────┘

        Autocomplete ●    Autocorrect ●

      [ ✨ Generate ] [ ↻ Rewrite ] [ 📝 Summarize ]

                    ↓

      Smart assistance while you write

The user should be able to:

Type

→ get autocomplete

→ encounter a spelling mistake

→ see it indicated

→ hover/click

→ choose a correction or ignore

→ continue writing

→ optionally Generate/Rewrite/Summarize

That is the complete current SmartWrite AI product.

==================================================

IMPLEMENTATION PRIORITIES

==================================================

Prioritize the following order:

1. A polished, reliable writing editor

2. Real FastAPI integration

3. Autocomplete functionality

4. Autocorrect functionality without silently modifying text

5. Generate / Rewrite / Summarize functionality

6. Responsive mobile experience

7. Accessibility

8. Visual polish and animation

Do not spend implementation effort on features outside this specification.

==================================================

FINAL INSTRUCTION

==================================================

Build the complete frontend in one pass based on this specification.

Prioritize usability and polish over adding more features.

Do not invent functionality that is not listed above.

Do not create a backend.

Do not create authentication.

Do not create a database.

Do not call Gemini directly from the frontend.

Use the deployed FastAPI backend through the centralized API_BASE_URL.

Use the real API by default:

USE_MOCK_API = false

Keep mock mode isolated and easy to enable if needed.

Do not require me to search through multiple components to change configuration values.

Keep configuration centralized.

Before considering the implementation complete, verify that:

- the app builds successfully

- the editor works normally

- autocomplete uses POST /autocomplete

- autocorrect uses POST /autocorrect

- Generate uses POST /generate

- Rewrite uses POST /rewrite

- Summarize uses POST /summarize

- Health uses GET /health

- every API request uses API_BASE_URL

- no frontend request goes directly to Gemini

- mock mode is disabled by default

- API failures do not break the editor

- slow Render responses are handled gracefully

- autocorrect never silently changes text

- mobile layout works

- keyboard navigation works

- theme preference persists locally

- Autocomplete and Autocorrect preferences persist locally

- no features outside this specification are added

Build the complete SmartWrite AI frontend now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/55c3261f-e452-47d8-9bb0-c6e065d0e1a8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
