import { Bell, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Shortcut from "../shortcut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useSelectedAccount } from "@/queries/selected-account";

export default function Header({ user }: { user: any }) {
  const { selectedAccountId, setSelectedAccount } = useSelectedAccount();
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="top-0 z-10 flex gap-2 py-2">
      <Select value={selectedAccountId ?? ""} onValueChange={(id) => setSelectedAccount(id)}>
        <SelectTrigger className="h-8 bg-secondary text-sm sm:w-[180px]">
          <SelectValue placeholder="Select Account"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary text-sm">
          {user.plaidAccounts
            .filter((account: any) => account.type === "depository")
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((account: any, index: number) => {
              return (
                <SelectItem value={account.id} key={index}>
                  {account.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <button className="flex aspect-square h-8 items-center justify-center rounded-md border bg-secondary">
        <Plus className="h-4 w-4 text-foreground/75" />
      </button>
      <div className="relative hidden flex-1 sm:flex">
        <Input
          className="h-8 bg-secondary pl-8 pr-16 text-sm placeholder:text-foreground/50"
          placeholder="Search..."
        />
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/75" />
        <Shortcut keys={["⌘", "G"]} className="right-2 top-1/2 -translate-y-1/2" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-min rounded-md border bg-secondary p-2">
          <Bell className="h-4 w-4 text-foreground/75" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-h-[400px] w-[250px] bg-secondary">
          <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Nothing to see here.</p>
          ) : (
            notifications.map((notification) => <p key={notification}>{notification}</p>)
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
