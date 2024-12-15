import BalanceCard from "../components/WalletComponents/BalanceCard";
import DepositTransferWithdrawCard from "../components/WalletComponents/DepositTransferWithdrawCard ";
import OptionCard from "../components/WalletComponents/OptionCard";
import TransactionCard from "../components/WalletComponents/TransactionCard";

function WalletPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-center">Home Page</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <DepositTransferWithdrawCard />
          <OptionCard />
        </div>
        <div className="space-y-4">
          <BalanceCard />
          <TransactionCard />
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
