// import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api';
import ProductListLoading from './Loading';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

 const fetchProducts =async ()=>{
     setLoading(true);
     setError(null);
    try{
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
    } catch(error){
        setError('fail to get products');
        setLoading(false);
    }
 }
  // Static product data
//   const products = [
//     {
//       id: 1,
//       name: "Classic Croissant",
//       price: 3.99,
//       category: "Pastries",
//       quantity: 50,
//       description: "Buttery, flaky croissant made with premium French butter",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 2,
//       name: "Sourdough Bread",
//       price: 6.99,
//       category: "Breads",
//       quantity: 30,
//       description: "Traditional sourdough bread with a crispy crust and chewy interior",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 3,
//       name: "Chocolate Eclair",
//       price: 4.99,
//       category: "Pastries",
//       quantity: 25,
//       description: "Choux pastry filled with cream and topped with chocolate ganache",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 4,
//       name: "Cinnamon Roll",
//       price: 4.49,
//       category: "Sweet Treats",
//       quantity: 40,
//       description: "Soft rolled pastry with cinnamon filling and cream cheese frosting",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 5,
//       name: "Baguette",
//       price: 3.49,
//       category: "Breads",
//       quantity: 35,
//       description: "Classic French bread with crispy crust and light, airy interior",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       id: 6,
//       name: "Fruit Tart",
//       price: 5.99,
//       category: "Desserts",
//       quantity: 20,
//       description: "Buttery tart shell filled with custard and topped with fresh fruits",
//       image: "/api/placeholder/300/200"
//     }
//   ];

  return (
    <>
      <style>
        {`
          .products-container {
            min-height: 100vh;
            background-color: #fff9e6;
            padding: 2rem 1rem;
          }

          .products-content {
            max-width: 1200px;
            margin: 0 auto;
          }

          .products-title {
            font-size: 2rem;
            font-weight: bold;
            color: #92400e;
            text-align: center;
            margin-bottom: 2rem;
          }

          .category-filter {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }

          .filter-button {
            padding: 0.5rem 1rem;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.3s ease;
          }

          .filter-button.active {
            background-color: #d97706;
            color: white;
          }

          .filter-button:not(.active) {
            background-color: white;
            color: #d97706;
          }

          .filter-button:hover:not(.active) {
            background-color: #fff9e6;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            padding: 1rem;
          }

          .product-card {
            background-color: white;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-5px);
          }

          .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .product-info {
            padding: 1.5rem;
          }

          .product-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
          }

          .product-name {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
          }

          .product-category {
            background-color: #fff9e6;
            color: #92400e;
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.75rem;
          }

          .product-description {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .product-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .price-info {
            display: flex;
            flex-direction: column;
          }

          .product-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #d97706;
          }

          .product-quantity {
            font-size: 0.875rem;
            color: #666;
          }

          .add-to-cart {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: #d97706;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .add-to-cart:hover {
            background-color: #b45309;
          }

          @media (max-width: 768px) {
            .products-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .product-footer {
              flex-direction: column;
              gap: 1rem;
              align-items: flex-start;
            }

            .add-to-cart {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="products-container">
        {loading ?<ProductListLoading/>:<div className="products-content">
          <h1 className="products-title">Our Fresh Bakery Products</h1>
          
          <div className="category-filter">
            <button className="filter-button active">All</button>
            <button className="filter-button">Breads</button>
            <button className="filter-button">Pastries</button>
            <button className="filter-button">Desserts</button>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <div className="price-info">
                      <span className="product-price">${product.price}</span>
                      <span className="product-quantity">{product.quantity} left</span>
                    </div>
                    <button className="add-to-cart">
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>} 
      </div>
    </>
  );
};

export default ProductList;