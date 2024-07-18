"use client";
import ProductTable from "@/_components/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMzE5NTAzLCJpYXQiOjE3MjEzMTkyMDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFlMzdjYzhjLWFhNjUtNDI5OC1hODk1LTQ2NWY1NjRmYWQ4YiIsInN1YiI6IjIxYTIwLmpveXdpbkBzamVjLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIxZTM3Y2M4Yy1hYTY1LTQyOTgtYTg5NS00NjVmNTY0ZmFkOGIiLCJjbGllbnRTZWNyZXQiOiJpeWpuWGFaS0VublVMbG5VIiwib3duZXJOYW1lIjoiSm95d2luIEJlbm5pcyIsIm93bmVyRW1haWwiOiIyMWEyMC5qb3l3aW5Ac2plYy5hYy5pbiIsInJvbGxObyI6IjRTTzIxQ1MwNzEifQ.9fJ-6JeFASuXuLMBEI6K-leYwej__-ZHgaE--aVKAto";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (companyname && categoryname) {
      fetchData();
    }
  }, [companyname, categoryname]);

  return (
    <div className="mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Top 10 Products</h1>
      <h2 className="text-xl mb-2">Company: {companyname}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId} className="text-black">
            hii9
            {product.productName} - ${product.price}
          </li>
        ))}
        <ProductTable />
      </ul>
    </div>
  );
};

export default ProductsPage;
