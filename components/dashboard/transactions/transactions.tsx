import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Transactions({ txns }: { txns: any[] }) {
  return (
    <div className="p-4 border-l border-t border-r rounded-t-lg">
      <h1 className="text-foreground/75 text-sm">Transactions</h1>
      <div className="mx-auto py-4">{txns && <DataTable columns={columns} data={txns} />}</div>
    </div>
  );
}
