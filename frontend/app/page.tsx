import ModGenerator from "@/components/ModGenerator";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-bold text-center">
        ExoCad Script Pack Generator
      </h1>
      <ModGenerator />
      <footer className="mt-12 text-sm text-gray-400 text-center">
        &copy; 2025 cadtechx89
      </footer>
    </main>
  );
}