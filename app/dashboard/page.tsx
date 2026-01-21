'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CreditCard,
  DollarSign,
  Lightbulb,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { BudgetProgress } from '@/components/dashboard/budget-progress'
import { formatCurrency } from '@/lib/utils/currency'

interface DashboardStats {
  totalBalance: number
  balanceChange: number
  monthlyIncome: number
  incomeChange: number
  monthlyExpenses: number
  expenseChange: number
  savingsRate: number
  savingsRateChange: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading || !stats) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Balance',
      value: stats.totalBalance,
      change: stats.balanceChange,
      icon: Wallet,
      trend: (stats.balanceChange >= 0 ? 'up' : 'down') as const,
    },
    {
      title: 'Monthly Income',
      value: stats.monthlyIncome,
      change: stats.incomeChange,
      icon: TrendingUp,
      trend: (stats.incomeChange >= 0 ? 'up' : 'down') as const,
    },
    {
      title: 'Monthly Expenses',
      value: stats.monthlyExpenses,
      change: stats.expenseChange,
      icon: TrendingDown,
      trend: (stats.expenseChange >= 0 ? 'up' : 'down') as const,
    },
    {
      title: 'Savings Rate',
      value: stats.savingsRate,
      change: stats.savingsRateChange,
      icon: DollarSign,
      trend: (stats.savingsRateChange >= 0 ? 'up' : 'down') as const,
      isPercentage: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with gradient background and animated elements */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 shadow-2xl"
      >
        {/* Animated background grid */}
        <motion.div
          className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div>
            <motion.h1
              className="text-3xl font-bold tracking-tight text-white"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Dashboard
            </motion.h1>
            <motion.p
              className="text-blue-100"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome back! Here&apos;s your financial overview.
            </motion.p>
          </div>

          {/* Quick stats badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="hidden rounded-2xl bg-white/10 p-4 backdrop-blur-sm md:block"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {formatCurrency(stats.totalBalance)}
              </div>
              <div className="text-xs text-blue-100">Total Balance</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, type: 'spring', stiffness: 300 }
            }}
          >
            <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900/50">
              {/* Animated gradient background */}
              <motion.div
                className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-primary/10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              </div>

              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <stat.icon className="h-4 w-4 text-primary" />
                </motion.div>
              </CardHeader>
              <CardContent className="relative">
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.isPercentage
                    ? `${stat.value}%`
                    : formatCurrency(stat.value)}
                </motion.div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <motion.div
                    animate={{
                      y: stat.trend === 'up' ? [-2, 0, -2] : [2, 0, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    )}
                  </motion.div>
                  <span
                    className={
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }
                  >
                    {Math.abs(stat.change)}%
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-4"
        >
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-white to-blue-50/30 shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl dark:from-gray-800 dark:to-gray-900/50">
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-blue-500/5 blur-3xl transition-transform group-hover:scale-150" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <span>Overview</span>
                <motion.div
                  className="h-2 w-2 rounded-full bg-success"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </CardTitle>
              <CardDescription>
                Your income and expenses over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="relative pl-2">
              <OverviewChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-3"
        >
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-white to-purple-50/30 shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl dark:from-gray-800 dark:to-gray-900/50">
            <div className="absolute left-0 top-0 h-40 w-40 -translate-x-20 -translate-y-20 rounded-full bg-purple-500/5 blur-3xl transition-transform group-hover:scale-150" />
            <CardHeader className="relative">
              <CardTitle>Budget Progress</CardTitle>
              <CardDescription>Your spending by category</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <BudgetProgress />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.005 }}
      >
        <Card className="group relative overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-white shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl dark:from-gray-800 dark:to-gray-900/50">
          <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-32 translate-y-32 rounded-full bg-purple-500/10 blur-3xl transition-transform group-hover:scale-125" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Personalized recommendations for you
                  </CardDescription>
                </div>
              </div>
              <Link href="/dashboard/insights">
                <Button variant="outline" size="sm" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <div className="rounded-lg border bg-white/50 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Excellent Savings Progress</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You're saving 74.8% of your income - 15% above your goal!
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-white/50 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Budget Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Shopping budget exceeded by $20. Review your spending.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-white/50 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Financial Health Score</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-bold text-primary">87/100</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-primary to-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.005 }}
      >
        <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-white to-green-50/20 shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl dark:from-gray-800 dark:to-gray-900/50">
          <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-32 translate-y-32 rounded-full bg-green-500/5 blur-3xl transition-transform group-hover:scale-125" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activity
                </CardDescription>
              </div>
              <motion.div
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Live
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <RecentTransactions />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
