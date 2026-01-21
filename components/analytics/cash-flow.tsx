'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

const data = [
  { month: 'Jan', income: 8200, expenses: 3100, savings: 5100 },
  { month: 'Feb', income: 8100, expenses: 3400, savings: 4700 },
  { month: 'Mar', income: 8300, expenses: 3200, savings: 5100 },
  { month: 'Apr', income: 8400, expenses: 3600, savings: 4800 },
  { month: 'May', income: 8150, expenses: 3300, savings: 4850 },
  { month: 'Jun', income: 8250, expenses: 3456, savings: 4794 },
]

export function CashFlow() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-3 shadow-lg">
                <p className="mb-2 font-medium">{payload[0].payload.month}</p>
                <div className="space-y-1">
                  {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm">
                      <span className="font-medium" style={{ color: entry.color }}>
                        {entry.name}:
                      </span>{' '}
                      ${entry.value}
                    </p>
                  ))}
                </div>
              </div>
            )
          }}
        />
        <Legend />
        <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="savings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
