export interface User {
  id: string
  email: string
  username: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  // Дополнительные поля профиля
}

export interface CreateUserRequest {
  email: string
  username: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: User
} 