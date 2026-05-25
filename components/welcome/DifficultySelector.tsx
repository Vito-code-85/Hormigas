'use client'

import { useState } from 'react'
import { Dificultad } from '@/lib/types'
import { OPCIONES_DIFICULTAD } from '@/lib/gameConfig'

interface PropiedadesSelectorDificultad {
  seleccionada: Dificultad
  alCambiar: (dificultad: Dificultad) => void
}

export default function DifficultySelector({ seleccionada, alCambiar }: PropiedadesSelectorDificultad) {
  const [abierto, setAbierto] = useState(false)
  const opcion = OPCIONES_DIFICULTAD.find((o) => o.valor === seleccionada)!

  const elegir = (valor: Dificultad) => {
    alCambiar(valor)
    setAbierto(false)
  }

  return (
    <div className="px-4">
      <h2 className="text-center font-bold text-amber-900 mb-3">Nivel de dificultad</h2>

      {/* Opción seleccionada — toca para abrir el desplegable */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 border-2 border-amber-500 bg-amber-50 shadow-md text-left"
      >
        <span className={`font-bold text-base ${opcion.color}`}>{opcion.etiqueta}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">{opcion.descripcion}</span>
          <span className="text-amber-600">{abierto ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Resto de opciones, solo cuando está abierto */}
      {abierto && (
        <div className="mt-1 flex flex-col gap-1">
          {OPCIONES_DIFICULTAD.filter((o) => o.valor !== seleccionada).map((o) => (
            <button
              key={o.valor}
              onClick={() => elegir(o.valor as Dificultad)}
              className="flex items-center justify-between rounded-xl px-4 py-3 border-2 border-gray-200 bg-white hover:border-amber-300 active:scale-[0.98] transition-all text-left"
            >
              <span className={`font-bold text-base ${o.color}`}>{o.etiqueta}</span>
              <span className="text-gray-500 text-sm">{o.descripcion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
