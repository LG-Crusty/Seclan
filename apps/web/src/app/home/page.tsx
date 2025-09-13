import dynamic from "next/dynamic";

const Home = dynamic(
  () => import('../../components/home/page'),
)
export default function HomePage() {

  return (
    <div className="w-screen h-screen">
    <Home/>
    </div>
  );
}
