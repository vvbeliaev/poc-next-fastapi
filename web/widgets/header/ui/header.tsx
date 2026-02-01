"use client";

import { useState } from "react";
import { Home, Heart, LogOut } from "lucide-react";
import { Button } from "@/shared/ui";
import { useUser, LoginForm } from "@/features/auth";
import { useFavorites } from "@/features/favorites";

export function Header() {
  const { user, isLoading, logout } = useUser();
  const { data: favorites = [] } = useFavorites(user?.id ?? null);
  const [showLogin, setShowLogin] = useState(false);

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
            <LoginForm onCancel={() => setShowLogin(false)} />
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
