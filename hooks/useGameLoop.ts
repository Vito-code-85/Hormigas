'use client'

// Hook que gestiona el bucle principal del juego
// Usa requestAnimationFrame para ejecutar una función ~60 veces por segundo

import { useEffect, useRef } from 'react'

export function useGameLoop(
  activo: boolean,
  alActualizarFrame: (marcaTiempo: number) => void
) {
  const rafRef = useRef<number | null>(null)

  // Guardamos la función en un ref para usar siempre la versión más reciente
  // sin necesidad de reiniciar el bucle cuando cambia
  const funcionRef = useRef(alActualizarFrame)
  funcionRef.current = alActualizarFrame

  useEffect(() => {
    if (!activo) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      return
    }

    const tick = (marcaTiempo: number) => {
      funcionRef.current(marcaTiempo)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [activo])
}
