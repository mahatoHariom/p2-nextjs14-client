import Footer from "@/components/Footer";
import MainNavbar from "@/components/Nav/MainNavbar";
import TopBar from "@/components/Nav/TopNavbar";
import Providers from "@/lib/Providers";
import dynamic from "next/dynamic";
const SearchNavbar = dynamic(() => import("@/components/Nav/SearchNavbar"), {
  ssr: false,
});

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TopBar />
      <SearchNavbar />
      <MainNavbar />
      <Providers>
        <main>{props.children}</main>
      </Providers>
      <Footer />
    </section>
  );
}
