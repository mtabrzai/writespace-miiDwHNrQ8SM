export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface PostCreateInput {
  title: string;
  content: string;
  published?: boolean;
}

export interface PostUpdateInput {
  title?: string;
  content?: string;
  published?: boolean;
}

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};