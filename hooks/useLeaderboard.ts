'use client'

// Hook para obtener y refrescar el marcador global (top 10)

import { useState, useEffect } from 'react'
import { EntradaPuntuacion } from '@/lib/types'

export function useLeaderboard() {
  const [puntuaciones, setPuntuaciones] = useState<EntradaPuntuacion[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = async () => {
    setCargando(true)
    setError(null)
    try {
      const respuesta = await fetch('/api/puntuaciones')
      if (!respuesta.ok) throw new Error('Error al cargar')
      const datos: EntradaPuntuacion[] = await respuesta.json()
      setPuntuaciones(datos)
    } catch {
      setError('No se pudieron cargar las puntuaciones')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return { puntuaciones, cargando, error, recargar: cargar }
}
