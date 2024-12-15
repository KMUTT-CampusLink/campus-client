import BalanceCard from "../components/WalletComponents/BalanceCard";
import OptionCard from "../components/WalletComponents/OptionCard";
import TransactionCard from "../components/WalletComponents/TransactionCard";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";
import OverviewCard from "../components/WalletComponents/OverviewCard";
import { GiWallet } from "react-icons/gi";
function WalletPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="p-4">
          <div className="mb-6 text-2xl font-bold flex items-center">
            <div className="text-4xl text-orange-600">
              <GiWallet />
            </div>
            <h2 className="ml-4">My Wallet</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <BalanceCard />
              <OptionCard />
            </div>
            <div className="space-y-4">
              <OverviewCard />
              <TransactionCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPage;
