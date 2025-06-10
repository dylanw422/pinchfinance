"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DataTableProps<TData extends { amount: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { amount: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
      columnVisibility: {
        id: false,
        website: false,
      },
    },
  });

  const handleSortClick = (columnId: string, desc: boolean) => {
    const existingSort = sorting?.find((s) => s.id === columnId);

    if (existingSort) {
      setSorting([{ id: columnId, desc: !existingSort.desc }]);
    } else {
      setSorting([{ id: columnId, desc }]);
    }
  };

  const renderArrow = (columnId: string) => {
    const sort = sorting?.find((s) => s.id === columnId);
    if (!sort) return null;
    return sort.desc ? (
      <ChevronDown className="h-5 w-5" />
    ) : (
      <ChevronUp className="h-5 w-5" />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-end space-x-2 pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="sm" variant="outline">
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleSortClick("amount", true);
              }}
            >
              Amount{renderArrow("amount")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleSortClick("paymentChannel", false);
              }}
            >
              Type{renderArrow("paymentChannel")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleSortClick("date", true);
              }}
            >
              Date{renderArrow("date")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleSortClick("personalFinanceCategoryPrimary", false);
              }}
            >
              Category{renderArrow("personalFinanceCategoryPrimary")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-4" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={`${"cursor-pointer hover:bg-violet-950/30"} `}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
