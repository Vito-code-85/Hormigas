// Modal base reutilizable con overlay oscuro y contenido centrado

interface ModalProps {
  children: React.ReactNode
  className?: string
}

export default function Modal({ children, className = '' }: ModalProps) {
  return (
    // Overlay: cubre toda la pantalla con fondo semitransparente
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Caja del modal */}
      <div
        className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-md ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
