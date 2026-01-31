import { api } from './axios'
import type {
  AuthResponse,
  LoginRequest,
  RegisterUserRequest,
  UserDTO,
} from '@/types/auth.type.ts'


export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  register: async (data: RegisterUserRequest): Promise<UserDTO> => {
    const response = await api.post<UserDTO>('/auth/register', data)
    return response.data
  },

  getUser: async (id: number): Promise<UserDTO> => {
    const response = await api.get<UserDTO>(`/user/users/${id}`)
    return response.data
  },
}
