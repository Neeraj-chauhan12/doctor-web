import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getWithAuth,
  postWithAuth,
  postWithOutAuth,
  putWithAuth,
} from "../service/httpService";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  setUser: (user: User, token: string) => void;
  clearError: () => void;
  logout: () => void;

  loginDoctor: (email: string, password: string) => Promise<void>;
  loginPatient: (email: string, password: string) => Promise<void>;
  signupDoctor: (data: any) => Promise<void>;
  signupPatient: (data: any) => Promise<void>;
  fetchProfile: () => Promise<User | null>;
  updateProfile: (data: any) => Promise<void>;
}

export const userAuthStore = create<AuthState>()(
  persist((set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true, error: null });
      },

      clearError: () => set({ error: null }),

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      loginDoctor: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          const response = await postWithAuth("/doctor/login", {
            email,
            password,
          });
          get().setUser(response.data.user, response.data.token);
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      loginPatient: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          const response = await postWithOutAuth("/patient/login", {
            email,
            password,
          });
          get().setUser(response.data.user, response.data.token);
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      signupDoctor: async (data: Partial<User>) => {
        set({ loading: true, error: null });

        try {
          const response = await postWithOutAuth("/doctor/signup", { data });
          get().setUser(response.data.user, response.data.token);
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      signupPatient: async (data: Partial<User>) => {
        set({ loading: true, error: null });

        try {
          const response = await postWithOutAuth("/patient/signup", { data });
          get().setUser(response.data.user, response.data.token);
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      fetchProfile: async (): Promise<User | null> => {
        set({ loading: true, error: null });

        try {
          const { user } = get();
          if (!user) throw new Error("No user found");
          const endpoint =
            user.type === "doctor" ? "/doctor/me" : "/patient/me";
          const response = await getWithAuth(endpoint);
          set({ user: { ...user, ...response.data } });
          return response.data;
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ loading: true, error: null });

        try {
          const { user } = get();
          if (!user) throw new Error("No user found");
          const endpoint =
            user.type === "doctor"
              ? "/doctor/onboarding/update"
              : "/patient/onboarding/update";
          const response = await putWithAuth(endpoint, data);
          set({ user: { ...user, ...response.data } });
          return response.data;
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
