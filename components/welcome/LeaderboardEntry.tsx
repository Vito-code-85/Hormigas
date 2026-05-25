// Una fila del marcador global

import { EntradaPuntuacion } from '@/lib/types'
import { OPCIONES_DIFICULTAD } from '@/lib/gameConfig'

interface PropiedadesEntrada {
  entrada: EntradaPuntuacion
  posicion: number
}

const ESTILOS_POSICION: Record<number, string> = {
  1: 'bg-yellow-50 border-yellow-400 shadow-yellow-100 shadow-md',
  2: 'bg-gray-50 border-gray-300',
  3: 'bg-orange-50 border-orange-300',
}

const MEDALLAS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function LeaderboardEntry({ entrada, posicion }: PropiedadesEntrada) {
  const estiloFila = ESTILOS_POSICION[posicion] ?? 'bg-white border-gray-100'
  const medalla = MEDALLAS[posicion] ?? `#${posicion}`

  const etiquetaDificultad =
    OPCIONES_DIFICULTAD.find((d) => d.valor === entrada.dificultad)?.etiqueta ?? '?'

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${estiloFila}
        ${posicion === 1 ? 'text-base' : 'text-sm'}
      `}
    >
      <span className={`font-black w-8 text-center shrink-0 ${posicion === 1 ? 'text-2xl' : 'text-lg'}`}>
        {medalla}
      </span>
      <span className={`flex-1 font-semibold truncate ${posicion === 1 ? 'text-lg' : ''}`}>
        {entrada.nombre}
      </span>
      <span className="font-black text-amber-700 tabular-nums">
        {entrada.puntos.toLocaleString('es-ES')}
      </span>
      <span className="text-gray-400 text-xs shrink-0">
        P{entrada.pantalla} · {etiquetaDificultad}
      </span>
    </div>
  )
}
