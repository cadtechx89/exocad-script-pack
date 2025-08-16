"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("authUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app this would be actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = { email }
      setUser(userData)
      localStorage.setItem("authUser", JSON.stringify(userData))
      return true
    } catch (error) {
      return false
    }
  }

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app this would be actual registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = { email }
      setUser(userData)
      localStorage.setItem("authUser", JSON.stringify(userData))
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
