import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importe os componentes das páginas
import WelcomePage from './pages/Welcome/WelcomePage';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/RegisterPage';
import PetsPage from './pages/Clientes/Home/Home'; // Página do Cliente

// Importe os novos componentes do funcionário
import HomePageFuncionario from './pages/Funcionário/Home/HomePageFuncionario';
import ListaClientes from './pages/Funcionário/components/ListaClientes/ListaClientes';
import ListaPetsFuncionario from './pages/Funcionário/components/ListaPetsFuncionário/ListaPetsFuncionario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas existentes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cliente" element={<PetsPage />} />

        {/* Novas Rotas Aninhadas para o Funcionário */}
        <Route path="/funcionario" element={<HomePageFuncionario />}>
          {/* Rota padrão: redireciona para a lista de clientes */}
          <Route index element={<Navigate to="clientes" replace />} />
          <Route path="clientes" element={<ListaClientes />} />
          <Route path="pets" element={<ListaPetsFuncionario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;