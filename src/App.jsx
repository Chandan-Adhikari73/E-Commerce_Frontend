import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="animate-fadeIn">
        <ProductPage />
      </main>
    </div>
  );
}