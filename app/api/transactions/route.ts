import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

// Validation schema
const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  description: z.string().min(1),
  categoryId: z.string().optional(),
  date: z.string().datetime(),
  merchant: z.string().optional(),
  notes: z.string().optional(),
})

// GET /api/transactions - Get all transactions for demo user
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, we'll use the demo user
    // In production, you'd get this from the session
    const user = await prisma.user.findUnique({
      where: { email: 'demo@ledgeriq.com' },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const type = searchParams.get('type') as 'income' | 'expense' | null

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        ...(type && { type }),
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'demo@ledgeriq.com' },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = transactionSchema.parse(body)

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: validatedData.amount,
        type: validatedData.type,
        description: validatedData.description,
        categoryId: validatedData.categoryId,
        date: new Date(validatedData.date),
        merchant: validatedData.merchant,
        notes: validatedData.notes,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
