"use client";

import { PropertyCard, type Property } from "@/entities/property";
import { useUser } from "@/features/auth";
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
  FavoriteButton,
} from "@/features/favorites";
import { useProperties } from "../model/use-properties";

interface PropertiesCatalogProps {
  initialData?: Property[];
}

export function PropertiesCatalog({ initialData }: PropertiesCatalogProps) {
  const { user } = useUser();
  const { data: properties, isLoading, error } = useProperties(initialData);
  const { data: favorites = [] } = useFavorites(user?.id ?? null);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[380px] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load properties</p>
        <p className="text-sm text-muted-foreground mt-2">
          Make sure the API server is running
        </p>
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  const handleToggleFavorite = (propertyId: number) => {
    if (!user) return;

    if (favorites.includes(propertyId)) {
      removeFavorite.mutate({ userId: user.id, propertyId });
    } else {
      addFavorite.mutate({ userId: user.id, propertyId });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          actions={
            user && (
              <FavoriteButton
                isFavorite={favorites.includes(property.id)}
                onToggle={() => handleToggleFavorite(property.id)}
              />
            )
          }
        />
      ))}
    </div>
  );
}
