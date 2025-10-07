import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles, searchVehicles } from "@/data/vehicles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      const results = searchVehicles(query);
      setFilteredVehicles(results);
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [query]);

  useEffect(() => {
    let sorted = [...filteredVehicles];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "year-desc") {
      sorted.sort((a, b) => b.year - a.year);
    } else if (sortBy === "mileage-asc") {
      sorted.sort((a, b) => a.mileage - b.mileage);
    }
    setFilteredVehicles(sorted);
  }, [sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Filtros</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="brand">Marca</Label>
                      <Select>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="model">Modelo</Label>
                      <Select>
                        <SelectTrigger id="model">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Preço</Label>
                      <Select>
                        <SelectTrigger id="price">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          <SelectItem value="0-50000">Até R$ 50.000</SelectItem>
                          <SelectItem value="50000-100000">R$ 50.000 - R$ 100.000</SelectItem>
                          <SelectItem value="100000-150000">R$ 100.000 - R$ 150.000</SelectItem>
                          <SelectItem value="150000+">Acima de R$ 150.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Select>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">Aplicar Filtros</Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Resultados da Busca</h1>
                  <p className="text-muted-foreground">
                    Exibindo 1-{filteredVehicles.length} de {filteredVehicles.length} resultados
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="price-asc">Menor preço</SelectItem>
                      <SelectItem value="price-desc">Maior preço</SelectItem>
                      <SelectItem value="year-desc">Mais recentes</SelectItem>
                      <SelectItem value="mileage-asc">Menor KM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              {filteredVehicles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    Nenhum veículo encontrado para sua busca.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
