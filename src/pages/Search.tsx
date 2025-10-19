import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles, searchVehicles, brands, extractBrandAndModel } from "@/data/vehicles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 24;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Extract brand and model from query
  const { brand: detectedBrand, model: detectedModel } = useMemo(() => 
    extractBrandAndModel(query), [query]
  );
  
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  
  // Range filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [yearRange, setYearRange] = useState<[number, number]>([1940, 2026]);
  const [kmRange, setKmRange] = useState<[number, number]>([0, 200000]);
  
  // Advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
  const [selectedFuel, setSelectedFuel] = useState<string>("all");
  const [selectedPlateEnd, setSelectedPlateEnd] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("all");
  const [selectedDoors, setSelectedDoors] = useState<string>("all");
  const [selectedArmored, setSelectedArmored] = useState<string>("all");
  const [selectedAuction, setSelectedAuction] = useState<string>("all");

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
    
    // Apply price range filter
    result = result.filter(v => v.price >= priceRange[0] && v.price <= priceRange[1]);
    
    // Apply year range filter
    result = result.filter(v => v.year >= yearRange[0] && v.year <= yearRange[1]);
    
    // Apply km range filter
    result = result.filter(v => v.mileage >= kmRange[0] && v.mileage <= kmRange[1]);
    
    // Apply advanced filters
    if (selectedTransmission !== "all") {
      result = result.filter(v => v.transmission === selectedTransmission);
    }
    
    if (selectedFuel !== "all") {
      result = result.filter(v => v.fuel === selectedFuel);
    }
    
    if (selectedColor !== "all") {
      result = result.filter(v => v.color === selectedColor);
    }
    
    return result;
  }, [query, selectedBrand, selectedModel, priceRange, yearRange, kmRange, selectedTransmission, selectedFuel, selectedColor]);

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

  // Pagination
  const totalPages = Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedVehicles.slice(startIndex, endIndex);
  }, [sortedVehicles, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredVehicles.length, sortBy]);

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
                  
                  <div className="space-y-6">
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
                      <Label className="text-sm font-semibold mb-3 block">Preço</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Mínimo</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                            <Input
                              type="number"
                              min="0"
                              step="5000"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Math.max(0, Number(e.target.value)), priceRange[1]])}
                              placeholder="0"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="flex items-end pb-2">
                          <span className="text-muted-foreground">—</span>
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Máximo</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                            <Input
                              type="number"
                              min="0"
                              step="5000"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Math.max(0, Number(e.target.value))])}
                              placeholder="500.000"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Ano</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">De</Label>
                          <Input
                            type="number"
                            min="1940"
                            max="2026"
                            value={yearRange[0]}
                            onChange={(e) => setYearRange([Math.max(1940, Math.min(2026, Number(e.target.value))), yearRange[1]])}
                            placeholder="1940"
                          />
                        </div>
                        <div className="flex items-end pb-2">
                          <span className="text-muted-foreground">—</span>
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Até</Label>
                          <Input
                            type="number"
                            min="1940"
                            max="2026"
                            value={yearRange[1]}
                            onChange={(e) => setYearRange([yearRange[0], Math.max(1940, Math.min(2026, Number(e.target.value)))])}
                            placeholder="2026"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Quilometragem</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Mínimo</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              min="0"
                              step="5000"
                              value={kmRange[0]}
                              onChange={(e) => setKmRange([Math.max(0, Number(e.target.value)), kmRange[1]])}
                              placeholder="0"
                              className="pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">km</span>
                          </div>
                        </div>
                        <div className="flex items-end pb-2">
                          <span className="text-muted-foreground">—</span>
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Máximo</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              min="0"
                              step="5000"
                              value={kmRange[1]}
                              onChange={(e) => setKmRange([kmRange[0], Math.max(0, Number(e.target.value))])}
                              placeholder="200.000"
                              className="pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">km</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Filtros Avançados
                          <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="transmission">Câmbio</Label>
                          <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                            <SelectTrigger id="transmission">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="Manual">Manual</SelectItem>
                              <SelectItem value="Automático">Automático</SelectItem>
                              <SelectItem value="Automatizado">Automatizado</SelectItem>
                              <SelectItem value="CVT">CVT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="fuel">Combustível</Label>
                          <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                            <SelectTrigger id="fuel">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="Gasolina">Gasolina</SelectItem>
                              <SelectItem value="Álcool">Álcool</SelectItem>
                              <SelectItem value="Flex">Flex</SelectItem>
                              <SelectItem value="Diesel">Diesel</SelectItem>
                              <SelectItem value="GNV">GNV</SelectItem>
                              <SelectItem value="Elétrico">Elétrico</SelectItem>
                              <SelectItem value="Híbrido">Híbrido</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="plateEnd">Final da Placa</Label>
                          <Select value={selectedPlateEnd} onValueChange={setSelectedPlateEnd}>
                            <SelectTrigger id="plateEnd">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="color">Cor</Label>
                          <Select value={selectedColor} onValueChange={setSelectedColor}>
                            <SelectTrigger id="color">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="Branco">Branco</SelectItem>
                              <SelectItem value="Preto">Preto</SelectItem>
                              <SelectItem value="Prata">Prata</SelectItem>
                              <SelectItem value="Cinza">Cinza</SelectItem>
                              <SelectItem value="Vermelho">Vermelho</SelectItem>
                              <SelectItem value="Azul">Azul</SelectItem>
                              <SelectItem value="Verde">Verde</SelectItem>
                              <SelectItem value="Amarelo">Amarelo</SelectItem>
                              <SelectItem value="Laranja">Laranja</SelectItem>
                              <SelectItem value="Marrom">Marrom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="bodyType">Carroceria</Label>
                          <Select value={selectedBodyType} onValueChange={setSelectedBodyType}>
                            <SelectTrigger id="bodyType">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="Sedan">Sedan</SelectItem>
                              <SelectItem value="Hatch">Hatch</SelectItem>
                              <SelectItem value="SUV">SUV</SelectItem>
                              <SelectItem value="Picape">Picape</SelectItem>
                              <SelectItem value="Conversível">Conversível</SelectItem>
                              <SelectItem value="Minivan">Minivan</SelectItem>
                              <SelectItem value="Cupê">Cupê</SelectItem>
                              <SelectItem value="Perua/SW">Perua/SW</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="doors">Portas</Label>
                          <Select value={selectedDoors} onValueChange={setSelectedDoors}>
                            <SelectTrigger id="doors">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="2">2 portas</SelectItem>
                              <SelectItem value="4">4 portas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="armored">Blindagem</Label>
                          <Select value={selectedArmored} onValueChange={setSelectedArmored}>
                            <SelectTrigger id="armored">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="yes">Blindado</SelectItem>
                              <SelectItem value="no">Não blindado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="auction">Leilão</Label>
                          <Select value={selectedAuction} onValueChange={setSelectedAuction}>
                            <SelectTrigger id="auction">
                              <SelectValue placeholder="Qualquer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Qualquer</SelectItem>
                              <SelectItem value="yes">De leilão</SelectItem>
                              <SelectItem value="no">Não é de leilão</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

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
                    Exibindo {sortedVehicles.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedVehicles.length)} de {sortedVehicles.length} resultados
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
                {paginatedVehicles.map((vehicle) => (
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

              {sortedVehicles.length > 0 && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNumber);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                isActive={currentPage === pageNumber}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                              setCurrentPage(currentPage + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
