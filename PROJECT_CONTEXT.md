# Project Context & Architecture Decisions

## Portofolio Angga (`porto-next`)

### Hero Layout Standards

#### 1. Desktop Layout (`min-width: 769px`)
- **Composition**:
  - Left column (`.hero-left-box`): Greeting, Name, Role, Bio summary, Buttons (`.hero-actions-group` flex row), Location.
  - Portrait (`.profile-wrap`) at `left: calc(50% + 350px)` and Floating Terminal (`.hero-term-badge`) at `left: calc(50% + 40px)`: Shifted further to the right preserving the relative 310px distance between them.
  - Radar circles (`.concentric-circles`): Shifted alongside portrait to `left: calc(50% + 350px)` to maintain concentric halo effect behind head.
  - Buttons subgroup (`.hero-actions-subgroup`): Uses `display: contents;` on desktop so all three buttons align horizontally in a single flex row without modifying desktop styling.

#### 2. Mobile Layout (`max-width: 768px`)
- **Viewport Target**: 360px to 420px widths (Android & iOS).
- **Portrait Framing**:
  - Centered horizontally, anchored below navbar (`top: 56px`), height capped at `48vh` / `max-height: 420px`.
  - Subtle bottom gradient mask (`linear-gradient(to bottom, black 0%, black 72%, transparent 98%)`) provides a smooth visual blend into the background watermark marquee.
- **Button Grid Architecture**:
  - Container `.hero-actions-group`: `display: flex; flex-direction: column; width: 100%; gap: 8px;`
  - Primary button (`.hero-btn-action--primary`): Full width (`width: 100%`) for a prominent thumb touch target.
  - Secondary buttons subgroup (`.hero-actions-subgroup`): 2-column grid `display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; width: 100%;`
  - Secondary buttons: `font-size: 11.5px; padding: 9.5px 8px; text-align: center; justify-content: center;`
  - Result: 100% overflow-free layout across all mobile resolutions down to 320px screen width.
- **Typography & Content**:
  - Bio summary (`.hero-bio-summary`): Shown on mobile (`display: block; font-size: 12px; line-height: 1.45; max-width: 100%;`) to provide immediate context without clutter.

### Deployments
- **VPS PM2 Service**: `porto-next` on `45.66.153.146:20132` (`/var/www/porto-next`).
- **Cloudflare Pages / OpenNext**: Live at [anggot.my.id](https://anggot.my.id/).
