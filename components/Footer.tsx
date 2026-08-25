export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-10">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm opacity-80">
        © {new Date().getFullYear()} Mohan Regmi
      </div>
    </footer>
  );
}
