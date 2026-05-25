// Componente de una hormiga individual
// Usa HormigaSVG para el dibujo animado.
// La posición y rotación se actualizan directamente en el DOM (sin re-render de React)
// mediante la referencia "refInterior" que le pasa GameScreen.

import HormigaSVG from './HormigaSVG'

interface PropiedadesHormiga {
  id: string
  alMatar: (id: string) => void
  // refInterior nos da acceso al div DOM para que el game loop mueva la hormiga
  refInterior: (el: HTMLDivElement | null) => void
}

export default function AntSprite({ id, alMatar, refInterior }: PropiedadesHormiga) {
  return (
    <div
      ref={refInterior}
      className="absolute select-none touch-none"
      style={{
        left: 0,
        top: 0,
        // translate(-50%,-50%) centra el emoji en sus coordenadas x,y
        transform: 'translate(-50%, -50%)',
        cursor: "url('/mano-png.svg') 16 44, pointer",
        zIndex: 20,
        // Área de toque más grande para facilitar el click en móvil
        padding: '8px',
      }}
      onClick={() => alMatar(id)}
    >
      {/* La clase "hormiga-caminando" en globals.css añade el balanceo del cuerpo */}
      <div className="hormiga-caminando">
        <HormigaSVG />
      </div>
    </div>
  )
}
