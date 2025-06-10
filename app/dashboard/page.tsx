"use client";
import AllExpense from "@/components/dashboard/all-expense";
import Balance from "@/components/dashboard/balance";
import Greeting from "@/components/dashboard/greeting";
import MExpense from "@/components/dashboard/m-expense";
import MIncome from "@/components/dashboard/m-income";
import More from "@/components/dashboard/more";
import Statistics from "@/components/dashboard/statistics";
import Transactions from "@/components/dashboard/transactions/transactions";
import { useSession, useUser } from "@/queries/auth";
import { useSelectedAccount } from "@/queries/selected-account";

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: user } = useUser();
  const { selectedAccountId } = useSelectedAccount();

  const selectedAccount = user?.data.plaidAccounts.find(
    (account: any) => account.id === selectedAccountId,
  );
  // Get the current balance for the selected account
  const accountBalance = user?.data.plaidBalances.find(
    (balance: any) => balance.plaidAccountId === selectedAccountId,
  );
  const currentBalance = accountBalance?.current ?? null;

  // All transactions for the selected account
  const acctTxns = user?.data.plaidTransactions?.filter(
    (transaction: any) => transaction.plaidAccountId === selectedAccountId,
  );

  // Filter transactions by current month
  const monthTxns = acctTxns?.filter(
    (txn: any) =>
      new Date(txn.date).getMonth() === new Date().getMonth() &&
      new Date(txn.date).getFullYear() === new Date().getFullYear(),
  );

  const prevMonthTxns = acctTxns?.filter(
    (txn: any) =>
      new Date(txn.date).getMonth() === new Date().getMonth() - 1 &&
      new Date(txn.date).getFullYear() === new Date().getFullYear() &&
      new Date(txn.date).getDate() <= new Date().getDate(),
  );

  // Calculate monthly income and expense
  const monthIncome = monthTxns?.filter((txn: any) => txn.amount < 0) ?? [];
  const monthIncomeTotal =
    Math.abs(
      monthIncome.reduce(
        (acc: number, curr: any) => acc + Number(curr.amount),
        0,
      ),
    ) ?? 0;

  const monthExpense = monthTxns?.filter((txn: any) => txn.amount > 0) ?? [];
  const monthExpenseTotal =
    monthExpense.reduce(
      (acc: number, curr: any) => acc + Number(curr.amount),
      0,
    ) ?? 0;

  const prevMonthIncome =
    prevMonthTxns?.filter((txn: any) => txn.amount < 0) ?? [];
  const prevMonthIncomeTotal =
    Math.abs(
      prevMonthIncome.reduce(
        (acc: number, curr: any) => acc + Number(curr.amount),
        0,
      ),
    ) ?? 0;

  const prevMonthExpense =
    prevMonthTxns?.filter((txn: any) => txn.amount > 0) ?? [];
  const prevMonthExpenseTotal =
    prevMonthExpense.reduce(
      (acc: number, curr: any) => acc + Number(curr.amount),
      0,
    ) ?? 0;

  // Sort transactions for radial chart data: spend per category
  const calculateCategorySpend = (txns: any[]) => {
    const categoryMap: any = {};
    for (const txn of txns) {
      const rawAmount = parseFloat(txn.amount);
      const amount = Math.abs(parseFloat(txn.amount));
      // if (txn.personalFinanceCategoryPrimary === "INCOME") continue;
      const category =
        rawAmount < 0
          ? "INCOME"
          : txn.personalFinanceCategoryPrimary || "UNCATEGORIZED";

      if (!isNaN(amount)) {
        categoryMap[category] = (categoryMap[category] || 0) + amount;
      }
    }

    return Object.entries(categoryMap)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 6)
      .map(([category, total]) => ({
        category: category,
        total: parseFloat((total as number).toFixed(2)),
        fill: `var(--color-${category})`,
      }));
  };

  // Calculate average expense per month
  const averageExpensePerMonth = () => {
    if (!acctTxns || acctTxns.length === 0) return 0;
    const monthlyTotals: Record<string, number> = {};

    for (const txn of acctTxns) {
      if (txn.amount > 0) {
        const date = new Date(txn.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        monthlyTotals[monthKey] =
          (monthlyTotals[monthKey] || 0) + Number(txn.amount);
      }
    }

    const totalMonths = Object.keys(monthlyTotals).length;
    const totalExpense = Object.values(monthlyTotals).reduce(
      (sum, val) => sum + val,
      0,
    );

    return totalMonths > 0
      ? parseFloat((totalExpense / totalMonths).toFixed(2))
      : 0;
  };

  const radialChartData = acctTxns ? calculateCategorySpend(monthTxns) : [];
  const averageExpense = averageExpensePerMonth();

  console.log(acctTxns);

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Greeting session={session} />
      <div
        id="grid"
        className="grid w-full grid-cols-2 grid-rows-5 gap-4 py-4 md:grid-rows-4 lg:grid-cols-11 lg:grid-rows-3"
      >
        <Balance
          accountType={selectedAccount?.type}
          accountNumber={selectedAccount?.accountNumber}
          balance={currentBalance}
          className="col-span-2 row-span-1 lg:col-span-5 xl:col-span-4"
        />
        <MIncome
          prevIncome={prevMonthIncomeTotal}
          income={monthIncomeTotal}
          className="col-span-2 row-span-1 md:col-span-1 lg:col-span-3 xl:col-span-2"
        />
        <MExpense
          prevExpense={prevMonthExpenseTotal}
          expense={monthExpenseTotal}
          className="col-span-2 row-span-1 md:col-span-1 lg:col-span-3 xl:col-span-2"
        />
        <AllExpense
          averageExpense={averageExpense}
          monthSpend={monthExpenseTotal}
          chartData={radialChartData}
          className="col-span-2 row-span-2 lg:col-span-4 lg:row-span-2 xl:col-span-3"
        />
        <Statistics className="col-span-2 row-span-2 lg:col-span-7 lg:row-span-2 xl:col-span-8" />
        <More className="col-span-3 row-span-1" />
      </div>
      <Transactions txns={acctTxns} />
    </div>
  );
}
