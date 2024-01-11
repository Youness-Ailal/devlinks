function ErrorFallback({ error }) {
  return (
    <div className="rounded-md space-y-4 bg-slate-100 max-w-[50rem] mx-auto mt-[10rem] px-8 py-6 text-center">
      <h1 className="text-2xl text-gray-900 font-medium">
        something went wrong😓
      </h1>
      <p className="text-xl text-gray-700">{error.message}</p>
    </div>
  );
}

export default ErrorFallback;
