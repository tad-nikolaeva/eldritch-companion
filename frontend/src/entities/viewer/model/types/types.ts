export interface Viewer {
  id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface ViewerProfile {
  id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  access_token: string
  user: Viewer
} 