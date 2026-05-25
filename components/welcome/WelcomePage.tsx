'use client'

// Pantalla de bienvenida: título, explicación, dificultad, marcador y botón de inicio

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameTitle from './GameTitle'
import GameDescription from './GameDescription'
import DifficultySelector from './DifficultySelector'
import Leaderboard from './Leaderboard'
import Button from '@/components/ui/Button'
import { Dificultad } from '@/lib/types'

export default function WelcomePage() {
  const enrutador = useRouter()
  const [dificultad, setDificultad] = useState<Dificultad>(3)

  const comenzarJuego = () => {
    // Pasamos la dificultad como parámetro en la URL.
    // Así, visitar /jugar sin ?d= siempre redirige a la pantalla de inicio,
    // evitando que el juego arranque solo por tener el localStorage de una sesión anterior.
    enrutador.push(`/jugar?d=${dificultad}`)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-700 via-green-600 to-green-700">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col bg-white/95 shadow-2xl">
        <GameTitle />
        <GameDescription />

        <div className="my-4">
          <DifficultySelector seleccionada={dificultad} alCambiar={setDificultad} />
        </div>

        <div className="flex justify-center py-4">
          <Button tamaño="grande" onClick={comenzarJuego}>
            🐜 Comenzar juego
          </Button>
        </div>

        <div className="border-t border-amber-100 mx-4" />

        <div className="py-4 pb-8">
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}
