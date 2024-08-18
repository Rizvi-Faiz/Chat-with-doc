import Image from "next/image";
import Header from "./components/Header";
import PdfUpload from "./components/PdfUpload";


export default function Home() {
  return (
    <div>
      <Header />
      <h1>Welcome to my website</h1>
      <PdfUpload />
    </div>
  );
}
