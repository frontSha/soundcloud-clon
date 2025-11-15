import Footer from "./Footer";

export default function Sidebar({children}) {
  return (
    <div
      aria-roledescription="sidebar"
      className="w-[360px] bg-base min-h-screen max-md:hidden"
    >
      <div>
        {children}
        <div className="px-8 pb-40">
          <Footer />
        </div>
      </div>
    </div>
  );
}
