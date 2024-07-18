"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
  productId: string;
  productName: string;
  price: number;
}

const ProductsPage = () => {
  const router = useRouter();
  const companyname = "AMZ";
  const categoryname = "Phones";
  const [products, setProducts] = useState<Product[]>([]);  
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (companyname && categoryname) {
      fetchData();
    }
  }, [companyname, categoryname]);

  return (
    <div>
      <h1>Top 10 Products</h1>
      <h2>Company: {companyname}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId} className='text-black'>
            hii9
            {product.productName} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
