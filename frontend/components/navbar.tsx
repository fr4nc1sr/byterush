import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center justify-center border-b border-eco-200 bg-white shadow-sm">
      {/* Logo and brand name centered in the header */}
      <Link className="flex items-center justify-center" href="/">
        <Image src="/images/logo.png" alt="Carbonico Logo" width={44} height={44} className="mr-2" />
        <span className="text-2xl font-bold text-eco-800">Carbonico</span>
      </Link>
    </header>
  )
}

