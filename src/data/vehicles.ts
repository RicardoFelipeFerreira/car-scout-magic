export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuel: string;
  category: "car" | "motorcycle" | "commercial";
  featured: boolean;
  description: string;
  image: string;
  features?: string[];
}

export interface Brand {
  name: string;
  logo: string;
  models: string[];
}

export const brands: Brand[] = [
  {
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Toyota_EU.svg/200px-Toyota_EU.svg.png",
    models: ["Corolla", "Hilux", "RAV4", "Camry", "Yaris"]
  },
  {
    name: "Honda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/200px-Honda_logo.svg.png",
    models: ["Civic", "HR-V", "City", "Fit", "Accord"]
  },
  {
    name: "Volkswagen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
    models: ["Gol", "Polo", "Virtus", "T-Cross", "Tiguan"]
  },
  {
    name: "Chevrolet",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png",
    models: ["Onix", "Tracker", "S10", "Cruze", "Spin"]
  },
  {
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo_2017.svg/200px-Ford_Motor_Company_Logo_2017.svg.png",
    models: ["Ranger", "Ka", "EcoSport", "Territory", "Bronco"]
  },
  {
    name: "Jeep",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Jeep_logo.svg/200px-Jeep_logo.svg.png",
    models: ["Compass", "Renegade", "Commander", "Wrangler"]
  },
  {
    name: "Fiat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fiat_Automobiles_logo_2006.svg/200px-Fiat_Automobiles_logo_2006.svg.png",
    models: ["Argo", "Mobi", "Toro", "Strada", "Pulse"]
  },
  {
    name: "Hyundai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Hyundai_logo_%282011%29.svg/200px-Hyundai_logo_%282011%29.svg.png",
    models: ["HB20", "Creta", "Tucson", "ix35", "Elantra"]
  }
];

export const vehicles: Vehicle[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla XEi",
    year: 2021,
    price: 115000,
    mileage: 45000,
    color: "Prata",
    transmission: "Automática",
    fuel: "Gasolina",
    category: "car",
    featured: true,
    description: "Baixa quilometragem, excelente consumo.",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
    features: ["Ar-condicionado", "Direção elétrica", "Vidros elétricos", "Travas elétricas"]
  },
  {
    id: "2",
    brand: "Jeep",
    model: "Compass Limited",
    year: 2022,
    price: 160000,
    mileage: 30000,
    color: "Preto",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: true,
    description: "Interior espaçoso, itens de segurança.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Teto solar", "Bancos de couro", "Sensor de estacionamento"]
  },
  {
    id: "3",
    brand: "Ford",
    model: "Ranger XLS",
    year: 2020,
    price: 145000,
    mileage: 60000,
    color: "Azul",
    transmission: "Manual",
    fuel: "Diesel",
    category: "car",
    featured: true,
    description: "Robusta, bem conservada.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Caçamba", "Ar-condicionado", "Rádio"]
  },
  {
    id: "4",
    brand: "Honda",
    model: "Civic Sport",
    year: 2023,
    price: 130000,
    mileage: 15000,
    color: "Vermelho",
    transmission: "Automática",
    fuel: "Gasolina",
    category: "car",
    featured: true,
    description: "Seminovo, garantia de fábrica.",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Câmera de ré", "Controle de cruzeiro", "Bancos de couro"]
  },
  {
    id: "5",
    brand: "Volkswagen",
    model: "T-Cross Highline",
    year: 2022,
    price: 125000,
    mileage: 25000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV compacto, econômico.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Ar digital", "Vidros elétricos", "Bancos em couro", "Sensor de luz"]
  },
  {
    id: "6",
    brand: "Chevrolet",
    model: "Onix Plus Premier",
    year: 2023,
    price: 95000,
    mileage: 10000,
    color: "Cinza",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Como novo, revisado.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    features: ["MyLink", "Controle de tração", "Freio ABS", "Airbags"]
  },
  {
    id: "7",
    brand: "Hyundai",
    model: "Creta Prestige",
    year: 2021,
    price: 110000,
    mileage: 40000,
    color: "Prata",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV versátil, ótimo custo-benefício.",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Bancos em couro", "Sensores", "Câmera"]
  },
  {
    id: "8",
    brand: "Fiat",
    model: "Toro Volcano",
    year: 2022,
    price: 135000,
    mileage: 35000,
    color: "Verde",
    transmission: "Automática",
    fuel: "Diesel",
    category: "car",
    featured: false,
    description: "Picape moderna, potente.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Central multimídia", "Bancos de couro", "Rodas de liga"]
  }
];

export const searchVehicles = (query: string): Vehicle[] => {
  const lowerQuery = query.toLowerCase();
  return vehicles.filter(
    (v) =>
      v.brand.toLowerCase().includes(lowerQuery) ||
      v.model.toLowerCase().includes(lowerQuery) ||
      `${v.brand} ${v.model}`.toLowerCase().includes(lowerQuery)
  );
};

export const getSuggestions = (query: string): Array<{ brand: Brand; model: string }> => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions: Array<{ brand: Brand; model: string }> = [];
  
  brands.forEach((brand) => {
    brand.models.forEach((model) => {
      const fullName = `${brand.name} ${model}`.toLowerCase();
      if (fullName.includes(lowerQuery) || model.toLowerCase().includes(lowerQuery)) {
        suggestions.push({ brand, model });
      }
    });
  });
  
  return suggestions.slice(0, 5);
};
