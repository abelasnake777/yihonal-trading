import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/app/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/yihonal logo.PNG"
            alt="Yihonal Coffee"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-emerald-300/40"
            priority
          />
          <span className="truncate text-lg font-semibold text-white">Yihonal Trading</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
