import { Vehicle } from "@/data/vehicles";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Store } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const handleClick = () => {
    window.open(vehicle.externalUrl || "https://google.com", "_blank");
  };

  return (
    <Card 
      onClick={handleClick}
      className="overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.featured && (
          <Badge className="absolute top-3 left-3 bg-highlight text-highlight-foreground">
            Destaque
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">
          {vehicle.brand} {vehicle.model} {vehicle.year}
        </h3>
        <p className="text-sm text-muted-foreground">
          {vehicle.mileage > 0 ? `${vehicle.mileage.toLocaleString("pt-BR")} km` : 'Km não informado'}
        </p>
        <p className="text-2xl font-bold text-primary">
          R$ {vehicle.price.toLocaleString("pt-BR")}
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{vehicle.location}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Store className="w-4 h-4" />
          <span>{vehicle.store}</span>
        </div>
      </div>
    </Card>
  );
};
