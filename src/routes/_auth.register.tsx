import { createFileRoute, redirect } from '@tanstack/react-router'
import { RegisterForm } from '@/features/auth/components/RegisterForm.tsx'
import { useAuthStore } from '@/store/auth.store.ts'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterForm,

  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})
