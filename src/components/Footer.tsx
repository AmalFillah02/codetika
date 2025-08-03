import Link from "next/link";
import { Github, Linkedin, Instagram, Code2, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Logo & Deskripsi */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/codetika-white.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-indigo-300">
              Membantu bisnis dan individu membangun industri digital yang kuat.
            </p>
          </div>

          {/* Kolom Navigasi */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2 text-indigo-300">
              <li>
                <Link href="/about" className="hover:text-pink-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-pink-400 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-pink-400 transition">
                  Order Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Layanan */}
          <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2 text-indigo-300">
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition">
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom Sosial Media */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/codetika.id/"
                target="_blank"
                aria-label="Instagram"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                <Instagram />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Facebook"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                <Facebook />
              </a>
              <a
                href="https://wa.me/6282138199126"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                <SiWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-indigo-700 pt-8 text-center text-indigo-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} CODETIKA . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
