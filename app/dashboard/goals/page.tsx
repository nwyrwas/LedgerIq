'use client'

import { motion } from 'framer-motion'
import { Plus, Target, Home, Plane, Car, Umbrella } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'

const goals = [
  {
    id: 1,
    name: 'Emergency Fund',
    description: '3 months of expenses',
    target: 15000,
    current: 12450,
    icon: Umbrella,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
  },
  {
    id: 2,
    name: 'House Down Payment',
    description: 'Save for dream home',
    target: 50000,
    current: 18500,
    icon: Home,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/20',
  },
  {
    id: 3,
    name: 'Vacation to Europe',
    description: 'Summer 2027',
    target: 5000,
    current: 2300,
    icon: Plane,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
  },
  {
    id: 4,
    name: 'New Car',
    description: 'Upgrade vehicle',
    target: 25000,
    current: 8750,
    icon: Car,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
  },
]

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track progress toward your financial objectives
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${goal.color}`}>
                        <goal.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{goal.name}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                    <Target className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {formatCurrency(goal.current)}
                      </span>
                      <span className="text-muted-foreground">
                        of {formatCurrency(goal.target)}
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(0)}% complete</span>
                      <span>{formatCurrency(remaining)} to go</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Add Funds
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      Edit Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
