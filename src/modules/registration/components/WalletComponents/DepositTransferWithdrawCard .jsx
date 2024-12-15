function DepositTransferWithdrawCard() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Withdraw</h2>
        <form className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Note (optional)"
            className="w-full border rounded p-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            WITHDRAW
          </button>
        </form>
      </div>
    );
  }
  
  export default DepositTransferWithdrawCard;
  