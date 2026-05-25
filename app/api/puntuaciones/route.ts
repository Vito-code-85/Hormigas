import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'
import { sanitizarNombre } from '@/lib/profanityFilter'

export async function GET() {
  try {
    const puntuaciones = await prisma.puntuacion.findMany({
      orderBy: { puntos: 'desc' },
      take: 10,
    })
    return NextResponse.json(puntuaciones)
  } catch (err) {
    console.error('[GET /api/puntuaciones]', err)
    return NextResponse.json({ error: 'Error al obtener puntuaciones' }, { status: 500 })
  }
}

export async function POST(peticion: Request) {
  try {
    const cuerpo = await peticion.json()
    const { nombre, puntos, pantalla, dificultad } = cuerpo

    if (typeof puntos !== 'number' || puntos < 0) {
      return NextResponse.json({ error: 'Puntuación inválida' }, { status: 400 })
    }

    const nombreLimpio = sanitizarNombre(nombre ?? '')

    const top10Actual = await prisma.puntuacion.findMany({
      orderBy: { puntos: 'desc' },
      take: 10,
    })

    const entraEnTop10 = top10Actual.length < 10 || puntos > (top10Actual[9]?.puntos ?? 0)

    if (!entraEnTop10) {
      return NextResponse.json({ guardado: false, top10: false })
    }

    const nuevaPuntuacion = await prisma.puntuacion.create({
      data: { nombre: nombreLimpio, puntos, pantalla, dificultad },
    })

    const top10Nuevo = await prisma.puntuacion.findMany({
      orderBy: { puntos: 'desc' },
      take: 10,
    })

    const posicion = top10Nuevo.findIndex((e: { id: number }) => e.id === nuevaPuntuacion.id) + 1

    const idsTop10 = top10Nuevo.map((e: { id: number }) => e.id)
    await prisma.puntuacion.deleteMany({ where: { id: { notIn: idsTop10 } } })

    return NextResponse.json({ guardado: true, top10: true, posicion })
  } catch {
    return NextResponse.json({ error: 'Error al guardar puntuación' }, { status: 500 })
  }
}
