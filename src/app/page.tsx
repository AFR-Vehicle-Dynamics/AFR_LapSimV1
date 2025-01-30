import Image from 'next/image';
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center flex-row font-mono" data-theme="luxury">
      <Login/>
    </main>
  );
}
