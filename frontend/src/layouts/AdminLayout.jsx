import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div>
            <header>
                <h2>Admin</h2>
                <nav>
                    <Link to="/admin/products">Products</Link> | <Link to="/admin/orders">Orders</Link>
                </nav>
            </header>
            <main><Outlet /></main>
        </div>
    );
}
