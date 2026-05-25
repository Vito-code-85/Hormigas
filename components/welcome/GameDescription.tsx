'use client'

import { useState } from 'react'

export default function GameDescription() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl mx-4 text-sm text-amber-900 overflow-hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between px-4 py-3 font-bold text-base text-left"
      >
        <span>¿Cómo se juega?</span>
        <span className="text-amber-600 text-lg">{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto && (
        <ul className="px-4 pb-4 space-y-1.5 list-none border-t border-amber-200 pt-3">
          <li>🐜 Las hormigas aparecen por los bordes y van hacia tu comida</li>
          <li>👆 <strong>Toca/haz clic</strong> en las hormigas para matarlas</li>
          <li>🍬 Mata a todas las hormigas de la pantalla para avanzar</li>
          <li>⬆️ Cada pantalla tiene más comida y más hormigas</li>
          <li>⚠️ Si las hormigas tocan tu comida, ¡pierdes una vida!</li>
        </ul>
      )}
    </div>
  )
}
