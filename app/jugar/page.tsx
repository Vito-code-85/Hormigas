'use client'

// Página del juego (/jugar)
// Lee la dificultad del parámetro de URL ?d=N (no del localStorage).
// Si no hay parámetro o es inválido, redirige a la pantalla de inicio.

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import GameScreen from '@/components/game/GameScreen'
import GameOverModal from '@/components/modals/GameOverModal'
import { Dificultad } from '@/lib/types'

// Separamos la lógica en un componente hijo porque useSearchParams()
// requiere que su componente padre esté envuelto en <Suspense>
function ContenidoJugar() {
  const parametros = useSearchParams()
  const enrutador = useRouter()

  const [dificultad, setDificultad] = useState<Dificultad | null>(null)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [puntosFinales, setPuntosFinales] = useState(0)
  const [pantallaFinal, setPantallaFinal] = useState(1)

  useEffect(() => {
    // Leemos la dificultad del parámetro ?d= de la URL
    const param = parametros.get('d')
    if (param) {
      const valor = parseInt(param, 10)
      if (valor >= 1 && valor <= 5) {
        setDificultad(valor as Dificultad)
        return
      }
    }
    // Sin parámetro válido → volvemos a la pantalla de inicio
    enrutador.replace('/')
  }, [parametros, enrutador])

  const handleTerminarJuego = (puntos: number, pantalla: number) => {
    setPuntosFinales(puntos)
    setPantallaFinal(pantalla)
    setJuegoTerminado(true)
  }

  if (!dificultad) return null

  return (
    <>
      {!juegoTerminado && (
        <GameScreen dificultad={dificultad} alTerminarJuego={handleTerminarJuego} />
      )}
      {juegoTerminado && (
        <div className="h-full bg-green-900">
          <GameOverModal
            puntos={puntosFinales}
            pantalla={pantallaFinal}
            dificultad={dificultad}
          />
        </div>
      )}
    </>
  )
}

// El Suspense es necesario porque useSearchParams() lee parámetros dinámicos
export default function PaginaJugar() {
  return (
    <Suspense fallback={null}>
      <ContenidoJugar />
    </Suspense>
  )
}
