"use client";

import { useState } from "react";
import { Home, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import { useFavorites } from "@/hooks/use-favorites";

export function Header() {
  const { user, isLoading, createUser, isCreating, logout } = useUser();
  const { data: favorites = [] } = useFavorites(user?.id ?? null);
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      createUser({ email: email.trim() });
      setShowLogin(false);
      setEmail("");
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <span className="font-semibold text-lg">PropertyHub</span>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span>{favorites.length} favorites</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : showLogin ? (
            <form onSubmit={handleLogin} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email to login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-64"
                autoFocus
              />
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
