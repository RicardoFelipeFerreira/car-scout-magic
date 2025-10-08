import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache em memória (expira após 1 hora)
let cachedBrands: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    console.log('FIPE Proxy - Action:', action);

    // Verificar cache
    const isCacheValid = cachedBrands && (Date.now() - cacheTimestamp < CACHE_DURATION);

    if (action === 'brands') {
      // Se tem cache válido, retorna do cache
      if (isCacheValid) {
        console.log('Retornando marcas do cache');
        return new Response(JSON.stringify(cachedBrands), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Buscar todas as marcas
      console.log('Buscando marcas da API FIPE');
      const brandsResponse = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
      const brands = await brandsResponse.json();

      // Para cada marca, buscar seus modelos (limitar para não sobrecarregar)
      const brandsWithModels = await Promise.all(
        brands.slice(0, 20).map(async (brand: any) => {
          try {
            const modelsResponse = await fetch(
              `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos`
            );
            const modelsData = await modelsResponse.json();
            
            return {
              name: brand.nome,
              code: brand.codigo,
              models: modelsData.modelos ? modelsData.modelos.map((m: any) => m.nome) : []
            };
          } catch (error) {
            console.error(`Erro ao buscar modelos da marca ${brand.nome}:`, error);
            return {
              name: brand.nome,
              code: brand.codigo,
              models: []
            };
          }
        })
      );

      // Salvar no cache
      cachedBrands = brandsWithModels;
      cacheTimestamp = Date.now();

      console.log(`Cache atualizado com ${brandsWithModels.length} marcas`);

      return new Response(JSON.stringify(brandsWithModels), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'models') {
      const brandCode = url.searchParams.get('brandCode');
      if (!brandCode) {
        throw new Error('Código da marca não fornecido');
      }

      console.log('Buscando modelos da marca:', brandCode);
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`
      );
      const data = await response.json();

      return new Response(JSON.stringify(data.modelos || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Ação inválida' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no FIPE Proxy:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
