import type { UserRole } from '@/types/enum.ts'

export interface UserDTO {
  id: number
  username: string
  email: string
  role: UserRole
}

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
  role: UserRole
}

export interface LoginRequest {
  identifier: string
  password: string
}

export interface AuthResponse {
  token: string
  identifier: string
}