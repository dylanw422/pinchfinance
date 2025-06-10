"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const categoryColorMap: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  TRANSPORTATION: {
    bg: "bg-purple-950/50",
    border: "border-purple-300",
    text: "text-purple-300",
  },
  TRAVEL: {
    bg: "bg-blue-950/50",
    border: "border-blue-300",
    text: "text-blue-300",
  },
  FOOD_AND_DRINK: {
    bg: "bg-yellow-950/50",
    border: "border-yellow-300",
    text: "text-yellow-300",
  },
  GENERAL_MERCHANDISE: {
    bg: "bg-pink-950/50",
    border: "border-pink-300",
    text: "text-pink-300",
  },
  GOVERNMENT_AND_NON_PROFIT: {
    bg: "bg-orange-950/50",
    border: "border-orange-300",
    text: "text-orange-300",
  },
  INCOME: {
    bg: "bg-green-950/50",
    border: "border-green-300",
    text: "text-green-300",
  },
  ENTERTAINMENT: {
    bg: "bg-teal-950/50",
    border: "border-teal-300",
    text: "text-teal-300",
  },
  HOME_IMPROVEMENT: {
    bg: "bg-gray-950/50",
    border: "border-gray-300",
    text: "text-gray-300",
  },
  BANK_FEES: {
    bg: "bg-indigo-950/50",
    border: "border-indigo-300",
    text: "text-indigo-300",
  },
  MEDICAL: {
    bg: "bg-fuchsia-950/50",
    border: "border-fuchsia-300",
    text: "text-fuchsia-300",
  },
  PERSONAL_CARE: {
    bg: "bg-violet-950/50",
    border: "border-violet-300",
    text: "text-violet-300",
  },
  TRANSFER_IN: {
    bg: "bg-green-950/50",
    border: "border-green-300",
    text: "text-green-300",
  },
  LOAN_PAYMENTS: {
    bg: "bg-red-950/50",
    border: "border-red-300",
    text: "text-red-300",
  },
  GENERAL_SERVICES: {
    bg: "bg-lime-950/50",
    border: "border-lime-300",
    text: "text-lime-300",
  },
  RENT_AND_UTILITIES: {
    bg: "bg-cyan-950/50",
    border: "border-cyan-300",
    text: "text-cyan-300",
  },
  TRANSFER_OUT: {
    bg: "bg-red-950/50",
    border: "border-red-300",
    text: "text-red-300",
  },
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Description",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    },
  },
  {
    accessorKey: "website",
    header: "",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount: number = row.getValue("amount");
      const dollarValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Math.abs(amount));
      return (
        <div className={`${amount < 0 ? "text-green-300" : ""} text-center`}>
          {dollarValue}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentChannel",
    header: () => <div className="text-center">Type</div>,
    cell: ({ row }) => {
      const paymentChannel: string = row.getValue("paymentChannel");
      return <div className="text-center">{paymentChannel}</div>;
    },
    size: 0.5,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "personalFinanceCategoryPrimary",
    header: () => <div className="text-end">Category</div>,
    cell: ({ row }) => {
      const category: string = row.getValue("personalFinanceCategoryPrimary");
      const color: any = categoryColorMap[category] || {
        bg: "bg-gray-950",
        border: "border-gray-300",
        text: "text-gray-300",
      };

      return (
        <div className="opacity flex w-full justify-end text-xs">
          <h1 className={`px-1 py-0.5 ${color.text} ${color.bg}`}>
            {category.split("_").join(" ")}
          </h1>
        </div>
      );
    },
  },
];
