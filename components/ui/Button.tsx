// Botón reutilizable con estilos consistentes en toda la app

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variante?: 'primario' | 'secundario' | 'peligro'
  tamaño?: 'normal' | 'grande'
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({
  children,
  onClick,
  variante = 'primario',
  tamaño = 'normal',
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const estilosBase =
    'rounded-xl font-bold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

  const estilosVariante = {
    primario: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400',
    secundario: 'bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-300 focus:ring-gray-400',
    peligro: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  }

  const estilosTamaño = {
    normal: 'px-6 py-2.5 text-base',
    grande: 'px-10 py-4 text-xl',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${estilosBase} ${estilosVariante[variante]} ${estilosTamaño[tamaño]} ${className}`}
    >
      {children}
    </button>
  )
}
