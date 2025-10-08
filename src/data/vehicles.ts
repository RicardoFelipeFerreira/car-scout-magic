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

// Importar dados das marcas do JSON local
import brandsData from './brands.json';

// Logos das marcas (fallback)
const brandLogos: { [key: string]: string } = {
  "Fiat": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fiat_Automobiles_logo_2006.svg/200px-Fiat_Automobiles_logo_2006.svg.png",
  "VW - VolksWagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
  "GM - Chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png",
  "Toyota": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Toyota_EU.svg/200px-Toyota_EU.svg.png",
  "Hyundai": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Hyundai_logo_%282011%29.svg/200px-Hyundai_logo_%282011%29.svg.png",
  "Honda": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/200px-Honda_logo.svg.png",
  "Jeep": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Jeep_logo.svg/200px-Jeep_logo.svg.png",
  "Nissan": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/200px-Nissan_logo.svg.png",
  "Renault": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Renault_2015.svg/200px-Renault_2015.svg.png",
  "Peugeot": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Peugeot_2021.svg/200px-Peugeot_2021.svg.png",
  "Citroën": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Citro%C3%ABn_2022.svg/200px-Citro%C3%ABn_2022.svg.png",
  "Ford": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo_2017.svg/200px-Ford_Motor_Company_Logo_2017.svg.png",
  "BYD": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/BYD_company_logo.svg/200px-BYD_company_logo.svg.png",
  "CAOA CHERY": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chery_Logo.svg/200px-Chery_Logo.svg.png",
  "Mitsubishi": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Mitsubishi_logo.svg/200px-Mitsubishi_logo.svg.png",
};

// Carregar marcas do JSON e adicionar logos
export const brands: Brand[] = brandsData.map(brand => ({
  name: brand.name,
  models: brand.models,
  logo: brandLogos[brand.name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=random`
}));

export const vehicles: Vehicle[] = [
  // Featured vehicles
  {
    id: "1",
    brand: "Fiat",
    model: "Strada",
    year: 2024,
    price: 98000,
    mileage: 5000,
    color: "Branco",
    transmission: "Manual",
    fuel: "Flex",
    category: "commercial",
    featured: true,
    description: "Picape mais vendida do Brasil, baixíssima quilometragem.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["Ar-condicionado", "Direção elétrica", "Vidros elétricos", "Alarme"]
  },
  {
    id: "2",
    brand: "Volkswagen",
    model: "Polo",
    year: 2024,
    price: 89000,
    mileage: 8000,
    color: "Prata",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: true,
    description: "Seminovo, econômico e confortável.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Ar digital", "Sensor de estacionamento", "Controle de tração"]
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    price: 135000,
    mileage: 25000,
    color: "Preto",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: true,
    description: "Sedan premium, manutenção em dia.",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
    features: ["Bancos de couro", "Teto solar", "Piloto automático", "Sistema multimídia"]
  },
  {
    id: "4",
    brand: "Jeep",
    model: "Compass",
    year: 2022,
    price: 160000,
    mileage: 30000,
    color: "Preto",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: true,
    description: "SUV completo, interior espaçoso.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Teto solar", "Bancos de couro", "Sensor de estacionamento"]
  },
  // More vehicles
  {
    id: "5",
    brand: "Fiat",
    model: "Argo",
    year: 2023,
    price: 72000,
    mileage: 18000,
    color: "Vermelho",
    transmission: "Manual",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Hatch moderno, ótimo custo-benefício.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Ar-condicionado", "Vidros elétricos", "Central multimídia", "Direção elétrica"]
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "HB20",
    year: 2023,
    price: 78000,
    mileage: 15000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Econômico e confiável.",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop",
    features: ["Ar-condicionado", "Sensor de ré", "Bluelink", "Controle de estabilidade"]
  },
  {
    id: "7",
    brand: "Chevrolet",
    model: "Onix",
    year: 2024,
    price: 82000,
    mileage: 6000,
    color: "Cinza",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Hatch líder de vendas, como novo.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    features: ["MyLink", "Controle de tração", "Freio ABS", "6 Airbags"]
  },
  {
    id: "8",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 145000,
    mileage: 12000,
    color: "Vermelho",
    transmission: "Automática",
    fuel: "Gasolina",
    category: "car",
    featured: false,
    description: "Sedan esportivo, seminovo com garantia.",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
    features: ["Honda Sensing", "Câmera 360°", "Teto solar", "Bancos em couro"]
  },
  {
    id: "9",
    brand: "Volkswagen",
    model: "T-Cross",
    year: 2023,
    price: 125000,
    mileage: 22000,
    color: "Azul",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV compacto, porta-malas amplo.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Ar digital", "Vidros elétricos", "Bancos em couro", "Sensor de luz"]
  },
  {
    id: "10",
    brand: "Hyundai",
    model: "Creta",
    year: 2022,
    price: 115000,
    mileage: 35000,
    color: "Prata",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV versátil, revisões em dia.",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Bancos em couro", "Sensores", "Câmera de ré"]
  },
  {
    id: "11",
    brand: "Nissan",
    model: "Kicks",
    year: 2023,
    price: 118000,
    mileage: 20000,
    color: "Laranja",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV urbano estiloso.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Sistema multimídia", "Ar-condicionado digital", "Sensor de luz", "Freios ABS"]
  },
  {
    id: "12",
    brand: "Nissan",
    model: "Versa",
    year: 2024,
    price: 108000,
    mileage: 7000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Sedan espaçoso, baixa quilometragem.",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Ar digital", "Bancos ajustáveis", "Direção elétrica"]
  },
  {
    id: "13",
    brand: "Renault",
    model: "Kwid",
    year: 2023,
    price: 62000,
    mileage: 16000,
    color: "Laranja",
    transmission: "Manual",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Econômico ideal para cidade.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Ar-condicionado", "Central multimídia", "Vidros elétricos", "Computador de bordo"]
  },
  {
    id: "14",
    brand: "Renault",
    model: "Duster",
    year: 2022,
    price: 95000,
    mileage: 40000,
    color: "Verde",
    transmission: "Manual",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV robusto para aventuras.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Ar-condicionado", "Central multimídia", "Porta-malas amplo"]
  },
  {
    id: "15",
    brand: "Ford",
    model: "Ranger",
    year: 2021,
    price: 185000,
    mileage: 55000,
    color: "Azul",
    transmission: "Automática",
    fuel: "Diesel",
    category: "commercial",
    featured: false,
    description: "Picape forte e confiável.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Caçamba", "Central multimídia", "Bancos de couro"]
  },
  {
    id: "16",
    brand: "Toyota",
    model: "Hilux",
    year: 2022,
    price: 245000,
    mileage: 38000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Diesel",
    category: "commercial",
    featured: false,
    description: "Lendária resistência e potência.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Tração reduzida", "Sistema multimídia", "Câmera de ré"]
  },
  {
    id: "17",
    brand: "Chevrolet",
    model: "Tracker",
    year: 2023,
    price: 142000,
    mileage: 19000,
    color: "Preto",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV tecnológico e moderno.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["MyLink", "OnStar", "Teto solar", "Bancos de couro"]
  },
  {
    id: "18",
    brand: "Peugeot",
    model: "208",
    year: 2023,
    price: 88000,
    mileage: 14000,
    color: "Cinza",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "Hatch premium francês.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    features: ["I-Cockpit", "Ar digital", "Vidros elétricos", "Rodas de liga"]
  },
  {
    id: "19",
    brand: "Peugeot",
    model: "2008",
    year: 2022,
    price: 115000,
    mileage: 28000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV compacto elegante.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["I-Cockpit", "Grip Control", "Sensores", "Central multimídia"]
  },
  {
    id: "20",
    brand: "BYD",
    model: "Dolphin",
    year: 2024,
    price: 155000,
    mileage: 3000,
    color: "Azul",
    transmission: "Automática",
    fuel: "Elétrico",
    category: "car",
    featured: false,
    description: "Elétrico moderno, baixo custo de uso.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop",
    features: ["100% elétrico", "Autonomia 400km", "Carregamento rápido", "Tela central"]
  },
  {
    id: "21",
    brand: "Fiat",
    model: "Toro",
    year: 2023,
    price: 138000,
    mileage: 24000,
    color: "Cinza",
    transmission: "Automática",
    fuel: "Diesel",
    category: "commercial",
    featured: false,
    description: "Picape média versátil.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    features: ["4x4", "Central multimídia", "Bancos de couro", "Ar digital"]
  },
  {
    id: "22",
    brand: "Honda",
    model: "HR-V",
    year: 2022,
    price: 135000,
    mileage: 32000,
    color: "Prata",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV compacto com banco mágico.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Banco mágico", "Central multimídia", "Câmera de ré", "Sensor de chuva"]
  },
  {
    id: "23",
    brand: "Volkswagen",
    model: "Nivus",
    year: 2023,
    price: 112000,
    mileage: 17000,
    color: "Branco",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV cupê estiloso.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["VW Play", "Ar digital", "Comandos no volante", "Faróis LED"]
  },
  {
    id: "24",
    brand: "Caoa Chery",
    model: "Tiggo 5X",
    year: 2023,
    price: 105000,
    mileage: 21000,
    color: "Vermelho",
    transmission: "Automática",
    fuel: "Flex",
    category: "car",
    featured: false,
    description: "SUV com ótimo custo-benefício.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    features: ["Central multimídia", "Ar-condicionado", "Rodas de liga", "Vidros elétricos"]
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

export const extractBrandAndModel = (query: string): { brand: string | null; model: string | null } => {
  const lowerQuery = query.toLowerCase().trim();
  
  for (const brand of brands) {
    const brandLower = brand.name.toLowerCase();
    
    // Check if query contains the brand name
    if (lowerQuery.includes(brandLower)) {
      // Try to find a matching model
      for (const model of brand.models) {
        const modelLower = model.toLowerCase();
        if (lowerQuery.includes(modelLower)) {
          return { brand: brand.name, model };
        }
      }
      // Found brand but no specific model
      return { brand: brand.name, model: null };
    }
    
    // Check if query is just a model name
    for (const model of brand.models) {
      const modelLower = model.toLowerCase();
      if (lowerQuery === modelLower || lowerQuery.includes(modelLower)) {
        return { brand: brand.name, model };
      }
    }
  }
  
  return { brand: null, model: null };
};
