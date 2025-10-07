import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";

const Index = () => {
  const featuredVehicles = vehicles.filter((v) => v.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Encontre o seu carro perfeito
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Explore uma vasta seleção de veículos das melhores marcas, tudo em um só lugar.
            </p>
            <div className="max-w-3xl mx-auto">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Navegue por Categoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              title="Carros"
              image="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop"
              category="car"
            />
            <CategoryCard
              title="Motos"
              image="https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&auto=format&fit=crop"
              category="motorcycle"
            />
            <CategoryCard
              title="Veículos Comerciais"
              image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop"
              category="commercial"
            />
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Sobre Nós</a>
              <a href="#" className="hover:text-foreground transition-colors">Contato</a>
              <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos de Serviço</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Busca Car. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
