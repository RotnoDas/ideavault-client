import Banner from "@/components/banner/Banner";
import FeaturedIdeas from "@/components/featured-ideas/FeaturedIdeas";
import Categories from "@/components/categories/Categories";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import CallToAction from "@/components/call-to-action/CallToAction";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedIdeas></FeaturedIdeas>
      <Categories></Categories>
      <HowItWorks></HowItWorks>
      <CallToAction></CallToAction>
    </div>
  );
}
