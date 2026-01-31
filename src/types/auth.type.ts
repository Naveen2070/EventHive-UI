export interface UserDTO {
  id: number
  username: string
  email: string
  role: 'USER' | 'ORGANIZER' | 'ADMIN'
}

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
  role: 'USER' | 'ORGANIZER'
}

export interface LoginRequest {
  identifier: string
  password: string
}

export interface AuthResponse {
  token: string
  identifier: string
}