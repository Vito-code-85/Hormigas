// Configuración central del juego (todo en español)

export const CONFIG_JUEGO = {
  // Hormigas que hay que matar por pantalla: nivel × este número
  HORMIGAS_POR_NIVEL: 20,

  // Máximo de hormigas visibles en pantalla al mismo tiempo
  MAX_HORMIGAS_EN_PANTALLA: 12,

  // Intervalo entre apariciones de hormigas (en milisegundos)
  INTERVALO_BASE_APARICION: 2200,
  INTERVALO_MIN_APARICION: 450,

  // Velocidad de las hormigas (píxeles por frame)
  VELOCIDAD_BASE_HORMIGA: 0.7,
  VELOCIDAD_MAX_HORMIGA: 2.2,

  // Amplitud del zigzag (píxeles)
  AMPLITUD_ONDA: 35,

  // Distancia en píxeles a la que la hormiga "toca" el alimento
  DISTANCIA_ALIMENTO: 38,

  // Distancia a la que se activa el filtro rojo de peligro (más amplia que la colisión)
  DISTANCIA_PELIGRO: 130,

  // Puntos por hormiga matada
  PUNTOS_POR_HORMIGA: 10,

  // Bonus al completar una pantalla (se multiplica por el nivel)
  BONUS_PANTALLA: 100,

  // Emojis de alimentos (uno por pantalla, se repiten si hay más)
  EMOJIS_ALIMENTO: ['🍬', '🧀', '🍎', '🍕', '🍪', '🌮', '🍔', '🍩'],
} as const

// Cuántas hormigas hay que matar para pasar la pantalla
export function obtenerHormigasAMatar(nivel: number): number {
  return nivel * CONFIG_JUEGO.HORMIGAS_POR_NIVEL
}

// El intervalo de spawn disminuye conforme sube la puntuación (más difícil)
export function obtenerIntervaloAparicion(puntos: number): number {
  const reduccion = Math.floor(puntos / 30) * 50
  const intervalo = CONFIG_JUEGO.INTERVALO_BASE_APARICION - reduccion
  return Math.max(intervalo, CONFIG_JUEGO.INTERVALO_MIN_APARICION)
}

// La velocidad sube con el nivel y se dispara al final de cada pantalla.
// velMin(n) = 0.7 + (n-1)*0.25  →  nivel1: 0.70, nivel2: 0.95, nivel3: 1.20 …
// El inicio de cada pantalla es siempre más rápido que el inicio de la anterior.
export function obtenerVelocidadHormiga(
  nivel: number,
  hormigasMatadas: number,
  hormigasAMatar: number
): number {
  const progreso = hormigasAMatar > 0 ? Math.min(hormigasMatadas / hormigasAMatar, 1) : 0
  const velMin = Math.min(0.8 + (nivel - 1) * 0.30, CONFIG_JUEGO.VELOCIDAD_MAX_HORMIGA)
  const velMax = Math.min(velMin + 1, CONFIG_JUEGO.VELOCIDAD_MAX_HORMIGA)
  return velMin + progreso * (velMax - velMin)
}

// Opciones de dificultad para el menú de bienvenida
export const OPCIONES_DIFICULTAD = [
  { valor: 1, etiqueta: 'Pro',       descripcion: '1 hormiga llega → Fin', color: 'text-red-600' },
  { valor: 2, etiqueta: 'Difícil',   descripcion: '2 hormigas llegan → Fin', color: 'text-orange-500' },
  { valor: 3, etiqueta: 'Normal',    descripcion: '3 hormigas llegan → Fin', color: 'text-yellow-500' },
  { valor: 4, etiqueta: 'Fácil',     descripcion: '4 hormigas llegan → Fin', color: 'text-green-500' },
  { valor: 5, etiqueta: 'Muy fácil', descripcion: '5 hormigas llegan → Fin', color: 'text-blue-500' },
] as const
