"use client"

import { FormEvent, useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabaseBrowser } from "@/lib/client"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  // Keeping password free of format rules per requirements.
  password: z.string(),
})

export default function AdminLoginModal() {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [authError, setAuthError] = useState("")
  const [emailError, setEmailError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setAuthError("")
    setEmailError("")
    try {
      const parsed = loginSchema.safeParse({ email, password })
      if (!parsed.success) {
        const firstIssue = parsed.error.issues[0]
        const message = firstIssue?.message ?? "Invalid input."
        setEmailError(message)
        toast({ title: "Login failed", description: message })
        setIsSubmitting(false)
        return
      }

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (signInError) {
        throw new Error("Invalid admin email")
      }

      const userId = signInData.user?.id
      if (!userId) {
        throw new Error("No user session returned from Supabase.")
      }

      const { data: adminRow, error: adminQueryError } = await supabase
        .from("app_admin")
        .select("admin_user_id")
        .eq("singleton_id", true)
        .maybeSingle()

      if (adminQueryError) {
        throw adminQueryError
      }

      if (!adminRow || adminRow.admin_user_id !== userId) {
        await supabase.auth.signOut()
        throw new Error("You are not authorized as admin.")
      }

      setIsAuthenticated(true)
      setIsOpen(false)
      toast({ title: "Signed in", description: "Admin access granted." })
    } catch (error) {
      const fallbackMessage = "Login failed. Please check your credentials."
      const message =
        error instanceof Error && error.message
          ? error.message
          : fallbackMessage

      const isExpectedAuthError =
        message === "Invalid admin email" ||
        message === "You are not authorized as admin."

      if (!isExpectedAuthError) {
        console.error("Admin login failed", error)
      }

      setAuthError(message)
      toast({ title: "Login failed", description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (isAuthenticated) {
          setIsOpen(nextOpen)
        } else {
          setIsOpen(true)
        }
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        hideCloseButton
        onInteractOutside={(event) => {
          if (!isAuthenticated) event.preventDefault()
        }}
        onEscapeKeyDown={(event) => {
          if (!isAuthenticated) event.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Enter your admin email and password.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                if (emailError) setEmailError("")
              }}
              placeholder="admin@example.com"
              aria-invalid={emailError || authError ? "true" : "false"}
              aria-describedby={
                [
                  emailError ? "admin-email-error" : null,
                  authError ? "admin-auth-error" : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
            {emailError ? (
              <p
                id="admin-email-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {emailError}
              </p>
            ) : null}
            {authError ? (
              <p
                id="admin-auth-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {authError}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>
          <DialogFooter>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
