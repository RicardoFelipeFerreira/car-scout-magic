import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles, searchVehicles, brands, extractBrandAndModel } from "@/data/vehicles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract brand and model from query
  const { brand: detectedBrand, model: detectedModel } = useMemo(() => 
    extractBrandAndModel(query), [query]
  );
  
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // Update filters when search query changes
  useEffect(() => {
    if (detectedBrand) {
      setSelectedBrand(detectedBrand);
      if (detectedModel) {
        setSelectedModel(detectedModel);
      } else {
        setSelectedModel("all");
      }
    }
  }, [detectedBrand, detectedModel]);

  // Get available models for selected brand
  const availableModels = useMemo(() => {
    if (selectedBrand === "all") return [];
    const brand = brands.find(b => b.name === selectedBrand);
    return brand ? brand.models : [];
  }, [selectedBrand]);

  // Filter vehicles based on search query and filters
  const filteredVehicles = useMemo(() => {
    let result = query ? searchVehicles(query) : vehicles;
    
    // Apply brand filter
    if (selectedBrand !== "all") {
      result = result.filter(v => v.brand === selectedBrand);
    }
    
    // Apply model filter
    if (selectedModel !== "all") {
      result = result.filter(v => v.model === selectedModel);
    }
    
    // Apply price filter
    if (selectedPrice !== "all") {
      const [min, max] = selectedPrice.split("-").map(Number);
      if (max) {
        result = result.filter(v => v.price >= min && v.price <= max);
      } else {
        result = result.filter(v => v.price >= min);
      }
    }
    
    return result;
  }, [query, selectedBrand, selectedModel, selectedPrice]);

  // Sort filtered vehicles
  const sortedVehicles = useMemo(() => {
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
    return sorted;
  }, [filteredVehicles, sortBy]);

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel("all"); // Reset model when brand changes
  };

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
                      <Select value={selectedBrand} onValueChange={handleBrandChange}>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          {brands.map((brand) => (
                            <SelectItem key={brand.name} value={brand.name}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="model">Modelo</Label>
                      <Select 
                        value={selectedModel} 
                        onValueChange={setSelectedModel}
                        disabled={selectedBrand === "all"}
                      >
                        <SelectTrigger id="model">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          {availableModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Preço</Label>
                      <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                        <SelectTrigger id="price">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          <SelectItem value="0-70000">Até R$ 70.000</SelectItem>
                          <SelectItem value="70000-100000">R$ 70.000 - R$ 100.000</SelectItem>
                          <SelectItem value="100000-150000">R$ 100.000 - R$ 150.000</SelectItem>
                          <SelectItem value="150000-200000">R$ 150.000 - R$ 200.000</SelectItem>
                          <SelectItem value="200000-999999">Acima de R$ 200.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer</SelectItem>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" onClick={handleApplyFilters}>
                      Aplicar Filtros
                    </Button>
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
                    Exibindo 1-{sortedVehicles.length} de {sortedVehicles.length} resultados
                    {query && ` para "${query}"`}
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
                {sortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              {sortedVehicles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    Nenhum veículo encontrado para "{query}".
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tente buscar por outras marcas ou modelos.
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
