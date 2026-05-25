// Un alimento sobre el mantel
// Si las hormigas llegan aquí el jugador pierde una vida

import { DatosAlimento } from '@/lib/types'

interface PropiedadesAlimento {
  alimento: DatosAlimento
}

export default function FoodItem({ alimento }: PropiedadesAlimento) {
  return (
    <div
      className="absolute select-none pointer-events-none"
      style={{
        left: alimento.x,
        top: alimento.y,
        transform: 'translate(-50%, -50%)',
        fontSize: '2.2rem',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
        zIndex: 5,
      }}
    >
      {alimento.emoji}
      {/* Zona de peligro semitransparente alrededor del alimento */}
      <div
        className="absolute rounded-full bg-red-400/20 border-2 border-red-400/40"
        style={{
          width: 76,
          height: 76,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      />
    </div>
  )
}
