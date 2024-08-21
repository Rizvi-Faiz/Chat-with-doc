'use client';

import Image from "next/image";
import Header from "./components/Header";
import PdfUpload from "./components/PdfUpload";
import AiChat from "./components/AiChat";
import { useEffect, useState } from "react";
import { ThemeProvider } from './context/theme';

export default function Home() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  // Apply theme class to the html element
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.remove("light", "dark");
      htmlElement.classList.add(themeMode);
    }

    const bodyElement = document.body;
    bodyElement.classList.remove("bg-gray-900", "bg-white");
    if (themeMode === "dark") {
      bodyElement.classList.add("bg-gray-900");
    } else {
      bodyElement.classList.add("bg-white");
    }
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div>
        <Header />
        <PdfUpload />
        <AiChat />
      </div>
    </ThemeProvider>
  );
}
