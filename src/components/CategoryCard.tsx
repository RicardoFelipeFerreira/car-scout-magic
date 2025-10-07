import { Card } from "./ui/card";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  category: string;
}

export const CategoryCard = ({ title, image, category }: CategoryCardProps) => {
  return (
    <Link to={`/search?category=${category}`}>
      <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 group">
        <div className="relative aspect-[4/3] overflow-hidden bg-accent">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </Card>
    </Link>
  );
};
