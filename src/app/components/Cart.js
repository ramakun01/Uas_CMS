'use client';

export default function Cart({ cart, onPurchase }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - Rp {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: Rp {total.toFixed(2)}</p>
          <button onClick={onPurchase} className="bg-blue-500 text-white px-4 py-2">
            Beli
          </button>
        </>
      )}
    </div>
  );
}
