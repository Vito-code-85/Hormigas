'use client'

// Pantalla principal del juego
// Gestiona hormigas, movimiento, colisiones, puntuación y transiciones de nivel

import { useState, useRef, useEffect, useCallback } from 'react'
import GameBackground from './GameBackground'
import FoodItem from './FoodItem'
import AntSprite from './AntSprite'
import HormigaAplastada from './HormigaAplastada'
import ScoreDisplay from './ScoreDisplay'
import { useGameLoop } from '@/hooks/useGameLoop'
import { DatosHormiga, DatosAlimento, Dificultad, EstadoJuego } from '@/lib/types'
import {
  CONFIG_JUEGO,
  obtenerHormigasAMatar,
  obtenerIntervaloAparicion,
  obtenerVelocidadHormiga,
} from '@/lib/gameConfig'
import { moverHormiga, obtenerPosicionBorde, obtenerPosicionesAlimento } from '@/lib/antMovement'

// Generamos IDs únicos para cada hormiga (evita colisiones de key en React)
let contadorHormigas = 0
function nuevoIdHormiga(): string {
  return `h-${++contadorHormigas}`
}

const BONUS = CONFIG_JUEGO.BONUS_PANTALLA

interface PropiedadesJuego {
  dificultad: Dificultad
  alTerminarJuego: (puntos: number, nivel: number) => void
}

export default function GameScreen({ dificultad, alTerminarJuego }: PropiedadesJuego) {
  const refContenedor = useRef<HTMLDivElement>(null)

  // ─── Estado React (provoca re-renders) ───────────────────────────────────
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('jugando')
  const [nivel, setNivel] = useState(1)
  const [puntos, setPuntos] = useState(0)
  const [hormigasMatadas, setHormigasMatadas] = useState(0)
  const [hormigasEnAlimento, setHormigasEnAlimento] = useState(0)
  const [idsHormigas, setIdsHormigas] = useState<string[]>([])
  const [alimentos, setAlimentos] = useState<DatosAlimento[]>([])
  // Lista de hormigas aplastadas: aparecen 1s en el lugar del click y desaparecen
  const [aplastadas, setAplastadas] = useState<{ id: string; x: number; y: number; angulo: number }[]>([])
  // Filtro rojo: true cuando alguna hormiga está peligrosamente cerca de una comida
  const [hayAmenaza, setHayAmenaza] = useState(false)

  // ─── Refs (se actualizan sin re-render, para el game loop a 60fps) ───────
  const refTimerMordida = useRef<ReturnType<typeof setTimeout> | null>(null)
  const refDatosHormigas = useRef<Map<string, DatosHormiga>>(new Map())
  const refElementosHormigas = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const refPuntos = useRef(0)
  const refHormigasMatadas = useRef(0)
  const refHormigasEnAlimento = useRef(0)
  const refNivel = useRef(1)
  const refAlimentos = useRef<DatosAlimento[]>([])
  const refEstado = useRef<EstadoJuego>('jugando')
  const refTotalAparecidas = useRef(0)
  const refUltimaAparicion = useRef(0)

  // ─── Inicializar una pantalla ─────────────────────────────────────────────
  const iniciarPantalla = useCallback((numPantalla: number) => {
    if (!refContenedor.current) return

    const { width, height } = refContenedor.current.getBoundingClientRect()
    const posiciones = obtenerPosicionesAlimento(numPantalla, width, height)

    const nuevosAlimentos: DatosAlimento[] = posiciones.map((pos, i) => ({
      id: `alimento-${i}`,
      x: pos.x,
      y: pos.y,
      emoji: CONFIG_JUEGO.EMOJIS_ALIMENTO[i % CONFIG_JUEGO.EMOJIS_ALIMENTO.length],
    }))

    setAlimentos(nuevosAlimentos)
    refAlimentos.current = nuevosAlimentos
    setIdsHormigas([])
    refDatosHormigas.current.clear()
    refElementosHormigas.current.clear()
    setHormigasMatadas(0)
    refHormigasMatadas.current = 0
    setHormigasEnAlimento(0)
    refHormigasEnAlimento.current = 0
    refTotalAparecidas.current = 0
    refUltimaAparicion.current = 0
    refNivel.current = numPantalla
  }, [])

  // ─── Hacer aparecer una hormiga desde el borde ───────────────────────────
  const aparecerHormiga = useCallback(() => {
    if (!refContenedor.current) return
    const hormigasNecesarias = obtenerHormigasAMatar(refNivel.current)

    if (refTotalAparecidas.current >= hormigasNecesarias) return
    if (refDatosHormigas.current.size >= CONFIG_JUEGO.MAX_HORMIGAS_EN_PANTALLA) return

    const { width, height } = refContenedor.current.getBoundingClientRect()
    const { x, y } = obtenerPosicionBorde(width, height)
    const indiceAlimento = Math.floor(Math.random() * refAlimentos.current.length)
    const id = nuevoIdHormiga()

    const nuevaHormiga: DatosHormiga = {
      id,
      x,
      y,
      indiceAlimento,
      velocidad: obtenerVelocidadHormiga(refNivel.current, refHormigasMatadas.current, obtenerHormigasAMatar(refNivel.current)),
      fase: Math.random() * Math.PI * 2,
      amplitud: CONFIG_JUEGO.AMPLITUD_ONDA * (0.75 + Math.random() * 0.5),
      angulo: 0,
    }

    refDatosHormigas.current.set(id, nuevaHormiga)
    refTotalAparecidas.current++
    setIdsHormigas((prev) => [...prev, id])
  }, [])

  // ─── Matar una hormiga (click del jugador) ────────────────────────────────
  const matarHormiga = useCallback((id: string) => {
    if (refEstado.current !== 'jugando') return

    const hormiga = refDatosHormigas.current.get(id)

    refDatosHormigas.current.delete(id)
    refElementosHormigas.current.delete(id)

    if (hormiga) {
      const idAplastada = `aplastada-${id}-${Date.now()}`
      setAplastadas((prev) => [...prev, { id: idAplastada, x: hormiga.x, y: hormiga.y, angulo: hormiga.angulo }])
      setTimeout(() => {
        setAplastadas((prev) => prev.filter((a) => a.id !== idAplastada))
      }, 1000)
    }

    const nuevosPuntos = refPuntos.current + CONFIG_JUEGO.PUNTOS_POR_HORMIGA
    refPuntos.current = nuevosPuntos
    setPuntos(nuevosPuntos)

    const nuevasMatadas = refHormigasMatadas.current + 1
    refHormigasMatadas.current = nuevasMatadas
    setHormigasMatadas(nuevasMatadas)

    setIdsHormigas((prev) => prev.filter((hId) => hId !== id))

    if (nuevasMatadas + refHormigasEnAlimento.current >= obtenerHormigasAMatar(refNivel.current)) {
      completarPantalla()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Completar pantalla ───────────────────────────────────────────────────
  const completarPantalla = useCallback(() => {
    if (refEstado.current !== 'jugando') return
    refEstado.current = 'pantallaCompleta'

    const bonusPantalla = BONUS * refNivel.current
    refPuntos.current += bonusPantalla
    setPuntos(refPuntos.current)
    setEstadoJuego('pantallaCompleta')
  }, [])

  // ─── Pausa de 3s cuando una hormiga muerde (no es la última vida) ────────
  const iniciarMordida = useCallback(() => {
    refEstado.current = 'hormigaMordiendo'
    setEstadoJuego('hormigaMordiendo')
    refTimerMordida.current = setTimeout(() => {
      refEstado.current = 'jugando'
      setEstadoJuego('jugando')
    }, 3000)
  }, [])

  // ─── Fin del juego ────────────────────────────────────────────────────────
  const terminarJuego = useCallback(() => {
    if (refEstado.current !== 'jugando') return
    if (refTimerMordida.current) clearTimeout(refTimerMordida.current)
    refEstado.current = 'finJuego'
    setEstadoJuego('finJuego')
  }, [])

  // ─── Avanzar a la siguiente pantalla ─────────────────────────────────────
  const avanzarPantalla = useCallback(() => {
    const siguiente = refNivel.current + 1
    refNivel.current = siguiente
    setNivel(siguiente)
    refEstado.current = 'jugando'
    setEstadoJuego('jugando')
    iniciarPantalla(siguiente)
  }, [iniciarPantalla])

  // ─── Bucle del juego (~60fps) ─────────────────────────────────────────────
  const alActualizarFrame = useCallback(
    (marcaTiempo: number) => {
      if (refEstado.current !== 'jugando') return
      if (refAlimentos.current.length === 0) return

      // Velocidad actualizada cada frame según kills del nivel actual
      const hormigasNecesarias = obtenerHormigasAMatar(refNivel.current)
      const velocidadFrame = obtenerVelocidadHormiga(
        refNivel.current,
        refHormigasMatadas.current,
        hormigasNecesarias
      )

      // Movemos cada hormiga y comprobamos si tocó cualquier alimento
      refDatosHormigas.current.forEach((hormiga, id) => {
        const alimento = refAlimentos.current[hormiga.indiceAlimento]
        if (!alimento) return

        const hormigaMovida = moverHormiga({ ...hormiga, velocidad: velocidadFrame }, alimento.x, alimento.y)
        refDatosHormigas.current.set(id, hormigaMovida)

        // Actualizamos posición y rotación directamente en el DOM (sin re-render)
        const elemento = refElementosHormigas.current.get(id)
        if (elemento) {
          elemento.style.left = `${hormigaMovida.x}px`
          elemento.style.top = `${hormigaMovida.y}px`
          elemento.style.transform = `translate(-50%, -50%) rotate(${hormigaMovida.angulo}deg)`
        }

        // Detectamos si la hormiga tocó CUALQUIER alimento (no solo su objetivo)
        const tocaComida = refAlimentos.current.some((comida) => {
          const dx = hormigaMovida.x - comida.x
          const dy = hormigaMovida.y - comida.y
          return Math.sqrt(dx * dx + dy * dy) < CONFIG_JUEGO.DISTANCIA_ALIMENTO
        })

        if (tocaComida) {
          refDatosHormigas.current.delete(id)
          refElementosHormigas.current.delete(id)
          setIdsHormigas((prev) => prev.filter((hId) => hId !== id))

          const totalEnAlimento = refHormigasEnAlimento.current + 1
          refHormigasEnAlimento.current = totalEnAlimento
          setHormigasEnAlimento(totalEnAlimento)

          if (totalEnAlimento >= dificultad) terminarJuego()
          else iniciarMordida()
        }
      })

      // Filtro rojo: true si alguna hormiga está dentro del radio de peligro de cualquier comida
      let peligro = false
      outer: for (const hormiga of refDatosHormigas.current.values()) {
        for (const comida of refAlimentos.current) {
          const dx = hormiga.x - comida.x
          const dy = hormiga.y - comida.y
          if (dx * dx + dy * dy < CONFIG_JUEGO.DISTANCIA_PELIGRO * CONFIG_JUEGO.DISTANCIA_PELIGRO) {
            peligro = true
            break outer
          }
        }
      }
      setHayAmenaza(peligro)

      // Aparición de nuevas hormigas
      const intervalo = obtenerIntervaloAparicion(refPuntos.current)
      if (marcaTiempo - refUltimaAparicion.current > intervalo) {
        refUltimaAparicion.current = marcaTiempo
        aparecerHormiga()
      }
    },
    [dificultad, aparecerHormiga, terminarJuego, iniciarMordida]
  )

  // Inicializar pantalla 1 al montar el componente
  useEffect(() => {
    iniciarPantalla(1)
    return () => { if (refTimerMordida.current) clearTimeout(refTimerMordida.current) }
  }, [iniciarPantalla])

  // El bucle solo corre mientras el estado es "jugando"
  useGameLoop(estadoJuego === 'jugando', alActualizarFrame)

  const hormigasAMatar = obtenerHormigasAMatar(nivel)

  const vidasRestantes = dificultad - hormigasEnAlimento

  return (
    <div
      ref={refContenedor}
      className="relative w-full h-screen overflow-hidden"
      style={{ cursor: 'default', userSelect: 'none', touchAction: 'none' }}
    >
      {/* Mundo del juego — se desatura cuando una hormiga muerde */}
      <div
        className="absolute inset-0"
        style={estadoJuego === 'hormigaMordiendo'
          ? { filter: 'grayscale(1)', transition: 'filter 0.15s' }
          : { transition: 'filter 0.15s' }
        }
      >
        <GameBackground nivel={nivel} />

        {alimentos.map((alimento) => (
          <FoodItem key={alimento.id} alimento={alimento} />
        ))}

        {idsHormigas.map((id) => (
          <AntSprite
            key={id}
            id={id}
            alMatar={matarHormiga}
            refInterior={(el) => { refElementosHormigas.current.set(id, el) }}
          />
        ))}

        {aplastadas.map((h) => (
          <HormigaAplastada key={h.id} x={h.x} y={h.y} angulo={h.angulo} />
        ))}

        {/* Filtro rojo de peligro: parpadea cuando una hormiga está cerca de la comida */}
        {hayAmenaza && estadoJuego === 'jugando' && (
          <div
            className="absolute inset-0 pointer-events-none peligro-activo"
            style={{
              background: 'rgba(200, 0, 0, 0.22)',
              boxShadow: 'inset 0 0 80px rgba(220, 0, 0, 0.6)',
              zIndex: 25,
            }}
          />
        )}

        <ScoreDisplay
          puntos={puntos}
          nivel={nivel}
          hormigasMatadas={hormigasMatadas}
          hormigasAMatar={hormigasAMatar}
          hormigasEnAlimento={hormigasEnAlimento}
          vidasPermitidas={dificultad}
        />
      </div>

      {/* Modal de hormiga mordiendo (pausa 3s, no es la última vida) */}
      {estadoJuego === 'hormigaMordiendo' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-center px-6">
            <div className="text-9xl mb-4 hormiga-muerde select-none">🐜</div>
            <p className="text-white text-3xl font-black drop-shadow-lg">
              ¡Hormiga en la comida!
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {Array.from({ length: dificultad }).map((_, i) => (
                <span key={i} className="text-3xl select-none">
                  {i < vidasRestantes ? '❤️' : '🖤'}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de pantalla completada */}
      {estadoJuego === 'pantallaCompleta' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl mx-4">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-3xl font-black text-green-600 mb-1">
              ¡Pantalla {nivel} superada!
            </h2>
            <p className="text-gray-500 mb-2">
              Bonus: +{BONUS * nivel} puntos
            </p>
            <p className="text-2xl font-black text-amber-700 mb-6">
              {puntos.toLocaleString('es-ES')} pts
            </p>
            <button
              onClick={avanzarPantalla}
              className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all"
            >
              Pantalla {nivel + 1} →
            </button>
          </div>
        </div>
      )}

      {/* Modal de fin de juego */}
      {estadoJuego === 'finJuego' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl mx-4">
            <div className="text-5xl mb-3">😱</div>
            <h2 className="text-3xl font-black text-red-600 mb-2">¡Game Over!</h2>
            <p className="text-gray-500 mb-1">Las hormigas llegaron a tu comida</p>
            <p className="text-2xl font-black text-amber-700 mb-6">
              {puntos.toLocaleString('es-ES')} puntos · Pantalla {nivel}
            </p>
            <button
              onClick={() => alTerminarJuego(puntos, nivel)}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all"
            >
              Ver clasificación
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
