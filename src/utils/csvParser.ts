import { Vehicle } from "@/data/vehicles";

export function parseCSVToVehicles(csvContent: string): Vehicle[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const vehicles: Vehicle[] = [];
  const seen = new Set<string>(); // Para detectar duplicatas
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Parse CSV line (handling commas inside quotes)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length < 8) continue;
    
    const [ano, cidade, foto_url, km, link, loja, preco, titulo] = values;
    
    // Clean link (remove duplicate domain)
    const cleanLink = link.replace('https://www.comprecar.com.brhttps://', 'https://');
    
    // Skip duplicates based on link
    if (seen.has(cleanLink)) continue;
    seen.add(cleanLink);
    
    // Parse year
    const year = parseInt(ano);
    if (isNaN(year)) continue;
    
    // Parse price: "R$118.900,00" -> 118900
    const price = parseFloat(preco.replace(/[R$\s.]/g, '').replace(',', '.'));
    if (isNaN(price)) continue;
    
    // Parse mileage: "KM 124.000" -> 124000
    let mileage = 0;
    if (km && km !== 'KM N/D' && km.trim() !== '') {
      const kmValue = km.replace(/[KM\s.]/g, '').replace(',', '.');
      mileage = parseFloat(kmValue);
      if (isNaN(mileage)) mileage = 0;
    }
    
    // Extract brand and model from title
    const titleParts = titulo.split(' ');
    let brand = titleParts[0] || 'Desconhecido';
    
    // Special cases for multi-word brands
    if (brand === 'VW' || (titleParts[0] === 'VW' && titleParts[1] === '-')) {
      brand = 'Volkswagen';
    } else if (brand === 'GM' || (titleParts[0] === 'GM' && titleParts[1] === '-')) {
      brand = 'Chevrolet';
    } else if (brand === 'CAOA') {
      brand = 'Caoa Chery';
    }
    
    // Extract model (second word typically)
    let model = titleParts[1] || '';
    if (titleParts[1] === '-' && titleParts.length > 2) {
      model = titleParts[2];
    }
    
    // Determine category based on model name
    let category: "car" | "motorcycle" | "commercial" = "car";
    const modelLower = model.toLowerCase();
    const titleLower = titulo.toLowerCase();
    
    if (
      modelLower.includes('strada') || 
      modelLower.includes('toro') ||
      modelLower.includes('amarok') ||
      modelLower.includes('hilux') ||
      modelLower.includes('ranger') ||
      modelLower.includes('montana') ||
      modelLower.includes('kangoo') ||
      titleLower.includes('picape')
    ) {
      category = "commercial";
    }
    
    // Determine transmission (Manual or Automática)
    const transmission = titleLower.includes('automatic') || 
                        titleLower.includes('automático') || 
                        titleLower.includes('cvt') ||
                        titleLower.includes('dsg') ||
                        titleLower.includes('tiptronic')
      ? 'Automática' 
      : 'Manual';
    
    // Determine fuel type
    let fuel = 'Flex';
    if (titleLower.includes('diesel')) fuel = 'Diesel';
    else if (titleLower.includes('gasolina') && !titleLower.includes('flex')) fuel = 'Gasolina';
    else if (titleLower.includes('elétrico') || titleLower.includes('eletrico')) fuel = 'Elétrico';
    
    vehicles.push({
      id: cleanLink, // Use link as unique ID
      brand,
      model,
      year,
      price,
      mileage,
      color: 'N/D', // Not in CSV
      transmission,
      fuel,
      category,
      featured: vehicles.length < 10, // First 10 as featured
      description: titulo.substring(0, 100),
      image: foto_url,
      location: cidade,
      store: loja,
      externalUrl: cleanLink
    });
  }
  
  return vehicles;
}
