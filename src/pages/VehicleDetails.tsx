import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, ArrowLeft, Heart, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Veículo não encontrado</h1>
            <Link to="/search">
              <Button>Voltar para busca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Veículos</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-foreground">Sedans</Link>
            <span>/</span>
            <span className="text-foreground">Sedan {vehicle.year}</span>
          </div>

          <Button variant="ghost" asChild className="mb-6">
            <Link to="/search">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para resultados
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Images */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-75 transition-opacity">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.model} - Imagem ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Details */}
              <Card className="p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">
                  {vehicle.brand} {vehicle.model} {vehicle.year} - {vehicle.description.split(",")[0]}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Marca</p>
                    <p className="font-semibold">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Modelo</p>
                    <p className="font-semibold">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ano</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Quilometragem</p>
                    <p className="font-semibold">{vehicle.mileage.toLocaleString("pt-BR")} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cor Externa</p>
                    <p className="font-semibold">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cor Interna</p>
                    <p className="font-semibold">Preto Meio-noite</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Combustível</p>
                    <p className="font-semibold">{vehicle.fuel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Transmissão</p>
                    <p className="font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>

                {vehicle.features && vehicle.features.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h3 className="text-xl font-bold mb-4">Opcionais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Preço</span>
                    {vehicle.featured && (
                      <Badge variant="secondary">Destaque</Badge>
                    )}
                  </div>
                  <p className="text-4xl font-bold">
                    R$ {vehicle.price.toLocaleString("pt-BR")}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="mb-6">
                  <h3 className="font-bold mb-3">Informações do Vendedor</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Miller</p>
                      <p className="text-sm text-muted-foreground">Vendedor Verificado</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sarah é uma vendedora de confiança com um histórico de excelentes avaliações.
                    Entre em contato diretamente com ela para agendar uma visita ou tirar qualquer dúvida.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Entrar em Contato
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Ver Mais Detalhes
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">Sobre Nós</Link>
              <Link to="/contact" className="hover:text-foreground">Contato</Link>
              <Link to="/privacy" className="hover:text-foreground">Política de Privacidade</Link>
              <Link to="/terms" className="hover:text-foreground">Termos de Serviço</Link>
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

export default VehicleDetails;
