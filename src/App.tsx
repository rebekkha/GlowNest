
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Orders from './pages/Orders';
import Auth from './pages/Auth';

import Scanner from './pages/Scanner';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:type" element={<Category />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Auth />} />
          <Route path="scan" element={<Scanner />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
