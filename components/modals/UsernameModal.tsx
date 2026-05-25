'use client'

// Modal para introducir el nombre de usuario cuando el jugador entra en el Top 10

import { useState, useRef, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Confetti from './Confetti'
import { contienePalabrasProhibidas } from '@/lib/profanityFilter'

interface PropiedadesModalNombre {
  posicion: number
  puntos: number
  pantalla: number
  dificultad: number
  alGuardar: (nombre: string) => void
}

export default function UsernameModal({
  posicion,
  puntos,
  pantalla,
  dificultad,
  alGuardar,
}: PropiedadesModalNombre) {
  const [nombre, setNombre] = useState('')
  const [aviso, setAviso] = useState('')
  const refInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    refInput.current?.focus()
  }, [])

  const handleGuardar = () => {
    const nombreFinal = nombre.trim() || 'Anonimo'
    if (contienePalabrasProhibidas(nombre)) {
      setAviso('Ese nombre no está permitido. Se guardará como "Anonimo".')
      setTimeout(() => alGuardar('Anonimo'), 1500)
      return
    }
    alGuardar(nombreFinal)
  }

  return (
    <Modal>
      <Confetti />
      <div className="p-6 text-center">
        <div className="text-5xl mb-2">🏆</div>
        <h2 className="text-2xl font-black text-amber-700 mb-1">¡Estás en el Top 10!</h2>
        <p className="text-gray-500 mb-1">
          Has quedado en la posición <strong className="text-amber-600">#{posicion}</strong>
        </p>
        <p className="text-2xl font-black text-gray-800 mb-4">
          {puntos.toLocaleString('es-ES')} pts · Pantalla {pantalla}
        </p>

        <div className="mb-4 text-left">
          <label htmlFor="nombre-jugador" className="block text-sm font-medium text-gray-700 mb-1">
            Tu nombre de jugador (deja vacío para &quot;Anonimo&quot;):
          </label>
          <input
            ref={refInput}
            id="nombre-jugador"
            type="text"
            value={nombre}
            onChange={(e) => { setNombre(e.target.value.slice(0, 20)); setAviso('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleGuardar()}
            placeholder="Ej: MataHormigas99"
            maxLength={20}
            className="w-full border-2 border-amber-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-amber-500"
          />
          {aviso && <p className="text-red-500 text-sm mt-1">{aviso}</p>}
          <p className="text-gray-400 text-xs mt-1">{nombre.length}/20 caracteres</p>
        </div>

        <Button tamaño="grande" onClick={handleGuardar} className="w-full">
          Guardar y ver clasificación
        </Button>
      </div>
    </Modal>
  )
}
