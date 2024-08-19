import Image from "next/image";
import Header from "./components/Header";
import PdfUpload from "./components/PdfUpload";


export default function Home() {
  return (
    <div>
      <Header />
      <PdfUpload />
    </div>
  );
}
