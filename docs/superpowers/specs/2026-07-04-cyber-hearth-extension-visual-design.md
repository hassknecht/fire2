# Cyber Hearth Chrome Extension Visual Design

Date: 2026-07-04

## Product Frame

Cyber Hearth is a local-first Chrome extension that opens into a private full-screen digital hearth. Its purpose is not productivity tracking or journaling. It gives users a calm ritual for making stressful text, files, sketches, and symbolic avatars disappear.

The first version is a browser-native experience with no account, no backend, no analytics, and no upload path. The visual design should make that privacy posture feel inherent: a small private room, a responsive fire, and temporary traces that vanish when the page refreshes.

## Visual Principles

The screen should feel like a hidden room inside the browser, not like a web app. The fireplace is the product. UI controls are quiet environmental objects.

Core principles:

- Immersion first: the fire, hearth, and room ambience occupy the full viewport.
- Cause and effect: every dropped object creates an immediate physical response.
- Privacy through restraint: local-only status is visible but never promotional.
- Warmth with cyber restraint: firelight, charred surfaces, dark red tones, blue-gray night shadows, and faint glass reflections.
- No traditional app chrome: no navbar, dashboard, sidebar, or large instructional panels.

## Scene Composition

The main view is a full-screen fireplace in a warm interior.

Foreground:

- A dark hearth ledge at the bottom third of the viewport.
- A central firebox with animated flames, embers, smoke, and falling ash.
- A subtle ash bed that accumulates during the session and resets on refresh.

Background:

- A softly blurred sofa or lounge silhouette near one side of the room.
- Warm wall texture, curtain or window hints, and soft depth-of-field blur near the edges.
- No detailed decorative clutter that competes with the fire.

The first viewport must immediately signal the product. The user should understand within one second that this is a place to drop things into fire.

## Time-Based Ambience

The extension uses local browser time to adjust room lighting.

Morning:

- Softer flames.
- Low-saturation golden ambient light.
- Slightly brighter wall and floor values.

Dusk:

- Richest orange and amber fire response.
- Longer shadows and strongest hearth contrast.
- Best default mood for after-work release.

Night:

- Darker room.
- Fire becomes the dominant light source.
- Glass controls pick up faint cool blue-gray edge light.

The transitions should be subtle. It should feel like the same room breathing through time, not a hard theme switch.

## Color And Typography

Primary color language:

- Ember amber, white-hot yellow, orange-red, coal black, deep wine red.
- Supporting colors: blue-gray shadow, smoked glass, dim brass highlights.

Avoid a one-note orange palette. The scene needs cold shadow and dark neutral contrast so the fire can feel alive.

Typography:

- Interface labels use a clean, readable sans-serif.
- Fire feedback copy may use a slightly more literary Chinese-friendly typeface fallback stack, but readability wins.
- Text should never be oversized inside controls. Large type is reserved for transient fire messages only.
- Letter spacing stays at default.

## Fire Behavior

The first version can use layered CSS and canvas particles instead of full WebGL, as long as the fire responds convincingly.

Base fire:

- Three to five semi-transparent flame layers.
- White-yellow center, amber mid-tone, orange-red edge.
- Independent flicker cycles with imperfect timing.
- Small embers rising continuously from the firebox.

Interaction response:

- Dropped items make flames surge upward, then settle.
- Larger files produce more sparks.
- Longer pasted text burns slightly longer.
- Sketches curl and fragment like a light paper scrap.
- Avatars dissolve into digital particles after charring.

The fire should never feel like a looping background video. It must acknowledge the user's action.

## Interaction Modules

### Text Burn

The user pastes or types stressful text into a small glass input zone near the fire. On burn, text appears briefly above the flame, bends under gravity, then falls into the fire.

Visual sequence:

1. Text lines gather into a thin paper-like strip.
2. The strip trembles in the heat.
3. Gravity pulls it into the flame.
4. Lines warp into character fragments.
5. Fragments ignite and become sparks.

Text content is never stored after the burn animation ends.

### File Drop

The user drags files from the desktop into the hearth page. The extension reads only user-provided file metadata needed for the local visual effect, such as name, extension, size, and type.

Visual sequence:

1. The firebox subtly brightens as a drop target.
2. A local file token follows the pointer.
3. On release, the token drops into the flame.
4. The file icon edge curls and blackens.
5. The filename burns away first, followed by the icon body.

No file contents are uploaded or persisted.

### Sketch And Toss

The sketch tool opens a small translucent smoke-glass canvas. The user can draw an angry scribble, a symbol, or a name. After drawing, the user flicks or tosses the sketch into the fire.

Visual sequence:

1. Ink appears as warm off-white or ember-red lines.
2. The sketch sheet floats with slight tension.
3. Tossing gives it velocity toward the hearth.
4. The linework peels apart into glowing threads.
5. Threads burn into ash and disappear.

### Avatar Drop

The extension includes a few abstract local-only avatars or labels, such as "无理的甲方", "拖延症", and "反复修改".

Visual sequence:

1. The avatar is draggable from a quiet side rail.
2. While dragged, it casts a small firelit shadow.
3. On release into the fire, it chars.
4. It fractures into pixels and ember particles.
5. A short cathartic message appears from the smoke.

Avatars must stay symbolic, non-violent, and non-graphic.

## UI Controls

Controls should feel like small pieces of glass suspended in the room.

Default placement:

- Left lower corner: paste/text burn control.
- Right lower corner: sketch control.
- Right middle edge: avatar tags.
- Upper corner: minimal "Local only" privacy indicator.

Control style:

- Translucent smoked glass.
- Fine border.
- Low opacity shadow.
- Warm fire reflection on the edge nearest the hearth.
- Minimum 44 px interactive target size.
- Icons or icon-plus-short-label controls where clarity requires text.

Controls should avoid large cards. Modals are acceptable only for the sketch canvas and should preserve the room context behind them.

## Feedback Copy

Feedback copy appears from the flame, not as a toast.

Behavior:

- Position: just above the flame.
- Motion: heat shimmer reveal, two-second hold, smoke-like fade.
- Length: one sentence.
- Tone: cathartic but not cruel, healing but not sentimental.

Examples:

- "繁文缛节皆化虚无，还你自由清净。"
- "此事已退场，你继续发光。"
- "它已经烧完了。你不用再替它燃烧。"
- "这团麻烦已归于灰烬。"
- "你的宇宙已恢复通透。"

## Privacy Expression

Privacy is part of the product experience.

Required first-version privacy posture:

- No account.
- No backend.
- No analytics.
- No upload path.
- No saved burn history.
- No persistent content storage.
- Session ash and particles reset on refresh.

The UI should include a small local-only indicator. It can open a concise note explaining that dropped content stays in the browser and is discarded after the interaction.

The product should not ask for broad Chrome permissions in the first version. Desktop files are handled only through explicit user drag-and-drop.

## Accessibility And Reduced Motion

The experience is visual and animated, but it still needs baseline accessibility.

Requirements:

- All controls have accessible names.
- Keyboard users can open text burn, sketch, avatar selection, and privacy note.
- A keyboard-accessible "burn" action exists for text and selected avatars.
- Reduced-motion mode keeps the scene usable with simpler fades and fewer particles.
- Text contrast on glass controls meets readable contrast against the current ambience.
- Touch targets remain at least 44 px.

## First-Version Scope

Build the local Chrome extension full-screen page with these visual and interaction priorities:

1. Full-screen hearth scene with responsive ambience.
2. Animated fire with action-triggered surge.
3. Text burn with fragment animation.
4. Desktop file drop with local icon burn effect.
5. Sketch canvas with toss-to-burn interaction.
6. Draggable symbolic avatars.
7. Ash and ember particle feedback.
8. Fire-emergent feedback copy.
9. Minimal local-only privacy indicator.

Out of scope for the first version:

- Supabase, Vercel, or any remote service.
- Accounts, saved histories, sync, and analytics.
- AI-generated copy that sends user content to a remote model.
- Reading webpage content automatically.
- Browser history, tab, download, or clipboard-wide permissions.

## Success Criteria

The design succeeds when:

- Opening the extension immediately feels like entering a private hearth.
- Dropping or burning something creates an obvious physical fire response.
- Users can understand the main interaction without a tutorial.
- The interface does not feel like a dashboard.
- Privacy claims are true in the implementation, not only visual copy.
- Refreshing clears the emotional residue.
