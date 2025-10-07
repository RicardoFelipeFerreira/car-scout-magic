import { Vehicle } from "@/data/vehicles";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicle/${vehicle.id}`}>
      <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 group">
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
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">
            {vehicle.brand} {vehicle.model} {vehicle.year}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {vehicle.mileage.toLocaleString("pt-BR")} km · {vehicle.color}
          </p>
          <p className="text-2xl font-bold">
            R$ {vehicle.price.toLocaleString("pt-BR")}
          </p>
        </div>
      </Card>
    </Link>
  );
};
