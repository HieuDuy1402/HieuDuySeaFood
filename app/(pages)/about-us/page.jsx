import About from "./components/About";

export default async function Page() {
    return (
      <main className="flex flex-col gap-1 min-h-screen p-5">
        <About/>
      </main>
    );
  }