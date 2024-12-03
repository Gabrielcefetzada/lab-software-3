export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    users: '/dashboard/users',
    rewards: '/dashboard/rewards',
    transactions: '/dashboard/transactions',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
