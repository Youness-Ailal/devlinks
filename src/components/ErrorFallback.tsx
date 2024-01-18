import Button from "@/components/ui/Button";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="rounded-md gap-4 flex flex-col items-center justify-center bg-slate-100 max-w-[50rem] mx-auto mt-[10rem] px-8 py-6 ">
      <h1 className="text-2xl text-gray-900 font-medium">
        something went wrong😓
      </h1>
      <p className="leading-8 text-base text-gray-700">{error.message}</p>
      <p className="mt-6">
        <Button onClick={resetErrorBoundary}>Try Again</Button>
      </p>
    </div>
  );
}

export default ErrorFallback;
