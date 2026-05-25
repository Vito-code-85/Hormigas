'use client'

import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'


interface PropiedadesModal {
  alCerrar: () => void
}

export default function InstallPromptModal({ alCerrar }: PropiedadesModal) {
  const { puedeInstalar, instalar } = useInstallPrompt()

  const handleInstalar = async () => {
    const instalada = await instalar()
    if (instalada) alCerrar()
  }

  if (!puedeInstalar) return null

  const esIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)

  return (
    <Modal>
      <div className="p-6 text-center">
        <div className="text-5xl mb-3">📱</div>
        <h2 className="text-xl font-black text-gray-800 mb-2">¡Instala el juego!</h2>
        {esIOS ? (
          <p className="text-gray-500 text-sm mb-5">
            Toca <strong>Compartir</strong> → <strong>Añadir a pantalla de inicio</strong> para instalarlo.
          </p>
        ) : (
          <p className="text-gray-500 text-sm mb-5">
            Instálalo en tu dispositivo para jugarlo sin internet.
          </p>
        )}
        <div className="flex gap-3">
          <Button variante="secundario" onClick={alCerrar} className="flex-1">Ahora no</Button>
          {esIOS
            ? <Button onClick={alCerrar} className="flex-1">Entendido</Button>
            : <Button onClick={handleInstalar} className="flex-1">📲 Instalar</Button>
          }
        </div>
      </div>
    </Modal>
  )
}
