import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// An empty music room at golden hour, painted rather than drawn: magenta shade on
// the left, sun pouring in from the right, dust hanging in the light, a few cool glints.
const { theme, problems } = makeColors({
  label: 'Sunlit Music Room',
  roles: {
    accent: '#c8408f',
    danger: '#e0483a',
    success: '#3f9d6b',
    warning: '#d99a1e',
    pro: '#6a5bd6',
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f6e6e3',
        'surface-1': '#faefea',
        'surface-2': '#fff7f1',
        'text-primary': '#2d1a2a',
        'text-secondary': '#5a3a52',
        'text-muted': '#74506a',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1a1020',
        'surface-1': '#22152a',
        'surface-2': '#291a32',
        'surface-3': '#2e1e38',
        'text-primary': '#fbeef0',
        'text-secondary': '#e0c6d2',
        'text-muted': '#bfa0b2',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  // No colored veil behind the text: panels only blur what's behind them.
  backdrop: { scene: 'sunlit-room', glass: { blur: 26, opacity: 0 } },
}

// Deterministic pseudo-random, so the scene is the same every load.
function rng(seed: number): () => number {
  let s = seed

  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296

    return s / 4294967296
  }
}

function dust(): string {
  // Soft bokeh: every speck is a radial fade, never a hard disc.
  const r = rng(424242)
  let out = ''

  for (let i = 0; i < 70; i++) {
    const x = Math.round(r() < 0.7 ? 700 + r() * 900 : r() * 700)
    const y = Math.round(r() * 900)
    const big = r() < 0.15
    const rad = (big ? 10 + r() * 22 : 2 + r() * 4).toFixed(1)
    const dur = (18 + r() * 26).toFixed(1)
    const tw = (3 + r() * 5).toFixed(1)
    const delay = (-r() * 40).toFixed(1)
    const fill = big ? 'url(#bokehBig)' : 'url(#bokeh)'
    out += `<g class="float" style="animation-duration:${dur}s;animation-delay:${delay}s"><circle class="mote" cx="${x}" cy="${y}" r="${rad}" fill="${fill}" style="animation-duration:${tw}s;animation-delay:${delay}s"/></g>`
  }

  return out
}

function windows(): string {
  // Tall windows on the right wall, as soft vertical washes of light.
  let out = ''

  for (let i = 0; i < 6; i++) {
    const x = 1320 + i * 46
    const top = 150 - i * 24
    const bottom = 580 + i * 34
    out += `<rect x="${x}" y="${top}" width="30" height="${bottom - top}" rx="12" fill="#fffbea" opacity="${(0.5 + i * 0.08).toFixed(2)}"/>`
  }

  return out
}

function floorPanes(): string {
  // Window-shaped pools of light across the floor, toward the lower left.
  let out = ''

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      const x = 1540 - col * 135 - row * 160
      const y = 650 + row * 85
      out += `<polygon points="${x},${y} ${x + 80},${y} ${x - 5},${y + 62} ${x - 85},${y + 62}"/>`
    }
  }

  return out
}

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
  .float { animation-name: drift; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }
  @keyframes drift { from { transform: translate(0,0); } to { transform: translate(-40px,-70px); } }
  .mote { animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }
  @keyframes twinkle { from { opacity: .2; } to { opacity: .9; } }
  .breathe { animation: breathe 10s ease-in-out infinite alternate; }
  .b2 { animation-duration: 14s; animation-delay: -5s; }
  .b3 { animation-duration: 12s; animation-delay: -8s; }
  @keyframes breathe { from { opacity: .45; } to { opacity: .95; } }
  .haze { animation: wander 34s ease-in-out infinite alternate; }
  .h2 { animation-duration: 41s; animation-delay: -12s; }
  .h3 { animation-duration: 29s; animation-delay: -20s; }
  @keyframes wander { from { transform: translate(-50px,20px); } to { transform: translate(60px,-30px); } }
  .glint { animation: flicker 7s ease-in-out infinite; }
  .g2 { animation-duration: 9.5s; animation-delay: -3s; }
  .g3 { animation-duration: 12s; animation-delay: -6s; }
  @keyframes flicker { 0%,100% { opacity: .7; } 40% { opacity: .15; } 55% { opacity: .85; } 75% { opacity: .35; } }
  .dusk { opacity: 0; }
  @media (prefers-color-scheme: dark) { .dusk { opacity: .75; mix-blend-mode: multiply; } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
<defs>
  <linearGradient id="room" x1="0" y1="0" x2="1" y2=".55">
    <stop offset="0" stop-color="#6a2a86"/>
    <stop offset=".3" stop-color="#c2509e"/>
    <stop offset=".55" stop-color="#ee9ab0"/>
    <stop offset=".78" stop-color="#ffd89a"/>
    <stop offset="1" stop-color="#fff4d6"/>
  </linearGradient>
  <linearGradient id="ceiling" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4b1f6e" stop-opacity=".7"/>
    <stop offset=".35" stop-color="#7a3a8e" stop-opacity=".22"/>
    <stop offset=".65" stop-color="#7a3a8e" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="floorWarm" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#d23a5a" stop-opacity=".5"/>
    <stop offset=".5" stop-color="#ff9a5a" stop-opacity=".22"/>
    <stop offset="1" stop-color="#fff0c0" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="floorFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".3" stop-color="#fff" stop-opacity="1"/>
  </linearGradient>
  <mask id="floorMask"><rect y="540" width="1600" height="360" fill="url(#floorFade)"/></mask>
  <linearGradient id="shaft" x1="1" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fffbe6" stop-opacity=".85"/>
    <stop offset=".6" stop-color="#ffe7a8" stop-opacity=".3"/>
    <stop offset="1" stop-color="#ffd0a0" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="sun" cx=".93" cy=".25" r=".5">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".95"/>
    <stop offset=".4" stop-color="#fff3c8" stop-opacity=".5"/>
    <stop offset="1" stop-color="#fff3c8" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="leak" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".8"/>
    <stop offset="1" stop-color="#ffd6ef" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bokeh" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#fffdf0" stop-opacity="1"/>
    <stop offset=".45" stop-color="#fff5d8" stop-opacity=".55"/>
    <stop offset="1" stop-color="#fff5d8" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bokehBig" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#fff8e8" stop-opacity=".35"/>
    <stop offset=".7" stop-color="#ffe0f0" stop-opacity=".15"/>
    <stop offset="1" stop-color="#ffe0f0" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glintG" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#bfe6ff" stop-opacity=".9"/>
    <stop offset="1" stop-color="#7fb4ff" stop-opacity="0"/>
  </radialGradient>

  <!-- brush: ragged, bleeding edges, like paint on damp paper -->
  <filter id="brushWide" x="-30%" y="-30%" width="160%" height="160%">
    <feTurbulence type="fractalNoise" baseFrequency=".008" numOctaves="3" seed="11" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="90" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="30"/>
  </filter>
  <filter id="brush" x="-30%" y="-30%" width="160%" height="160%">
    <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="5" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="45" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="14"/>
  </filter>
  <filter id="haze" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  <filter id="glow" x="-100%" y="-300%" width="300%" height="700%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="wash" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".004 .007" numOctaves="4" seed="3"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 .82  0 0 0 0 .93  0 0 0 .55 -.12"/>
    <feGaussianBlur stdDeviation="6"/>
  </filter>
  <filter id="pigment" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="4" seed="21"/>
    <feColorMatrix values="0 0 0 0 .78  0 0 0 0 .22  0 0 0 0 .45  0 0 0 .7 -.3"/>
    <feGaussianBlur stdDeviation="4"/>
  </filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/>
    <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .4  0 0 0 0 .5  0 0 0 .5 0"/>
  </filter>
</defs>

<rect width="1600" height="900" fill="url(#room)"/>
<rect width="1600" height="900" fill="url(#ceiling)"/>
<rect y="520" width="1600" height="380" fill="url(#floorWarm)"/>

<!-- watercolor: pale blooms and darker pigment pooling, still -->
<rect width="1600" height="900" filter="url(#wash)"/>
<rect width="1600" height="900" filter="url(#pigment)" opacity=".35"/>

<!-- drifting haze -->
<g filter="url(#haze)">
  <ellipse class="haze" cx="300" cy="380" rx="340" ry="220" fill="#e65aa8" opacity=".35"/>
  <ellipse class="haze h2" cx="900" cy="250" rx="400" ry="170" fill="#b06ad8" opacity=".25"/>
  <ellipse class="haze h3" cx="1150" cy="700" rx="440" ry="230" fill="#ffe6a0" opacity=".45"/>
</g>

<!-- windows, sun and light, all painted soft -->
<g filter="url(#brush)">${windows()}</g>
<rect width="1600" height="900" fill="url(#sun)" class="breathe"/>
<g filter="url(#brushWide)">
  <polygon class="breathe" points="1330,140 1460,90 900,900 520,900" fill="url(#shaft)"/>
  <polygon class="breathe b2" points="1480,80 1600,60 1350,900 1020,900" fill="url(#shaft)"/>
  <polygon class="breathe b3" points="1360,300 1420,280 650,900 470,900" fill="url(#shaft)" opacity=".6"/>
</g>
<g mask="url(#floorMask)"><g class="breathe b2" filter="url(#brush)" fill="#fff6d0" opacity=".85">${floorPanes()}</g></g>

<!-- light leaks at the edges -->
<ellipse class="breathe" cx="40" cy="470" rx="300" ry="60" fill="url(#leak)" opacity=".7"/>
<ellipse cx="1590" cy="40" rx="260" ry="200" fill="url(#leak)" opacity=".55"/>

<!-- cool glints, a hint of something not quite human -->
<g filter="url(#glow)">
  <ellipse class="glint" cx="645" cy="214" rx="55" ry="7" fill="url(#glintG)"/>
  <ellipse class="glint g2" cx="1320" cy="286" rx="110" ry="9" fill="url(#glintG)"/>
  <ellipse class="glint g3" cx="482" cy="866" rx="10" ry="26" fill="url(#glintG)"/>
</g>

${dust()}

<!-- paper grain, still -->
<rect width="1600" height="900" filter="url(#grain)" opacity=".08"/>

<!-- in dark mode, the same room just after sunset -->
<rect class="dusk" width="1600" height="900" fill="#5a3478"/>
</svg>`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={SCENE}
        alt="An empty music room at golden hour, painted soft: sunlight pours through tall windows, dust drifts in the beams, magenta shade fills the far side"
        isInteractive
      />
    )
  })
}
