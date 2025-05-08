"use client";
import AllExpense from "@/components/dashboard/all-expense";
import Balance from "@/components/dashboard/balance";
import Greeting from "@/components/dashboard/greeting";
import MExpense from "@/components/dashboard/m-expense";
import MIncome from "@/components/dashboard/m-income";
import More from "@/components/dashboard/more";
import Statistics from "@/components/dashboard/statistics";
import Transactions from "@/components/dashboard/transactions";
import { useSession, useUser } from "@/queries/auth";
import { useSelectedAccount } from "@/queries/selected-account";

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: user } = useUser();
  const { selectedAccountId } = useSelectedAccount();

  // Get the current balance for the selected account
  const accountBalance = user?.data.plaidBalances.find(
    (balance: any) => balance.plaidAccountId === selectedAccountId
  );
  const currentBalance = accountBalance?.current ?? null;

  // All transactions for the selected account
  const acctTxns = user?.data.plaidTransactions?.filter(
    (transaction: any) => transaction.plaidAccountId === selectedAccountId
  );

  // Filter transactions by current month
  const monthTxns = acctTxns?.filter(
    (txn: any) =>
      new Date(txn.date).getMonth() === new Date().getMonth() &&
      new Date(txn.date).getFullYear() === new Date().getFullYear()
  );

  // Calculate monthly income and expense
  const monthIncome = monthTxns?.filter((txn: any) => txn.amount < 0) ?? [];
  const monthIncomeTotal =
    monthIncome.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0) ?? 0;

  const monthExpense = monthTxns?.filter((txn: any) => txn.amount > 0) ?? [];
  const monthExpenseTotal =
    monthExpense.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0) ?? 0;

  return (
    <div className="h-full flex flex-col overflow-auto">
      <Greeting session={session} />
      <div
        id="grid"
        className="w-full grid grid-cols-2 md:grid-cols-11 grid-rows-5 sm:grid-rows-4 md:grid-rows-3 gap-4 py-4"
      >
        <Balance
          balance={currentBalance}
          className="col-span-2 md:col-span-5 xl:col-span-4 row-span-1"
        />
        <MIncome
          income={monthIncomeTotal}
          className="col-span-2 sm:col-span-1 md:col-span-3 xl:col-span-2 row-span-1"
        />
        <MExpense
          expense={monthExpenseTotal}
          className="col-span-2 sm:col-span-1 md:col-span-3 xl:col-span-2 row-span-1"
        />
        <AllExpense className="col-span-2 md:col-span-4 xl:col-span-3 row-span-1 md:row-span-2" />
        <Statistics className="col-span-2 md:col-span-7 xl:col-span-8 row-span-1 md:row-span-2" />
        <More className="col-span-3 row-span-1 hidden xl:block" />
      </div>
      <Transactions txns={acctTxns} />
    </div>
  );
}
