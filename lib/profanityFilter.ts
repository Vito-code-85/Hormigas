// Filtro de palabras no permitidas en nombres de usuario
// Si el nombre contiene alguna de estas palabras, se guarda como "Anonimo"

const PALABRAS_PROHIBIDAS = [
  // Español
  'puta', 'puto', 'coño', 'mierda', 'joder', 'hostia', 'gilipollas',
  'cabron', 'cabrón', 'imbecil', 'imbécil', 'idiota', 'estupido', 'estúpido',
  'pendejo', 'marica', 'polla', 'follar', 'cagar', 'hdp', 'hijoputa',
  'capullo', 'mamón', 'mamada', 'verga', 'chinga', 'putada',
  // Inglés
  'fuck', 'shit', 'bitch', 'cunt', 'dick', 'pussy', 'cock', 'bastard', 'asshole',
]

// Devuelve true si el nombre contiene alguna palabra prohibida
export function contienePalabrasProhibidas(nombre: string): boolean {
  const nombreLower = nombre.toLowerCase().trim()
  return PALABRAS_PROHIBIDAS.some((palabra) => nombreLower.includes(palabra))
}

// Limpia el nombre: si está vacío o tiene palabrotas → "Anonimo"
export function sanitizarNombre(nombre: string): string {
  const limpio = nombre.trim()
  if (!limpio || contienePalabrasProhibidas(limpio)) return 'Anonimo'
  // Máximo 20 caracteres, sin espacios al principio/final
  return limpio.slice(0, 20)
}
