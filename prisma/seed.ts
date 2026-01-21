import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@ledgeriq.com' },
    update: {},
    create: {
      email: 'demo@ledgeriq.com',
      name: 'Demo User',
      passwordHash: 'demo', // In production, this would be hashed
    },
  })

  console.log('✓ Created demo user:', user.email)

  // Create default categories
  const categories = await Promise.all([
    // Expense categories
    prisma.category.upsert({
      where: { id: 'cat-food' },
      update: {},
      create: {
        id: 'cat-food',
        name: 'Food & Dining',
        type: 'expense',
        color: '#10b981',
        icon: 'utensils',
        isDefault: true,
      },
    }),
    prisma.category.upsert({
      where: { id: 'cat-transport' },
      update: {},
      create: {
        id: 'cat-transport',
        name: 'Transportation',
        type: 'expense',
        color: '#3b82f6',
        icon: 'car',
        isDefault: true,
      },
    }),
    prisma.category.upsert({
      where: { id: 'cat-shopping' },
      update: {},
      create: {
        id: 'cat-shopping',
        name: 'Shopping',
        type: 'expense',
        color: '#ef4444',
        icon: 'shopping-bag',
        isDefault: true,
      },
    }),
    prisma.category.upsert({
      where: { id: 'cat-entertainment' },
      update: {},
      create: {
        id: 'cat-entertainment',
        name: 'Entertainment',
        type: 'expense',
        color: '#f59e0b',
        icon: 'film',
        isDefault: true,
      },
    }),
    prisma.category.upsert({
      where: { id: 'cat-bills' },
      update: {},
      create: {
        id: 'cat-bills',
        name: 'Bills',
        type: 'expense',
        color: '#8b5cf6',
        icon: 'receipt',
        isDefault: true,
      },
    }),
    // Income category
    prisma.category.upsert({
      where: { id: 'cat-income' },
      update: {},
      create: {
        id: 'cat-income',
        name: 'Income',
        type: 'income',
        color: '#10b981',
        icon: 'dollar-sign',
        isDefault: true,
      },
    }),
  ])

  console.log('✓ Created default categories:', categories.length)

  // Create sample transactions for the demo user
  const now = new Date()
  const transactions = await Promise.all([
    // January transactions
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-food',
        amount: 5.75,
        type: 'expense',
        description: 'Starbucks',
        merchant: 'Starbucks',
        date: new Date(2026, 0, 19),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-income',
        amount: 4125.0,
        type: 'income',
        description: 'Salary Deposit',
        merchant: 'Employer',
        date: new Date(2026, 0, 18),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-transport',
        amount: 45.23,
        type: 'expense',
        description: 'Shell Gas Station',
        merchant: 'Shell',
        date: new Date(2026, 0, 17),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-shopping',
        amount: 89.99,
        type: 'expense',
        description: 'Amazon Purchase',
        merchant: 'Amazon',
        date: new Date(2026, 0, 15),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-food',
        amount: 32.50,
        type: 'expense',
        description: 'Grocery Store',
        merchant: 'Whole Foods',
        date: new Date(2026, 0, 14),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-entertainment',
        amount: 18.00,
        type: 'expense',
        description: 'Movie Tickets',
        merchant: 'AMC Theaters',
        date: new Date(2026, 0, 12),
      },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: 'cat-bills',
        amount: 850.00,
        type: 'expense',
        description: 'Rent Payment',
        merchant: 'Property Management',
        date: new Date(2026, 0, 1),
      },
    }),
  ])

  console.log('✓ Created sample transactions:', transactions.length)

  // Create sample budgets
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: 'cat-food',
        name: 'Food & Dining Budget',
        amount: 600.0,
        period: 'monthly',
        startDate: new Date(2026, 0, 1),
        alertThreshold: 80,
        isActive: true,
      },
    }),
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: 'cat-transport',
        name: 'Transportation Budget',
        amount: 300.0,
        period: 'monthly',
        startDate: new Date(2026, 0, 1),
        alertThreshold: 80,
        isActive: true,
      },
    }),
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: 'cat-shopping',
        name: 'Shopping Budget',
        amount: 500.0,
        period: 'monthly',
        startDate: new Date(2026, 0, 1),
        alertThreshold: 80,
        isActive: true,
      },
    }),
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: 'cat-entertainment',
        name: 'Entertainment Budget',
        amount: 250.0,
        period: 'monthly',
        startDate: new Date(2026, 0, 1),
        alertThreshold: 80,
        isActive: true,
      },
    }),
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: 'cat-bills',
        name: 'Bills Budget',
        amount: 1000.0,
        period: 'monthly',
        startDate: new Date(2026, 0, 1),
        alertThreshold: 85,
        isActive: true,
      },
    }),
  ])

  console.log('✓ Created sample budgets:', budgets.length)

  console.log('🎉 Seeding complete!')
  console.log('\n📧 Demo credentials:')
  console.log('   Email: demo@ledgeriq.com')
  console.log('   Password: demo')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
