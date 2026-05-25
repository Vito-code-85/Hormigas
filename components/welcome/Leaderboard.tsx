'use client'

// Marcador global: muestra los 10 jugadores con más puntuación

import { useLeaderboard } from '@/hooks/useLeaderboard'
import LeaderboardEntry from './LeaderboardEntry'

export default function Leaderboard() {
  const { puntuaciones, cargando, error, recargar } = useLeaderboard()

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-amber-900 text-lg">🏆 Mejores jugadores</h2>
        <button
          onClick={recargar}
          className="text-amber-600 text-sm hover:underline"
          disabled={cargando}
        >
          {cargando ? 'Cargando...' : '↻ Actualizar'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center py-4">{error}</p>
      )}

      {!error && puntuaciones.length === 0 && !cargando && (
        <p className="text-gray-400 text-sm text-center py-6">
          ¡Aún no hay puntuaciones! Sé el primero 🐜
        </p>
      )}

      <div className="flex flex-col gap-2">
        {puntuaciones.map((entrada, indice) => (
          <LeaderboardEntry key={entrada.id} entrada={entrada} posicion={indice + 1} />
        ))}
      </div>
    </div>
  )
}
