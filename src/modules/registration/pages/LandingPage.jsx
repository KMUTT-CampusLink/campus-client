import AnnouncementCard from "../components/AnnouncementCard";
import EventCard from "../components/EventCard";
import FooterCard from "../components/FooterCard";
import HeroCard from "../components/HeroCard";
import NavBar from "../components/NavBarComponents/NavBar";
import NewsCard from "../components/NewsCard";
import { mainStyles, containerDivStyles } from "../styles/styles";

function LandingPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeroCard />
        <EventCard />
        <NewsCard />
        <AnnouncementCard />
      </main>
      <FooterCard />
    </div>
  );
}

export default LandingPage;
