// Hormiga SVG con animación de marcha real (movimiento trípode de insecto)
//
// Las hormigas reales usan el "movimiento trípode":
//   Grupo A: pata delantera izquierda + central derecha + trasera izquierda
//   Grupo B: pata delantera derecha + central izquierda + trasera derecha
// Los dos grupos se alternan: mientras A avanza, B se planta, y viceversa.
//
// El SVG está centrado en (0,0) = centro del tórax, con la cabeza apuntando
// hacia -Y (arriba). Así, cuando GameScreen rota el div, la hormiga mira
// hacia donde se mueve.

export default function HormigaSVG() {
  return (
    <svg
      viewBox="-22 -30 44 68"
      width="44"
      height="68"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* ── Antenas ─────────────────────────────────────────────────────── */}
      {/* La clase "hormiga-antena-izq/der" en globals.css las hace oscilar */}
      <g className="hormiga-antena-izq">
        <line
          x1="-3" y1="-15"
          x2="-13" y2="-27"
          stroke="#2d1a0e" strokeWidth="1.2" strokeLinecap="round"
        />
        <circle cx="-13" cy="-27" r="1.8" fill="#3d1f0a" />
      </g>
      <g className="hormiga-antena-der">
        <line
          x1="3" y1="-15"
          x2="13" y2="-27"
          stroke="#2d1a0e" strokeWidth="1.2" strokeLinecap="round"
        />
        <circle cx="13" cy="-27" r="1.8" fill="#3d1f0a" />
      </g>

      {/* ── Cabeza ───────────────────────────────────────────────────────── */}
      <ellipse cx="0" cy="-11" rx="6.5" ry="6" fill="#3d1f0a" />
      {/* Mandíbulas */}
      <line x1="-5" y1="-9" x2="-9" y2="-7" stroke="#2d1a0e" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="5" y1="-9" x2="9" y2="-7" stroke="#2d1a0e" strokeWidth="1.3" strokeLinecap="round" />
      {/* Ojos (puntos rojos pequeños) */}
      <circle cx="-4" cy="-12" r="1.3" fill="#991b1b" />
      <circle cx="4" cy="-12" r="1.3" fill="#991b1b" />

      {/* ── Tórax ────────────────────────────────────────────────────────── */}
      <ellipse cx="0" cy="0" rx="4.5" ry="5.5" fill="#4a2510" />

      {/* ── Patas grupo A (trípode 1): delantera-izq + central-der + trasera-izq ── */}
      {/*
          Las tres patas de este grupo se mueven a la vez hacia adelante.
          La clase "hormiga-patas-a" en globals.css las rota ±12° sobre el tórax.
          El bounding box de estas 3 líneas está centrado en (0,0), así que
          transform-origin: 50% 50% con transform-box: fill-box rota sobre el tórax.
      */}
      <g className="hormiga-patas-a">
        {/* Delantera izquierda: tórax (-4,-4) → punta (-17,-7) */}
        <line x1="-4" y1="-4" x2="-17" y2="-7" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
        {/* Central derecha: tórax (4,0) → punta (17,0) */}
        <line x1="4" y1="0" x2="17" y2="0" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
        {/* Trasera izquierda: tórax (-4,4) → punta (-17,7) */}
        <line x1="-4" y1="4" x2="-17" y2="7" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Patas grupo B (trípode 2): delantera-der + central-izq + trasera-der ── */}
      {/* Opuesto al grupo A: cuando A avanza, B retrocede */}
      <g className="hormiga-patas-b">
        {/* Delantera derecha: tórax (4,-4) → punta (17,-7) */}
        <line x1="4" y1="-4" x2="17" y2="-7" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
        {/* Central izquierda: tórax (-4,0) → punta (-17,0) */}
        <line x1="-4" y1="0" x2="-17" y2="0" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
        {/* Trasera derecha: tórax (4,4) → punta (17,7) */}
        <line x1="4" y1="4" x2="17" y2="7" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Pecíolo (cintura estrecha entre tórax y abdomen) ─────────────── */}
      <ellipse cx="0" cy="8" rx="2.5" ry="2.8" fill="#2d1a0e" />

      {/* ── Abdomen ──────────────────────────────────────────────────────── */}
      <ellipse cx="0" cy="21" rx="8.5" ry="12" fill="#3d1f0a" />
      {/* Segmentos del abdomen (líneas horizontales sutiles) */}
      <line x1="-7" y1="16" x2="7" y2="16" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      <line x1="-8" y1="21" x2="8" y2="21" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      <line x1="-6" y1="27" x2="6" y2="27" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      {/* Brillo para dar volumen */}
      <ellipse cx="-2" cy="18" rx="3" ry="4" fill="rgba(255,255,255,0.07)" />
    </svg>
  )
}
