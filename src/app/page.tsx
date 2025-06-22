import { Navbar, Footer, Profile } from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Profile />
      </main>
      <Footer />
    </>
  );
}
