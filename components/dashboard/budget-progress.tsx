'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils/currency'

// Mock data
const budgets = [
  { category: 'Food & Dining', spent: 450, budget: 600, color: '#10b981' },
  { category: 'Transportation', spent: 280, budget: 300, color: '#3b82f6' },
  { category: 'Shopping', spent: 520, budget: 500, color: '#ef4444' },
  { category: 'Entertainment', spent: 180, budget: 250, color: '#f59e0b' },
  { category: 'Bills', spent: 850, budget: 1000, color: '#8b5cf6' },
]

export function BudgetProgress() {
  return (
    <div className="space-y-6">
      {budgets.map((budget, index) => {
        const percentage = (budget.spent / budget.budget) * 100
        const isOverBudget = percentage > 100

        return (
          <motion.div
            key={budget.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{budget.category}</span>
              <span className="text-muted-foreground">
                {formatCurrency(budget.spent)} / {formatCurrency(budget.budget)}
              </span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: isOverBudget ? '#ef4444' : budget.color,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentage.toFixed(0)}% used</span>
              {isOverBudget && (
                <span className="text-destructive font-medium">
                  Over budget!
                </span>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
