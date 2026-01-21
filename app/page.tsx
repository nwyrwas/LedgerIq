'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  BarChart3,
  Brain,
  Lock,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Financial Intelligence</span>
          </motion.div>

          <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 sm:text-6xl md:text-7xl">
            Your Financial
            <br />
            Command Center
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Take control of your finances with AI-powered insights, smart
            budgeting, and beautiful visualizations. LedgerIQ transforms how you
            manage money.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="group">
              <Link href="/dashboard">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {previewStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="rounded-xl border bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
            Everything you need to master your money
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Powerful features designed to give you complete financial clarity
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white shadow-2xl"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to transform your finances?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of users who have taken control of their financial
            future.
          </p>
          <Button size="lg" variant="secondary" asChild className="group">
            <Link href="/dashboard">
              Start Your Journey
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

const previewStats = [
  { label: 'Total Balance', value: '$12,543', change: '+12.5%', icon: Wallet },
  { label: 'Monthly Income', value: '$8,250', change: '+8.2%', icon: TrendingUp },
  { label: 'Monthly Expenses', value: '$3,456', change: '-4.3%', icon: BarChart3 },
  { label: 'Savings Rate', value: '58.1%', change: '+5.1%', icon: Sparkles },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description:
      'Get intelligent recommendations and spending insights powered by advanced AI that learns from your financial patterns.',
  },
  {
    icon: BarChart3,
    title: 'Beautiful Analytics',
    description:
      'Visualize your financial data with stunning, interactive charts and graphs that make complex data easy to understand.',
  },
  {
    icon: Wallet,
    title: 'Smart Budgeting',
    description:
      'Create and track budgets effortlessly with real-time updates and intelligent alerts when you approach limits.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Goals',
    description:
      'Set and achieve your financial goals with progress tracking, forecasting, and personalized recommendations.',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description:
      'Your data is protected with enterprise-grade encryption and security measures. Your privacy is our priority.',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description:
      'Experience lightning-fast performance with instant updates, optimistic UI, and seamless synchronization.',
  },
]
