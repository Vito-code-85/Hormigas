'use client'

// Modal de fin de juego: muestra posición en ranking, pide nombre si entró en Top 10

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import UsernameModal from './UsernameModal'
import { EntradaPuntuacion } from '@/lib/types'
import { OPCIONES_DIFICULTAD } from '@/lib/gameConfig'

interface PropiedadesFinJuego {
  puntos: number
  pantalla: number
  dificultad: number
}

export default function GameOverModal({ puntos, pantalla, dificultad }: PropiedadesFinJuego) {
  const enrutador = useRouter()
  const [posicionRanking, setPosicionRanking] = useState<number | null>(null)
  const [guardado, setGuardado] = useState(false)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    const comprobarRanking = async () => {
      try {
        const respuesta = await fetch('/api/puntuaciones')
        const datos: EntradaPuntuacion[] = await respuesta.json()

        const posicion = datos.findIndex((e) => puntos > e.puntos)
        if (posicion !== -1) {
          setPosicionRanking(posicion + 1)
        } else if (datos.length < 10) {
          setPosicionRanking(datos.length + 1)
        } else {
          setPosicionRanking(0)
        }
      } catch {
        setPosicionRanking(0)
      }
    }
    comprobarRanking()
  }, [puntos])

  const guardarPuntuacion = async (nombre: string) => {
    setGuardando(true)
    try {
      await fetch('/api/puntuaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, puntos, pantalla, dificultad }),
      })
    } catch {
      // Continuamos aunque falle el guardado
    } finally {
      setGuardando(false)
      setGuardado(true)
    }
  }

  const volverInicio = () => enrutador.push('/')

  const estaEnTop10 = posicionRanking !== null && posicionRanking > 0 && posicionRanking <= 10
  const etiquetaDificultad = OPCIONES_DIFICULTAD.find((d) => d.valor === dificultad)?.etiqueta ?? ''

  if (posicionRanking === null) {
    return (
      <Modal>
        <div className="p-8 text-center">
          <div className="text-4xl mb-3 animate-bounce">🐜</div>
          <p className="text-gray-500">Comprobando tu posición...</p>
        </div>
      </Modal>
    )
  }

  if (estaEnTop10 && !guardado) {
    return (
      <UsernameModal
        posicion={posicionRanking}
        puntos={puntos}
        pantalla={pantalla}
        dificultad={dificultad}
        alGuardar={guardarPuntuacion}
      />
    )
  }

  return (
    <Modal>
      <div className="p-6 text-center">
        <div className="text-5xl mb-3">{estaEnTop10 ? '🏆' : '😓'}</div>
        <h2 className="text-2xl font-black text-gray-800 mb-1">
          {estaEnTop10 ? '¡Buen juego!' : 'Fin del juego'}
        </h2>

        <div className="bg-amber-50 rounded-xl p-4 mb-4 text-left space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Puntuación</span>
            <span className="font-black text-amber-700">{puntos.toLocaleString('es-ES')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pantalla</span>
            <span className="font-bold">{pantalla}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dificultad</span>
            <span className="font-bold">{etiquetaDificultad}</span>
          </div>
          {estaEnTop10 && (
            <div className="flex justify-between border-t pt-1 mt-1">
              <span className="text-gray-500">Posición ranking</span>
              <span className="font-black text-green-600">#{posicionRanking}</span>
            </div>
          )}
          {posicionRanking === 0 && (
            <p className="text-center text-gray-400 text-sm pt-1 border-t">
              No has entrado en el Top 10. ¡Inténtalo de nuevo!
            </p>
          )}
        </div>

        {guardando && (
          <p className="text-amber-600 text-sm mb-3 animate-pulse">Guardando puntuación...</p>
        )}

        <Button tamaño="grande" onClick={volverInicio} className="w-full">
          🏠 Ver clasificación actualizada
        </Button>
      </div>
    </Modal>
  )
}
