
import ContactListView from "./components/ContactListView";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Liên Hệ</h1>
      </div>
      <ContactListView />
    </main>
  );
}
