'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '@/lib/utils/currency'

// Mock data - will be replaced with real data
const data = [
  { month: 'Jan', income: 8200, expense: 3100 },
  { month: 'Feb', income: 8100, expense: 3400 },
  { month: 'Mar', income: 8300, expense: 3200 },
  { month: 'Apr', income: 8400, expense: 3600 },
  { month: 'May', income: 8150, expense: 3300 },
  { month: 'Jun', income: 8250, expense: 3456 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis
          className="text-xs"
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-3 shadow-lg">
                <p className="mb-2 text-sm font-medium">{payload[0].payload.month}</p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium text-success">Income:</span>{' '}
                    {formatCurrency(payload[0].value as number)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-destructive">Expense:</span>{' '}
                    {formatCurrency(payload[1].value as number)}
                  </p>
                </div>
              </div>
            )
          }}
        />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#income)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#expense)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
