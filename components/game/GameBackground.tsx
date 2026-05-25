// Fondo del juego: césped verde con mantel que cambia de patrón cada pantalla
// Los patrones nunca son lisos para dificultar localizar las hormigas

interface PropiedadesFondo {
  nivel: number
}

interface PatronMantel {
  backgroundImage: string
  backgroundSize: string
  borderColor: string
}

const PATRONES_MANTEL: PatronMantel[] = [
  // 0 – Cuadros rojo/blanco clásico (gingham 44px)
  {
    backgroundImage: 'repeating-conic-gradient(#c0392b 0% 25%, #fdf0ee 0% 50%)',
    backgroundSize: '44px 44px',
    borderColor: '#a93226',
  },
  // 1 – Cuadros azul marino/crema (gingham 36px) — ants muy difíciles de ver
  {
    backgroundImage: 'repeating-conic-gradient(#1e3a6b 0% 25%, #f0ead8 0% 50%)',
    backgroundSize: '36px 36px',
    borderColor: '#162c52',
  },
  // 2 – Rayas diagonales naranja/blanco (45°) — líneas quiebran la búsqueda visual
  {
    backgroundImage:
      'repeating-linear-gradient(45deg, #d35400 0px, #d35400 14px, #fef5e7 14px, #fef5e7 36px)',
    backgroundSize: 'auto',
    borderColor: '#b04600',
  },
  // 3 – Cuadros verde oscuro/beige (gingham grande 56px) — tono verde camufla ants
  {
    backgroundImage: 'repeating-conic-gradient(#2d6a4f 0% 25%, #f0ead0 0% 50%)',
    backgroundSize: '56px 56px',
    borderColor: '#245a40',
  },
  // 4 – Cuadrícula burdeos sobre rosa claro (plaid de líneas finas cruzadas)
  {
    backgroundImage: [
      'repeating-linear-gradient(0deg,   transparent 0px, transparent 12px, #9b1b5a 12px, #9b1b5a 14px)',
      'repeating-linear-gradient(90deg,  transparent 0px, transparent 12px, #9b1b5a 12px, #9b1b5a 14px)',
      'linear-gradient(#fce4ec, #fce4ec)',
    ].join(', '),
    backgroundSize: 'auto',
    borderColor: '#7d1738',
  },
  // 5 – Cuadros índigo/lavanda pequeños (gingham 28px) — patrón muy tupido
  {
    backgroundImage: 'repeating-conic-gradient(#3d3580 0% 25%, #ede7f6 0% 50%)',
    backgroundSize: '28px 28px',
    borderColor: '#322d6b',
  },
  // 6 – Rayas diagonales invertidas verde lima/blanco (-45°)
  {
    backgroundImage:
      'repeating-linear-gradient(-45deg, #7cb518 0px, #7cb518 12px, #f8ffe5 12px, #f8ffe5 30px)',
    backgroundSize: 'auto',
    borderColor: '#5f8c14',
  },
  // 7 – Cuadros marrón/crema (gingham 48px) — marrón confunde con el color de las ants
  {
    backgroundImage: 'repeating-conic-gradient(#7b4f12 0% 25%, #fff3cd 0% 50%)',
    backgroundSize: '48px 48px',
    borderColor: '#6a4010',
  },
]

export default function GameBackground({ nivel }: PropiedadesFondo) {
  const patron = PATRONES_MANTEL[(nivel - 1) % PATRONES_MANTEL.length]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Césped */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #2d7a30 0%, #3a8c3e 40%, #2e7a32 100%)' }}
      />
      {/* Textura de hierba */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)',
        }}
      />
      {/* Mantel — patrón distinto en cada pantalla */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '15%',
          backgroundImage: patron.backgroundImage,
          backgroundSize: patron.backgroundSize,
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          border: `4px solid ${patron.borderColor}`,
        }}
      />
      {/* Indicador de pantalla */}
      {/* <div className="absolute top-3 left-3 bg-black/40 text-white rounded-lg px-2 py-1 text-xs font-bold">
        Pantalla {nivel}
      </div> */}
    </div>
  )
}
