"use client";
import ProductTable from "@/_components/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Product {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
}

const ProductsPage = () => {
  const router = useRouter();
  const companyname = "AMZ";
  const categoryname = "Laptop"; // Adjusted category name
  const [products, setProducts] = useState<Product[]>([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMzIwNDQyLCJpYXQiOjE3MjEzMjAxNDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFlMzdjYzhjLWFhNjUtNDI5OC1hODk1LTQ2NWY1NjRmYWQ4YiIsInN1YiI6IjIxYTIwLmpveXdpbkBzamVjLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIxZTM3Y2M4Yy1hYTY1LTQyOTgtYTg5NS00NjVmNTY0ZmFkOGIiLCJjbGllbnRTZWNyZXQiOiJpeWpuWGFaS0VublVMbG5VIiwib3duZXJOYW1lIjoiSm95d2luIEJlbm5pcyIsIm93bmVyRW1haWwiOiIyMWEyMC5qb3l3aW5Ac2plYy5hYy5pbiIsInJvbGxObyI6IjRTTzIxQ1MwNzEifQ.iPv6u5qk5BpopqDrFKOgyLE91utHTv6hfIvtvniQrMc";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyname}/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched Products:", data); // Log fetched data
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (companyname && categoryname) {
      fetchData();
    }
  }, [companyname, categoryname, token]);

  useEffect(() => {
    console.log("Products State:", products);
  }, [products]);

  return (
    <div className="mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Top 10 Products</h1>
      <h2 className="text-xl mb-2">Company: {companyname}</h2>
      <Table className="w-full bg-white shadow-md rounded my-6">
        <TableCaption className="text-center font-bold uppercase">
          Product List
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Discount</TableHead>
            <TableHead className="text-right">Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {product.productName}
              </TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">{product.discount}%</TableCell>
              <TableCell className="text-right">
                {product.availability}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="py-4 text-center">
              Total Products: {products.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductsPage;
