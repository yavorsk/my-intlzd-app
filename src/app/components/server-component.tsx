export function MyServerComponent() {
  console.log("Server component rendered");

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <p className="text-lg font-semibold text-gray-800 text-center">
          This is a server component
        </p>
      </div>
    </div>
  );
}
