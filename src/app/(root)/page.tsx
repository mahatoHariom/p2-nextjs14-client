import Brands from "@/components/Brands";
import Carousel from "@/components/Carousel";
import NewArrivals from "@/components/NewArrival";

export default function Home() {
  return (
    <>
      <Carousel />
      <Brands />
      <NewArrivals />
      {/* <Button>Hello button</Button> */}
    </>
  );
}
