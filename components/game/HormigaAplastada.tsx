// Hormiga aplastada que aparece durante 1 segundo en el lugar del click
// y luego desaparece con una animación de desvanecimiento

interface PropiedadesAplastada {
  x: number    // Posición horizontal donde fue matada
  y: number    // Posición vertical donde fue matada
  angulo: number  // Ángulo que tenía la hormiga al morir (mantiene su orientación)
}

export default function HormigaAplastada({ x, y, angulo }: PropiedadesAplastada) {
  return (
    // Posicionamos la hormiga aplastada exactamente donde estaba la viva
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        // Mantenemos la rotación que tenía la hormiga al morir
        transform: `translate(-50%, -50%) rotate(${angulo}deg)`,
        zIndex: 18,
      }}
    >
      {/*
        El div interior tiene dos animaciones:
        - El padre (este div) no anima transform para no interferir con la rotación
        - El hijo anima escala (efecto "splat") y opacidad (desvanecimiento)
      */}
      <div className="hormiga-aplastada-anim">
        <svg
          viewBox="-30 -24 60 48"
          width="60"
          height="48"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* ── Cuerpo aplastado ────────────────────────────────────────── */}
          {/* Cabeza aplastada */}
          <ellipse cx="0" cy="-12" rx="8" ry="4.5" fill="#1a0a04" />
          {/* Mandíbulas dobladas */}
          <line x1="-6" y1="-10" x2="-12" y2="-6" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="6" y1="-10" x2="12" y2="-6" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />

          {/* Tórax aplastado */}
          <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="#1a0a04" />

          {/* Pecíolo aplastado */}
          <ellipse cx="0" cy="8" rx="4" ry="2.2" fill="#1a0a04" />

          {/* Abdomen aplastado */}
          <ellipse cx="0" cy="18" rx="10" ry="5.5" fill="#1a0a04" />

          {/* ── Patas desparramadas en todas direcciones ─────────────── */}
          {/* Las patas se han salpicado al aplastarse */}
          {/* Pata delantera izquierda → se va hacia arriba-izquierda */}
          <line x1="-6" y1="-3" x2="-26" y2="-16" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          {/* Pata central izquierda → se va hacia la izquierda */}
          <line x1="-6" y1="0" x2="-28" y2="-2" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          {/* Pata trasera izquierda → se va hacia abajo-izquierda */}
          <line x1="-6" y1="3" x2="-24" y2="18" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          {/* Pata delantera derecha → se va hacia arriba-derecha */}
          <line x1="6" y1="-3" x2="26" y2="-16" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          {/* Pata central derecha → se va hacia la derecha */}
          <line x1="6" y1="0" x2="28" y2="-2" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />
          {/* Pata trasera derecha → se va hacia abajo-derecha */}
          <line x1="6" y1="3" x2="24" y2="18" stroke="#1a0a04" strokeWidth="1.4" strokeLinecap="round" />

          {/* Antenas dobladas por el impacto */}
          <line x1="-2" y1="-15" x2="-4" y2="-23" stroke="#1a0a04" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="2" y1="-15" x2="6" y2="-23" stroke="#1a0a04" strokeWidth="1.2" strokeLinecap="round" />

          {/* ── Manchas de salpicadura alrededor ─────────────────────── */}
          <circle cx="-24" cy="-20" r="2.8" fill="#1a0a04" opacity="0.5" />
          <circle cx="20"  cy="-19" r="2.2" fill="#1a0a04" opacity="0.48" />
          <circle cx="26"  cy="12"  r="2.4" fill="#1a0a04" opacity="0.45" />
          <circle cx="-23" cy="15"  r="2.0" fill="#1a0a04" opacity="0.45" />
          <circle cx="7"   cy="-22" r="1.6" fill="#1a0a04" opacity="0.4"  />
          <circle cx="-10" cy="22"  r="1.8" fill="#1a0a04" opacity="0.4"  />
          <circle cx="18"  cy="-8"  r="1.2" fill="#1a0a04" opacity="0.35" />
        </svg>
      </div>
    </div>
  )
}
