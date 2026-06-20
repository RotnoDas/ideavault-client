import Banner from "@/components/banner/Banner";
import FeaturedIdeas from "@/components/featured-ideas/FeaturedIdeas";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedIdeas></FeaturedIdeas>
    </div>
  );
}
