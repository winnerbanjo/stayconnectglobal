import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function PackagesPage() {
  return <div className="min-h-screen bg-[#111111] text-white">
    <Navbar />
    <main className="pt-36 pb-24 px-6 text-center space-y-6">
      <h1 className="font-serif text-4xl">Stay Packages</h1>
      <p className="text-neutral-400">No packages are currently published. Contact our concierge for availability and a tailored quote.</p>
      <a className="inline-block px-6 py-3 bg-[#C6A15B] text-black rounded-lg" href="https://wa.me/2347041008351">Contact Concierge</a>
    </main>
    <Footer />
  </div>;
}
