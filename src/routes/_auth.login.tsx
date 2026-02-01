import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/LoginForm.tsx'
import { useAuthStore } from '@/store/auth.store.ts'

export const Route = createFileRoute('/_auth/login')({
  component: LoginForm,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})