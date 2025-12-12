import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Masculino from './pages/Masculino';
import ProductDetail from './pages/ProductDetail';
import Femenino from './pages/Femenino';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Brands from './pages/admin/Brands';
import Materials from './pages/admin/Materials';
import Colors from './pages/admin/Colors';
import Genders from './pages/admin/Genders';
import Sizes from './pages/admin/Sizes';
import Origins from './pages/admin/Origins';
import Status from './pages/admin/Status';
import Moderator from './pages/admin/Moderator';
import RequireAuth from './components/RequireAuth';
import BrandsAdmin from './pages/admin/BrandsAdmin';
import MaterialsAdmin from './pages/admin/MaterialsAdmin';
import ColorsAdmin from './pages/admin/ColorsAdmin';
import GendersAdmin from './pages/admin/GendersAdmin';
import SizesAdmin from './pages/admin/SizesAdmin';
import OriginsAdmin from './pages/admin/OriginsAdmin';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Masculino />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/masculino" element={<Masculino />} />
      <Route path="/masculino/:id" element={<ProductDetail />} />
      <Route path="/femenino" element={<Femenino />} />
      <Route path="/femenino/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin/brands" element={<RequireAuth><Brands /></RequireAuth>} />
      <Route path="/admin/materials" element={<RequireAuth><Materials /></RequireAuth>} />
      <Route path="/admin/colors" element={<RequireAuth><Colors /></RequireAuth>} />
      <Route path="/admin/genders" element={<RequireAuth><Genders /></RequireAuth>} />
      <Route path="/admin/sizes" element={<RequireAuth><Sizes /></RequireAuth>} />
      <Route path="/admin/origins" element={<RequireAuth><Origins /></RequireAuth>} />
      <Route path="/admin/status" element={<RequireAuth><Status /></RequireAuth>} />
          <Route path="/admin/moderator" element={<RequireAuth allowedRoles={["admin","moderator"]}><Moderator /></RequireAuth>} />
          <Route path="/admin/moderator/public" element={<Moderator />} />
      <Route path="/admin/brands/manage" element={<RequireAuth><BrandsAdmin /></RequireAuth>} />
      <Route path="/admin/materials/manage" element={<RequireAuth><MaterialsAdmin /></RequireAuth>} />
      <Route path="/admin/colors/manage" element={<RequireAuth><ColorsAdmin /></RequireAuth>} />
      <Route path="/admin/genders/manage" element={<RequireAuth><GendersAdmin /></RequireAuth>} />
      <Route path="/admin/sizes/manage" element={<RequireAuth><SizesAdmin /></RequireAuth>} />
      <Route path="/admin/origins/manage" element={<RequireAuth><OriginsAdmin /></RequireAuth>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
