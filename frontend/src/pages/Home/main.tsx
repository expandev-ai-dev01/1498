export const HomePage = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Bem-vindo ao Sistema de Cadastro de Bancos
      </h2>
      <p className="text-gray-600 mb-8">
        Sistema para gerenciamento de cadastro de bancos do sistema financeiro brasileiro.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Cadastrar Bancos</h3>
          <p className="text-gray-600">Adicione novos bancos ao sistema com código e nome.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultar Bancos</h3>
          <p className="text-gray-600">Busque e visualize informações dos bancos cadastrados.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Gerenciar Bancos</h3>
          <p className="text-gray-600">Edite ou exclua registros de bancos existentes.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
