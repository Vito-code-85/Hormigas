// Panel de puntuación en la parte superior del juego

interface PropiedadesMarcador {
  puntos: number
  nivel: number
  hormigasMatadas: number
  hormigasAMatar: number
  hormigasEnAlimento: number
  vidasPermitidas: number
}

export default function ScoreDisplay({
  puntos,
  nivel,
  hormigasMatadas,
  hormigasAMatar,
  hormigasEnAlimento,
  vidasPermitidas,
}: PropiedadesMarcador) {
  const vidasRestantes = vidasPermitidas - hormigasEnAlimento

  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2"
      style={{ background: 'rgba(0,0,0,0.45)' }}
    >
      {/* Puntuación */}
      <div className="text-white">
        <div className="text-xs opacity-70">Puntos</div>
        <div className="text-xl font-black tabular-nums">{puntos.toLocaleString('es-ES')}</div>
      </div>

      {/* Progreso de la pantalla */}
      <div className="text-white text-center">
        <div className="text-xs opacity-70">Pantalla {nivel}</div>
        <div className="text-lg font-bold tabular-nums">
          {hormigasMatadas} / {hormigasAMatar} 🐜
        </div>
      </div>

      {/* Vidas restantes */}
      <div className="text-white text-right">
        <div className="text-xs opacity-70">Vidas</div>
        <div className="text-xl font-black">
          {Array.from({ length: vidasPermitidas }).map((_, i) => (
            <span key={i} style={{ opacity: i < vidasRestantes ? 1 : 0.2 }}>
              ❤️
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
