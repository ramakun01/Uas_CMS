export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari Barang..."
      onChange={(e) => onSearch(e.target.value)}
      className="border p-2 w-full mb-6"
    />
  );
}
