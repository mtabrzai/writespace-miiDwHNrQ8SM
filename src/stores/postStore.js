import { create } from 'zustand';
import { Post, PostCreateInput, PostUpdateInput, ApiResponse } from '../types';
import { ROUTES, LIMITS } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export const usePostStore = create<PostState & {
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  createPost: (postData: PostCreateInput) => Promise<ApiResponse<Post>>;
  updatePost: (id: string, postData: PostUpdateInput) => Promise<ApiResponse<Post>>;
  deletePost: (id: string) => Promise<ApiResponse<boolean>>;
  clearCurrentPost: () => void;
  clearError: () => void;
}>((set, get) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalPosts: 0,

  fetchPosts: async (page = 1, limit = LIMITS.POSTS_PER_PAGE) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/posts?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts');
      }

      set({
        posts: data.posts,
        currentPage: data.page,
        totalPages: data.totalPages,
        totalPosts: data.totalPosts,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch posts',
        isLoading: false,
      });
      throw error;
    }
  },

  fetchPostById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch post');
      }

      set({
        currentPost: data.post,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch post',
        isLoading: false,
      });
      throw error;
    }
  },

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      set({
        isLoading: false,
      });

      return {
        data: data.post,
        error: null,
        status: response.status,
      };
    } catch (error) {
      set({
        error: error.message || 'Failed to create post',
        isLoading: false,
      });
      return {
        data: null,
        error: error.message || 'Failed to create post',
        status: 500,
      };
    }
  },

  updatePost: async (id, postData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      set({
        currentPost: data.post,
        isLoading: false,
      });

      return {
        data: data.post,
        error: null,
        status: response.status,
      };
    } catch (error) {
      set({
        error: error.message || 'Failed to update post',
        isLoading: false,
      });
      return {
        data: null,
        error: error.message || 'Failed to update post',
        status: 500,
      };
    }
  },

  deletePost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete post');
      }

      set({
        isLoading: false,
      });

      return {
        data: true,
        error: null,
        status: response.status,
      };
    } catch (error) {
      set({
        error: error.message || 'Failed to delete post',
        isLoading: false,
      });
      return {
        data: false,
        error: error.message || 'Failed to delete post',
        status: 500,
      };
    }
  },

  clearCurrentPost: () => {
    set({ currentPost: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));