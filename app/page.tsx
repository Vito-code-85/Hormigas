
"use client"
import InstallPromptModal from '@/components/modals/InstallPromptModal';
import WelcomePage from '@/components/welcome/WelcomePage'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { useEffect, useState } from 'react';

export default function Inicio() {
  const {puedeInstalar}= useInstallPrompt();
  const [mostrarModal, setMostrarModal]= useState(false);
  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (puedeInstalar) {
        setMostrarModal(true)
      }
    }, 1500)
    return () => clearTimeout(temporizador)
  }, [puedeInstalar])

  return (
     <>
    <div className="h-full overflow-y-auto">
      <WelcomePage />
    </div>
    {mostrarModal && (
        <InstallPromptModal alCerrar={() => setMostrarModal(false)} />
      )}
    </>
  )
}
