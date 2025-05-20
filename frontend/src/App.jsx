import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NGODashboard from './pages/NGODashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';

function App() {
  return (
    <div className="min-h-screen p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/">Home</Link>
        <Link to="/ngo">NGO Dashboard</Link>
        <Link to="/restaurant">Restaurant Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ngo" element={<NGODashboard />} />
        <Route path="/restaurant" element={<RestaurantDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
