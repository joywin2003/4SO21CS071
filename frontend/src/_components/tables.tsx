"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";



interface Product {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
}
const ProductTable: React.FC<{ product: Product }> = ({ product }) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const sortByRate = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.rate - b.rate);
    setSortedProducts(sorted);
  };

  const sortByDiscount = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.discount - b.discount);
    setSortedProducts(sorted);
  };

  const sortByAvailability = () => {
    const sorted = [...sortedProducts].sort(
      (a, b) => Number(b.available) - Number(a.available)
    );
    setSortedProducts(sorted);
  };

  return (
    <div>
      <Table className="w-full bg-white shadow-md rounded my-6">
        <TableCaption className="text-center font-bold uppercase">
          Product List
        </TableCaption>
        <TableHeader className="border-b">
          <TableRow>
            <TableHead className="py-2">Name</TableHead>
            <TableHead className="py-2">Company</TableHead>
            <TableHead className="py-2">Category</TableHead>
            <TableHead className="py-2 text-right">Rate</TableHead>
            <TableHead className="py-2 text-right">Discount</TableHead>
            <TableHead className="py-2 text-right">Available</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="py-3 px-6 font-medium">
                {product.productName}
              </TableCell>
              <TableCell className="py-3 px-6">${product.price}</TableCell>
              <TableCell className="py-3 px-6">{product.rating}</TableCell>
              <TableCell className="py-3 px-6 text-right">
                {product.discount}%
              </TableCell>
              <TableCell className="py-3 px-6 text-right">
                {product.availability}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="py-4 text-center">
              Total Products: {sortedProducts.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-center space-x-4 my-6">
        <Button onClick={sortByRate} className=" px-4 rounded">
          Sort by Rate
        </Button>
        <Button
          onClick={sortByDiscount}
          className=" text-white py-2 px-4 rounded"
        >
          Sort by Discount
        </Button>
        <Button
          onClick={sortByAvailability}
          className=" text-white py-2 px-4 rounded"
        >
          Sort by Availability
        </Button>
      </div>
    </div>
  );
}


export default ProductTable;