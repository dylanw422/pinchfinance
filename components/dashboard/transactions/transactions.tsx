import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Transactions({ txns }: { txns: any[] }) {
  return (
    <div className="rounded-t-lg border-l border-r border-t p-4">
      <h1 className="text-sm text-foreground/75">Transactions</h1>
      <div className="mx-auto py-4">
        {txns && <DataTable columns={columns} data={txns} />}
      </div>
    </div>
  );
}
