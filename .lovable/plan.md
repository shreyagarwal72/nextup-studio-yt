## Goal

Re-accent the neumorphic UI to a **red family** (aligned with the YouTube/Nextup brand) and reduce the monotone flat-grey look by warming the base surface and layering subtle depth textures — without abandoning the soft UI system.

## Color changes (`src/index.css` tokens)

- **Primary** (violet → red): `#6C63FF` → `#E63946` (`hsl(354 82% 57%)`), glow `#FF6B7A`.
- **Accent** (teal → warm coral): `#38B2AC` → `#F4A261` (`hsl(27 87% 67%)`) for secondary highlights.
- **Background** (cool grey → warm blush-tinted grey): `#E0E5EC` → `#E8E1E1` (`hsl(0 15% 90%)`) — still monochromatic, but warm.
- **Foreground** stays dark blue-grey (AA contrast preserved), slightly warmed to `hsl(210 15% 26%)`.
- **Muted foreground** adjusted to `hsl(0 6% 46%)` (AA on new bg).
- **Shadow-dark rgb**: `163,177,198` → `189,170,170` — a warmer shadow tone that matches the new surface.
- Legacy `--youtube-red` unified with new primary so old references stay consistent.

## Reducing the "flat plane" feel

Layer subtle, low-cost depth so the background reads as a material, not a fill:

1. **Ambient gradient wash** on `body`: very soft radial highlight top-left + red-tinted glow bottom-right, ~4–6% opacity. Fixed, no scroll cost.
2. **Grain overlay** (`::before` on body): SVG noise data-URI at ~3% opacity for tactile texture. Pointer-events none.
3. **Accent aura wells** in Hero: convert one decorative orb to a red-glow variant using a soft `radial-gradient` inside a `neu-inset` circle.
4. **Card accents**: add a 1px inner top highlight line to `.neu-card` using a linear-gradient border trick — makes cards read as sculpted, not stamped.
5. **Icon wells** for primary CTAs get a subtle red tint (`rgba(230,57,70,0.08)` inside the well) so the primary color threads through the layout.

## Component touch-ups

- **Hero**: parallax orb C becomes the red-glow aura orb. Primary button already uses `--primary` (auto).
- **ChannelStats / Achievements / VideoShowcase**: `text-primary` accents automatically become red. Error/retry icons keep primary tint (now red) which reads correctly for alerts.
- **Sidebar**: active nav dot + icon well tint automatically shift to red — visually reads as "live channel" cue.
- **404**: `404` numeral + CTA switch to red automatically.

## Non-goals (guardrails)

- Keep neumorphism: no borders, no drop-shadow-only cards, no flat fills replacing soft UI.
- Do not introduce dark mode changes here.
- Do not touch layout, copy, features, or the parallax/loading/error work just added.

## Files touched

- `src/index.css` — token swap, body gradient + grain, `.neu-card` inner highlight, new `.neu-accent-well` utility.
- `src/components/Hero.tsx` — one decorative orb switched to accent-aura variant.

## Preview note

If you'd rather see three rendered visual directions for the red palette + depth treatment before I commit, say the word and I'll capture the current hero and generate design directions to pick from.
