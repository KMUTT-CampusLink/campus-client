import FooterCard from "../components/FooterCard";
import NavBar from "../components/NavBarComponents/NavBar";
import NewsCard from "../components/NewsCard";
import { mainStyles, containerDivStyles } from "../styles/styles";

function LandingPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <NewsCard />
      </main>
      <FooterCard />
    </div>
  );
}

export default LandingPage;
