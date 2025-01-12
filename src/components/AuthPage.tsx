import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"
import { Icons } from "@/components/ui/icons"
import { LoginForm } from '@/auth/login-form'
import { SignupForm } from "@/auth/signup-form"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // State to toggle between login and signup

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        {isLogin ? <LoginForm /> : <SignupForm />}
        
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
