// Título principal del juego con animación

export default function GameTitle() {
  return (
    <div className="text-center py-6">
      <div className="text-6xl mb-2">🐜</div>
      <h1 className="text-4xl sm:text-5xl font-black text-amber-900 drop-shadow-sm tracking-tight">
        Invasión de Hormigas
      </h1>
      <p className="text-amber-700 mt-1 text-sm font-medium tracking-widest uppercase">
        ¡Defiende tu comida!
      </p>
    </div>
  )
}
