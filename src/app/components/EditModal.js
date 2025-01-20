'use client';

import { useState } from 'react';

export default function EditModal({ item, onClose, onSubmit }) {
  const [name, setName] = useState(item.name);
  const [stock, setStock] = useState(item.stock);
  const [price, setPrice] = useState(item.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: item.id, name, stock: parseInt(stock), price: parseFloat(price) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Edit Barang</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Nama Barang"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Stok Barang"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Harga Barang"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mr-2">
              Batal
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
