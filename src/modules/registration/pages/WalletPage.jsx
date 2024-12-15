import BalanceCard from "../components/WalletComponents/BalanceCard";
import OptionCard from "../components/WalletComponents/OptionCard";
import TransactionCard from "../components/WalletComponents/TransactionCard";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";
import OverviewCard from "../components/WalletComponents/OverviewCard";

function WalletPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="p-4">
          <h1 className="mb-6 text-2xl font-bold text-center">My Wallet</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <BalanceCard />
              <OptionCard />
              <OverviewCard />
            </div>
            <div className="space-y-4">
              <TransactionCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPage;
