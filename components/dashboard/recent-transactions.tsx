'use client'

import { motion } from 'framer-motion'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coffee,
  Fuel,
  ShoppingBag,
  Utensils,
  Wifi,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'

// Mock data
const transactions = [
  {
    id: '1',
    description: 'Starbucks',
    amount: -5.75,
    category: 'Food & Dining',
    date: new Date(2026, 0, 19),
    icon: Coffee,
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 4125.0,
    category: 'Income',
    date: new Date(2026, 0, 18),
    icon: ArrowDownLeft,
  },
  {
    id: '3',
    description: 'Shell Gas Station',
    amount: -45.23,
    category: 'Transportation',
    date: new Date(2026, 0, 17),
    icon: Fuel,
  },
  {
    id: '4',
    description: 'Amazon Purchase',
    amount: -89.99,
    category: 'Shopping',
    date: new Date(2026, 0, 16),
    icon: ShoppingBag,
  },
  {
    id: '5',
    description: 'Internet Bill',
    amount: -79.99,
    category: 'Bills',
    date: new Date(2026, 0, 15),
    icon: Wifi,
  },
  {
    id: '6',
    description: 'Chipotle',
    amount: -12.5,
    category: 'Food & Dining',
    date: new Date(2026, 0, 14),
    icon: Utensils,
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => {
        const isIncome = transaction.amount > 0
        const Icon = transaction.icon

        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isIncome
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>{formatDate(transaction.date, 'MMM d')}</span>
                </div>
              </div>
            </div>
            <div
              className={`text-lg font-semibold ${
                isIncome ? 'text-success' : 'text-foreground'
              }`}
            >
              {isIncome ? '+' : ''}
              {formatCurrency(transaction.amount)}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
