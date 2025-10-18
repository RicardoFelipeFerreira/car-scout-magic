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
  location: string;
  store: string;
  externalUrl?: string;
}

export interface Brand {
  name: string;
  logo: string;
  models: string[];
}

// Importar dados das marcas do JSON local
import brandsData from './brands.json';
import { parseCSVToVehicles } from '@/utils/csvParser';
import csvContent from './comprecar_catalogo.csv?raw';

// Logos das marcas (fallback)
const brandLogos: { [key: string]: string } = {
  "Fiat": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fiat_Automobiles_logo_2006.svg/200px-Fiat_Automobiles_logo_2006.svg.png",
  "VW - VolksWagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
  "Volkswagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
  "GM - Chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png",
  "Chevrolet": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png",
  "Toyota": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Toyota_EU.svg/200px-Toyota_EU.svg.png",
  "Hyundai": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Hyundai_logo_%282011%29.svg/200px-Hyundai_logo_%282011%29.svg.png",
  "Honda": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/200px-Honda_logo.svg.png",
  "Jeep": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Jeep_logo.svg/200px-Jeep_logo.svg.png",
  "Nissan": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/200px-Nissan_logo.svg.png",
  "Renault": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Renault_2015.svg/200px-Renault_2015.svg.png",
  "Peugeot": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Peugeot_2021.svg/200px-Peugeot_2021.svg.png",
  "Citroën": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Citro%C3%ABn_2022.svg/200px-Citro%C3%ABn_2022.svg.png",
  "CITROEN": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Citro%C3%ABn_2022.svg/200px-Citro%C3%ABn_2022.svg.png",
  "Ford": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo_2017.svg/200px-Ford_Motor_Company_Logo_2017.svg.png",
  "FORD": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo_2017.svg/200px-Ford_Motor_Company_Logo_2017.svg.png",
  "BYD": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/BYD_company_logo.svg/200px-BYD_company_logo.svg.png",
  "CAOA CHERY": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chery_Logo.svg/200px-Chery_Logo.svg.png",
  "Caoa Chery": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chery_Logo.svg/200px-Chery_Logo.svg.png",
  "Mitsubishi": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Mitsubishi_logo.svg/200px-Mitsubishi_logo.svg.png",
  "BMW": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png",
  "PORSCHE": "https://upload.wikimedia.org/wikipedia/de/thumb/8/87/Porsche_Logo.svg/200px-Porsche_Logo.svg.png",
  "Kia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kia_logo.svg/200px-Kia_logo.svg.png",
  "PEUGEOT": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Peugeot_2021.svg/200px-Peugeot_2021.svg.png",
  "JEEP": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Jeep_logo.svg/200px-Jeep_logo.svg.png",
  "CHEVROLET": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png",
  "NISSAN": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/200px-Nissan_logo.svg.png",
};

// Carregar marcas do JSON e adicionar logos, removendo duplicatas
const uniqueBrands = new Map<string, Brand>();
brandsData.forEach(brand => {
  if (!uniqueBrands.has(brand.name)) {
    uniqueBrands.set(brand.name, {
      name: brand.name,
      models: brand.models,
      logo: brandLogos[brand.name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=random`
    });
  }
});

export const brands: Brand[] = Array.from(uniqueBrands.values());

// Carregar veículos do CSV
export const vehicles: Vehicle[] = parseCSVToVehicles(csvContent);

export const searchVehicles = (query: string): Vehicle[] => {
  const lowerQuery = query.toLowerCase().trim();
  
  // Split query into words for flexible search
  const queryWords = lowerQuery.split(/\s+/);
  
  return vehicles.filter((v) => {
    const vehicleText = `${v.brand} ${v.model} ${v.year}`.toLowerCase();
    
    // Check if all query words are present in the vehicle text
    return queryWords.every(word => vehicleText.includes(word));
  });
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
  
  // Return all suggestions, not just first 5
  return suggestions;
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
