'use client'

import { motion } from 'framer-motion'
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OverviewChart } from '@/components/dashboard/overview-chart'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 p-8 shadow-2xl"
      >
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Analytics
          </h1>
          <p className="text-purple-100">
            Deep insights into your spending patterns and trends
          </p>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>Last 6 months comparison</CardDescription>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Spending by category</CardDescription>
                </div>
                <PieChart className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <PieChart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Category breakdown chart</p>
                  <p className="text-sm">Coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Track your progress over time</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Monthly Income</span>
                  <span className="font-bold text-success">$8,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Monthly Expenses</span>
                  <span className="font-bold">$3,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Savings Rate</span>
                  <span className="font-bold text-primary">58.1%</span>
                </div>
                <div className="mt-4 rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 Your savings rate is excellent! Keep up the great work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Forecast</CardTitle>
                  <CardDescription>Projected savings</CardDescription>
                </div>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Month Projection</span>
                  <span className="font-bold text-success">+$4,794</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">6 Month Projection</span>
                  <span className="font-bold text-success">+$28,764</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Annual Projection</span>
                  <span className="font-bold text-success">+$57,528</span>
                </div>
                <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    📈 Based on your current spending patterns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
