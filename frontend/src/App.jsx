import { useState } from "react";
import AboutPage from "./components/AboutPage";
import DownloadPage from "./components/DownloadPage";
import DeveloperPage from "./components/DeveloperPage";
import ContributePage from "./components/ContributePage";
import Navbar from "./components/Navbar"; // ✅ Import Navbar as separate component

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [downloading, setDownloading] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/downloads/agaradhi.exe";
    link.download = "Agaradhi SQLite Manager.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  const sharedProps = { 
    navigate, 
    currentPage, 
    onDownload: handleDownload, 
    downloading 
  };

  return (
    <>      
      {/* Render page content based on currentPage */}
       <Navbar
  navigate={navigate}
  currentPage={currentPage}
  onDownload={handleDownload}
  downloading={downloading}
/>
      {currentPage === "home" && <DownloadPage {...sharedProps} />}
      {currentPage === "about" && <AboutPage {...sharedProps} />}
      {currentPage === "developer" && <DeveloperPage {...sharedProps} />}
      {currentPage === "contribute" && <ContributePage {...sharedProps} />}
    </>
  );
}

export default App;