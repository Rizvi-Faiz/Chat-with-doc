import Image from "next/image";
import Header from "./components/Header";
import PdfUpload from "./components/PdfUpload";
import AiChat from "./components/AiChat";


export default function Home() {
  return (
    <div>
      <Header />
      <PdfUpload />
      <AiChat />
    </div>
  );
}
