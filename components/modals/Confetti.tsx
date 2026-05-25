'use client'

// Lanza confetti en la pantalla cuando el jugador entra en el Top 10
// Usa la librería canvas-confetti que es muy sencilla

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti() {
  useEffect(() => {
    // Lanzamos confetti desde ambos lados de la pantalla
    const lanzarIzquierda = () =>
      confetti({
        particleCount: 80,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'],
      })

    const lanzarDerecha = () =>
      confetti({
        particleCount: 80,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'],
      })

    // Primera ráfaga inmediata
    lanzarIzquierda()
    lanzarDerecha()

    // Segunda ráfaga a los 600ms
    const timer = setTimeout(() => {
      lanzarIzquierda()
      lanzarDerecha()
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // Este componente no renderiza nada visual (el confetti usa un canvas propio)
  return null
}
