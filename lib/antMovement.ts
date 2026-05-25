// Algoritmo de movimiento de las hormigas (todo en español)
// Las hormigas se mueven hacia el alimento haciendo zigzag sinusoidal

import { DatosHormiga } from './types'

// Calcula una posición aleatoria en el borde de la pantalla
// Las hormigas siempre aparecen desde un borde para que "invadan" el área
export function obtenerPosicionBorde(
  ancho: number,
  alto: number
): { x: number; y: number } {
  // Borde aleatorio: 0=arriba, 1=derecha, 2=abajo, 3=izquierda
  const borde = Math.floor(Math.random() * 4)

  switch (borde) {
    case 0: return { x: Math.random() * ancho, y: -25 }            // Arriba
    case 1: return { x: ancho + 25, y: Math.random() * alto }      // Derecha
    case 2: return { x: Math.random() * ancho, y: alto + 25 }      // Abajo
    default: return { x: -25, y: Math.random() * alto }             // Izquierda
  }
}

// Mueve una hormiga un frame hacia su alimento con movimiento zigzag
// Devuelve la hormiga con su nueva posición y ángulo de rotación
export function moverHormiga(
  hormiga: DatosHormiga,
  alimentoX: number,
  alimentoY: number
): DatosHormiga {
  const dx = alimentoX - hormiga.x
  const dy = alimentoY - hormiga.y
  const distancia = Math.sqrt(dx * dx + dy * dy)

  // Si ya está muy cerca, no la movemos más
  if (distancia < 5) return hormiga

  // Vector normalizado (longitud 1) hacia el alimento
  const normX = dx / distancia
  const normY = dy / distancia

  // Vector perpendicular para el zigzag (gira 90° la dirección principal)
  const perpX = -normY
  const perpY = normX

  // Avanzamos la fase de la onda sinusoidal
  const nuevaFase = hormiga.fase + 0.07

  // Desplazamiento lateral sinusoidal: varía entre -amplitud y +amplitud
  const desplazamientoOndulante = Math.sin(nuevaFase) * hormiga.amplitud * 0.025

  // El ángulo visual de la hormiga apunta hacia donde va
  // +90 porque el SVG de la hormiga tiene la cabeza mirando hacia -Y
  const angulo = Math.atan2(dy, dx) * (180 / Math.PI) + 90

  return {
    ...hormiga,
    x: hormiga.x + (normX + perpX * desplazamientoOndulante) * hormiga.velocidad,
    y: hormiga.y + (normY + perpY * desplazamientoOndulante) * hormiga.velocidad,
    fase: nuevaFase,
    angulo,
  }
}

// Calcula las posiciones de los alimentos en el mantel según el nivel
// Nivel 1 → 1 alimento en el centro; nivel 2 → 2 alimentos, etc.
export function obtenerPosicionesAlimento(
  nivel: number,
  anchoarea: number,
  altoArea: number
): { x: number; y: number }[] {
  const posiciones: { x: number; y: number }[] = []
  const cx = anchoarea / 2
  const cy = altoArea / 2

  if (nivel === 1) {
    posiciones.push({ x: cx, y: cy })
  } else if (nivel === 2) {
    posiciones.push({ x: cx - 70, y: cy })
    posiciones.push({ x: cx + 70, y: cy })
  } else if (nivel === 3) {
    posiciones.push({ x: cx, y: cy - 60 })
    posiciones.push({ x: cx - 70, y: cy + 40 })
    posiciones.push({ x: cx + 70, y: cy + 40 })
  } else {
    // Niveles 4+: cuadrícula centrada
    const columnas = Math.ceil(Math.sqrt(nivel))
    const filas = Math.ceil(nivel / columnas)
    const espaciadoX = Math.min(90, (anchoarea * 0.4) / columnas)
    const espaciadoY = Math.min(80, (altoArea * 0.3) / filas)

    for (let i = 0; i < nivel; i++) {
      const columna = i % columnas
      const fila = Math.floor(i / columnas)
      const inicioX = cx - ((columnas - 1) * espaciadoX) / 2
      const inicioY = cy - ((filas - 1) * espaciadoY) / 2
      posiciones.push({
        x: inicioX + columna * espaciadoX,
        y: inicioY + fila * espaciadoY,
      })
    }
  }

  return posiciones
}
