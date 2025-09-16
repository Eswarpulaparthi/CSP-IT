export default function Cta({ children, shade = false }) {
  let className = shade
    ? "bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
    : "border border-green-300 hover:border-green-600 text-gray-700 hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors";
  return (
    <>
      <button className={className}>{children}</button>
    </>
  );
}
