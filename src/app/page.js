'use client';
import React, { useState, useEffect } from "react";
import supabase from "./lib/supabaseClient";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/navigation";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      console.error(error);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Manjemen Barang</h1>
      </header>

      <div className="content">
        <div className="search-add-bar">
          <SearchBar onSearch={(value) => setSearch(value)} />
          <button
            className="add-item-button"
            onClick={() => router.push("/add-item")}
          >
            Add Item
          </button>
        </div>

        <Table items={filteredItems} />


        <div className="transaction-button">
          <button
            className="btn-transaksi"
            onClick={() => router.push("/transaksi")}
          >
            Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}
  