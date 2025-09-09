// App.jsx
import { Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

// Layouts
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// User site
import Home from "./pages/user/Home.jsx";
import Shop from "./pages/user/Shop.jsx";
import ProductDetail from "./pages/user/ProductDetail.jsx";
import PlaceOrder from "./pages/user/PlaceOrder.jsx";
import Tracking from "./pages/user/Tracking.jsx";
import WishList from "./pages/user/WishList.jsx";

// Admin site
import ProductsList from "./pages/admin/ProductsList.jsx";
import ProductCreate from "./pages/admin/ProductCreate.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import OrderList from "./pages/admin/OrderList.jsx";      // <- ไม่มี s
import OrderDetail from "./pages/admin/OrderDetail.jsx";

function App() {
    return (
        <Routes>
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* User site */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/wishlist" element={<WishList />} />
            </Route>

            {/* Admin site */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="products" element={<ProductsList />} />
                <Route path="products/new" element={<ProductCreate />} />
                <Route path="products/:id/edit" element={<ProductEdit />} />
                <Route path="orders" element={<OrderList />} />          {/* <- เปลี่ยนชื่อให้ตรงไฟล์ */}
                <Route path="orders/:id" element={<OrderDetail />} />
            </Route>
        </Routes>
    );
}

export default App;
