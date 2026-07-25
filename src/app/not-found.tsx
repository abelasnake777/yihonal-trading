import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Header />
      <section>
        <p>404 · Page not found</p>
        <h1>The page you requested is not here.</h1>
        <span>Explore Yihonal Trading&apos;s Ethiopian specialty coffee pages or return home.</span>
        <div>
          <Link href="/">Return home</Link>
          <Link href="/ethiopian-coffee">Explore Ethiopian coffee</Link>
        </div>
      </section>
    </main>
  );
}
