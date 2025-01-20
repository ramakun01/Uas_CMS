export default function Table({ items, onEdit }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Stock</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.stock}</td>
            <td>Rp.{item.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
