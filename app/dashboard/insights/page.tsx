'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Brain,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function InsightsPage() {
  const insights = [
    {
      type: 'savings',
      icon: TrendingUp,
      color: 'text-success bg-success/10',
      title: 'Excellent Savings Progress',
      description:
        "You're saving 58% of your income this month, which is 15% above your goal. Keep up the great work!",
      action: 'View Savings Goals',
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-warning bg-warning/10',
      title: 'Shopping Budget Alert',
      description:
        "You've spent $520 of your $500 shopping budget. Consider reducing discretionary spending for the rest of the month.",
      action: 'Review Budget',
    },
    {
      type: 'opportunity',
      icon: Lightbulb,
      color: 'text-primary bg-primary/10',
      title: 'Subscription Optimization',
      description:
        'AI detected 3 recurring subscriptions you rarely use. Canceling them could save you $47/month.',
      action: 'View Subscriptions',
    },
    {
      type: 'trend',
      icon: TrendingDown,
      color: 'text-success bg-success/10',
      title: 'Decreased Dining Expenses',
      description:
        'Your dining expenses are down 22% this month compared to last month. Great job on home cooking!',
      action: 'View Trends',
    },
    {
      type: 'ai',
      icon: Brain,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      title: 'Predictive Insight',
      description:
        'Based on your spending patterns, you may exceed your entertainment budget by $30 if current trends continue.',
      action: 'Adjust Budget',
    },
    {
      type: 'recommendation',
      icon: Sparkles,
      color: 'text-primary bg-primary/10',
      title: 'Emergency Fund Milestone',
      description:
        "You're just $425 away from reaching your 3-month emergency fund goal. You could achieve this in 6 weeks!",
      action: 'View Goal',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8 shadow-2xl"
      >
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              AI-Powered Insights
            </h1>
            <p className="text-purple-100">
              Personalized recommendations powered by artificial intelligence
            </p>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
      </motion.div>

      {/* AI Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 shadow-xl">
          <CardHeader>
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
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg"
              >
                <Brain className="h-6 w-6" />
              </motion.div>
              <div>
                <CardTitle className="text-xl">
                  Monthly Financial Health Score
                </CardTitle>
                <CardDescription>
                  Based on AI analysis of your spending patterns
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="mb-2 flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="text-6xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent"
                  >
                    87
                  </motion.span>
                  <span className="text-3xl text-muted-foreground">/100</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-purple-600"
                  />
                </div>
              </div>
              <div className="text-sm">
                <p className="mb-2 flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Strong savings rate</span>
                </p>
                <p className="mb-2 flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>On track with budgets</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-warning">⚠</span>
                  <span>Minor overspending in 1 category</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary/30 hover:shadow-xl">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />
              <CardHeader>
                <div className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${insight.color} shadow-md`}
                  >
                    <insight.icon className="h-6 w-6" />
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {insight.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {insight.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {insight.action}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
