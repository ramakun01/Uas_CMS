'use client';

import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !stock || !price) return;

    const { error } = await supabase.from('items').insert([{ name, stock: parseInt(stock), price: parseFloat(price) }]);
    if (error) {
      console.error(error);
    } else {
      setName('');
      setStock('');
      setPrice('');
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Nama Barang"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Stok Barang"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Harga Barang"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Tambah Barang
      </button>
    </form>
  );
}
