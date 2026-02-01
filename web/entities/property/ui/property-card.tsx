"use client";

import Image from "next/image";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, Badge } from "@/shared/ui";
import type { Property } from "../model";
import { cn } from "@/shared/lib/utils";

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
    <Card className="overflow-hidden group border transition-all duration-300 hover:shadow-lg hover:border-primary/20 bg-card">
      <div className="relative aspect-16/10 overflow-hidden">
        {property.image_url ? (
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground"
        >
          {property.city}
        </Badge>

        {actions && (
          <div className="absolute top-3 right-3 z-10">{actions}</div>
        )}
      </div>

      <CardHeader className="pb-2 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </div>
        <p className="text-2xl font-black text-primary tracking-tight">
          {formatPrice(property.price)}
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{property.address}</span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-3 border-t border-muted/50 py-3 bg-muted/20">
        <div className="flex flex-col items-center gap-0.5 border-r border-muted/50">
          <span className="flex items-center gap-1.5 text-foreground font-semibold">
            <Bed className="h-3.5 w-3.5 text-primary" />
            {property.bedrooms}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Beds
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 border-r border-muted/50">
          <span className="flex items-center gap-1.5 text-foreground font-semibold">
            <Bath className="h-3.5 w-3.5 text-primary" />
            {property.bathrooms}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Baths
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="flex items-center gap-1.5 text-foreground font-semibold">
            <Ruler className="h-3.5 w-3.5 text-primary" />
            {property.area_sqm}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Sq M
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
