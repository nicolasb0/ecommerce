import './App.scss';
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from './components/Footer';

function App() {
  let navigate = useNavigate();

  function goToAdd() {
    navigate("/addproduct");
  };

  function goToList() {
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<div className="page">
          <ProductList onAddClick={goToAdd} />
          <Footer />
        </div>}
      />
      <Route
        path="addproduct"
        element={<div className="page">
          <ProductAdd onCancelClick={goToList} onProductSaved={goToList} />
          <Footer />
        </div>}
      />
    </Routes>
  );
};

export default App;
