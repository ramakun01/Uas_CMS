"use client";

import React, { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function TransaksiPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const router = useRouter();

 
  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      console.error(error);
    } else {
      setItems(data);
    }
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    calculateTotal();
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    calculateTotal();
  };

  const handlePurchase = async () => {
    for (let item of cart) {
      const { error } = await supabase
        .from("items")
        .update({ stock: item.stock - item.quantity })
        .eq("id", item.id);
      if (error) {
        console.error(error);
      }
    }


    const { error: transactionError } = await supabase.from("transactions").insert([{
      items: cart,
      total_price: total,
      created_at: new Date(),
    }]);

    if (transactionError) {
      console.error("Error saving transaction:", transactionError);
    }

    setCart([]); 
    setTotal(0); 
    alert("Transaksi berhasil!");
    router.push("/");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>Transaksi Pembelian</h1>
      <div className="item-list">
        <h2>Daftar Barang</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong> - Harga: Rp {item.price} - Stok: {item.stock}
              </div>
              <button onClick={() => addToCart(item)}>Tambah ke Keranjang</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="cart">
        <h2>Keranjang Belanja</h2>
        {cart.length === 0 ? (
          <p>Keranjang belanja kosong</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div>
                  {item.name} - {item.quantity} x Rp {item.price} = Rp {item.quantity * item.price}
                </div>
                <button onClick={() => removeFromCart(item.id)}>Hapus</button>
              </li>
            ))}
          </ul>
        )}
        <div className="total">
          <strong>Total: Rp {total}</strong>
        </div>
        {cart.length > 0 && (
          <button onClick={handlePurchase} className="purchase-button">
            Proses Transaksi
          </button>
        )}
      </div>

      <button className="back-button" onClick={() => router.push("/")}>Kembali ke Halaman Utama</button>
    </div>
  );
}
