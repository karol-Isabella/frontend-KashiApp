import { Auth } from './modules/auth/components/Auth';
import { Dashboard } from './modules/dashboard/components/Dashboard';
import { useAuth } from './modules/auth/hooks/useAuth';
import './styles/App.css';

/**
 * App Component
 * Punto de entrada de la aplicación
 *
 * Siguiendo Screaming Architecture:
 * - El código grita que esta es una aplicación de autenticación (Auth)
 * - Los módulos están organizados por dominio, no por capas técnicas
 * - La estructura es escalable y mantenible
 */
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App
