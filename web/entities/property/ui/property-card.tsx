"use client";

import Image from "next/image";
import { Bed, Bath, Ruler } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, Badge } from "@/shared/ui";
import type { Property } from "../model";

interface PropertyCardProps {
  property: Property;
  actions?: React.ReactNode;
}

export function PropertyCard({ property, actions }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.image_url ? (
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge className="absolute top-3 left-3">{property.city}</Badge>
        {actions && (
          <div className="absolute top-2 right-2">{actions}</div>
        )}
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
        <p className="text-2xl font-bold text-primary">
          {formatPrice(property.price)}
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {property.address}
        </p>
      </CardContent>

      <CardFooter className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          {property.bedrooms}
        </span>
        <span className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          {property.bathrooms}
        </span>
        <span className="flex items-center gap-1">
          <Ruler className="h-4 w-4" />
          {property.area_sqm} m²
        </span>
      </CardFooter>
    </Card>
  );
}
