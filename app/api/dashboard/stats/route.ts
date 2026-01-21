import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'demo@ledgeriq.com' },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get current month's date range
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Get previous month's date range for comparison
    const firstDayOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    )
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Current month transactions
    const currentMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    })

    // Previous month transactions
    const lastMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth,
        },
      },
    })

    // Calculate current month stats
    const currentIncome = currentMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const currentExpenses = currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate previous month stats
    const lastIncome = lastMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const lastExpenses = lastMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate changes
    const incomeChange =
      lastIncome > 0 ? ((currentIncome - lastIncome) / lastIncome) * 100 : 0
    const expenseChange =
      lastExpenses > 0
        ? ((currentExpenses - lastExpenses) / lastExpenses) * 100
        : 0

    const totalBalance = currentIncome - currentExpenses
    const lastBalance = lastIncome - lastExpenses
    const balanceChange =
      lastBalance > 0
        ? ((totalBalance - lastBalance) / Math.abs(lastBalance)) * 100
        : 0

    const savingsRate =
      currentIncome > 0 ? ((currentIncome - currentExpenses) / currentIncome) * 100 : 0
    const lastSavingsRate =
      lastIncome > 0 ? ((lastIncome - lastExpenses) / lastIncome) * 100 : 0
    const savingsRateChange = savingsRate - lastSavingsRate

    return NextResponse.json({
      totalBalance,
      balanceChange: parseFloat(balanceChange.toFixed(1)),
      monthlyIncome: currentIncome,
      incomeChange: parseFloat(incomeChange.toFixed(1)),
      monthlyExpenses: currentExpenses,
      expenseChange: parseFloat(expenseChange.toFixed(1)),
      savingsRate: parseFloat(savingsRate.toFixed(1)),
      savingsRateChange: parseFloat(savingsRateChange.toFixed(1)),
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
