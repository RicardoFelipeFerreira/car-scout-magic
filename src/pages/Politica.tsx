const Politica = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Política de Privacidade - Busca Car
          </h1>
          
          <div className="space-y-4 text-foreground/90">
            <p>
              O aplicativo Busca Car utiliza informações públicas de anúncios de veículos 
              disponíveis em plataformas de terceiros, como Mercado Livre, com o objetivo de 
              consolidar dados de forma transparente e facilitar a busca por veículos.
            </p>
            
            <p>
              Não coletamos, armazenamos ou compartilhamos informações pessoais de usuários.
            </p>
            
            <p>
              O acesso à API do Mercado Livre é utilizado apenas para leitura de dados públicos 
              de anúncios, conforme as políticas de uso da plataforma.
            </p>
            
            <p>
              Para dúvidas ou solicitações, entre em contato com:{" "}
              <a 
                href="mailto:ricardo_fferreira1@hotmail.com"
                className="text-primary hover:underline"
              >
                ricardo_fferreira1@hotmail.com
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Politica;
