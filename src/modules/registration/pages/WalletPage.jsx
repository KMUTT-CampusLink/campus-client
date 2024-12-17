import BalanceCard from "../components/WalletComponents/BalanceCard";
import OptionCard from "../components/WalletComponents/OptionCard";
import TransactionCard from "../components/WalletComponents/TransactionCard";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";
import OverviewCard from "../components/WalletComponents/OverviewCard";
import { GiWallet } from "react-icons/gi";
import { useTransactions } from "../services/queries";
import LoadingPage from "../../dev/pages/LoadingPage";
function WalletPage() {
  const userId = localStorage.getItem("userId");
  const { data: transactions, isLoading, error } = useTransactions(userId);
  console.log(transactions);
  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error loading transactions</div>;
  }
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="p-4">
          <div className="flex items-center mb-6 text-2xl font-bold">
            <div className="text-4xl text-orange-600">
              <GiWallet />
            </div>
            <h2 className="ml-4">My Wallet</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <BalanceCard balance={transactions?.totalBalance} />
              <OptionCard />
            </div>
            <div className="space-y-4">
              <OverviewCard
                refunds={transactions?.refunds}
                deposits={transactions?.deposits}
                others={transactions?.others}
              />
              <TransactionCard transactions={transactions?.transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPage;
