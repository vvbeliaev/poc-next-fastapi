"use client";

import { Heart } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-white/80 hover:bg-white rounded-full"
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-600 hover:text-red-500"
        )}
      />
    </Button>
  );
}
