import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { LoginRequest, RegisterUserRequest } from '@/types/auth.type.ts'
import { useAuthStore } from '@/store/auth.store.ts'
import { authApi } from '@/api/auth.ts'


export const useAuth = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  // 1. Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: async(data) => {
      // Decode user info from token OR use the response if backend sends it
      // For now, let's assume we construct a basic user object or fetch it
      // PRO TIP: Your backend login endpoint should ideally return { token, user }
      // If it only returns { token }, you might need to chain a .getUser() call here.

      // MOCKING User for now based on the identifier (Update backend to return full UserDTO if possible!)
      const user = {
        id: 0,
        username: data.identifier,
        email: data.identifier,
        role: 'USER' as const,
      }

      setAuth(user, data.token)
      toast.success('Welcome back!')
      await navigate({ to: '/' })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  // 2. Register Mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterUserRequest) => authApi.register(data),
    onSuccess: async() => {
      toast.success('Registration successful! Please login.')
      await navigate({ to: '/login' })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
  }
}
