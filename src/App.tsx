import { SwarmProvider } from './contexts/SwarmContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <SwarmProvider>
      <Dashboard />
    </SwarmProvider>
  );
}

export default App;
