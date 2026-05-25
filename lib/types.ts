// Tipos compartidos para todo el juego de hormigas (en español)

// Estado del juego en cada momento
export type EstadoJuego =
  | 'jugando'          // Jugando activamente
  | 'hormigaMordiendo' // Hormiga llegó a la comida (pausa 3s, no es la última vida)
  | 'pantallaCompleta' // Acaba de completar una pantalla
  | 'finJuego'         // El juego ha terminado

// Dificultad: cuántas hormigas pueden tocar el alimento antes de game over
// 1 = "Pro" (una sola hormiga = fin), 5 = más permisivo
export type Dificultad = 1 | 2 | 3 | 4 | 5

// Datos de una hormiga en movimiento
export interface DatosHormiga {
  id: string
  x: number                // Posición horizontal en píxeles
  y: number                // Posición vertical en píxeles
  indiceAlimento: number   // Índice del alimento al que se dirige
  velocidad: number        // Píxeles por frame
  fase: number             // Fase de la onda sinusoidal (zigzag)
  amplitud: number         // Amplitud del zigzag
  angulo: number           // Ángulo de rotación visual en grados
}

// Datos de un alimento sobre el mantel
export interface DatosAlimento {
  id: string
  x: number
  y: number
  emoji: string
}

// Entrada del marcador global (lo que devuelve la API)
export interface EntradaPuntuacion {
  id: number
  nombre: string
  puntos: number
  pantalla: number
  dificultad: number
  creadoEn: string
}
