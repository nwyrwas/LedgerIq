'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { month: 'Jan', amount: 3100 },
  { month: 'Feb', amount: 3400 },
  { month: 'Mar', amount: 3200 },
  { month: 'Apr', amount: 3600 },
  { month: 'May', amount: 3300 },
  { month: 'Jun', amount: 3456 },
]

export function MonthlyTrends() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-3 shadow-lg">
                <p className="font-medium">{payload[0].payload.month}</p>
                <p className="text-sm text-muted-foreground">
                  ${payload[0].value}
                </p>
              </div>
            )
          }}
        />
        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
