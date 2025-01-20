"use client";

import React, { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddEditItemPage() {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const router = useRouter();

  // Fetch items from Supabase
  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      console.error("Error fetching items:", error.message);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Update item
      const { error } = await supabase
        .from("items")
        .update({ name, stock: parseInt(stock), price: parseFloat(price) })
        .eq("id", editItemId);

      if (error) {
        alert("Failed to update item: " + error.message);
      } else {
        alert("Item updated successfully!");
      }
    } else {

      const { error } = await supabase.from("items").insert([
        { name, stock: parseInt(stock), price: parseFloat(price) },
      ]);

      if (error) {
        alert("Failed to add item: " + error.message);
      } else {
        alert("Item added successfully!");
      }
    }

    // Reset form
    setName("");
    setStock("");
    setPrice("");
    setIsEditMode(false);
    setEditItemId(null);
    fetchItems();
  };


  const handleEdit = (item) => {
    setName(item.name);
    setStock(item.stock);
    setPrice(item.price);
    setEditItemId(item.id);
    setIsEditMode(true);
  };


  const handleDelete = async (id) => {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) {
      alert("Failed to delete item: " + error.message);
    } else {
      alert("Item deleted successfully!");
      fetchItems(); 
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Atur Barang</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditMode ? "Update Item" : "Add Item"}
        </button>
      </form>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.stock}</td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Home
      </button>
    </div>
  );
}
