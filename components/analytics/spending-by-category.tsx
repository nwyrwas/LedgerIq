'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Food & Dining', value: 450, color: '#10b981' },
  { name: 'Transportation', value: 280, color: '#3b82f6' },
  { name: 'Shopping', value: 520, color: '#ef4444' },
  { name: 'Entertainment', value: 180, color: '#f59e0b' },
  { name: 'Bills', value: 850, color: '#8b5cf6' },
  { name: 'Healthcare', value: 120, color: '#ec4899' },
]

export function SpendingByCategory() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-3 shadow-lg">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-sm text-muted-foreground">
                  ${payload[0].value}
                </p>
              </div>
            )
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
