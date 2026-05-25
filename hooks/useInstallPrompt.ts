'use client'

import { useState, useEffect, useRef } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useInstallPrompt() {
  const [puedeInstalar, setPuedeInstalar] = useState(false)
  const [estaInstalada, setEstaInstalada] = useState(false)
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setEstaInstalada(true)
    }

    type VentanaConPrompt = typeof window & { __pwaInstallPrompt?: BeforeInstallPromptEvent }
    const w = window as VentanaConPrompt
    if (w.__pwaInstallPrompt) {
      promptRef.current = w.__pwaInstallPrompt
      delete w.__pwaInstallPrompt
      setPuedeInstalar(true)
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      promptRef.current = e as BeforeInstallPromptEvent
      setPuedeInstalar(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    window.addEventListener('appinstalled', () => {
      setEstaInstalada(true)
      setPuedeInstalar(false)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const instalar = async () => {
    if (!promptRef.current) return false
    await promptRef.current.prompt()
    const { outcome } = await promptRef.current.userChoice
    promptRef.current = null
    setPuedeInstalar(false)
    return outcome === 'accepted'
  }

  return { puedeInstalar, estaInstalada, instalar }
}
