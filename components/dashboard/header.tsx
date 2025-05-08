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
    <div className="py-2 flex gap-2 sticky top-0 bg-background">
      <Select value={selectedAccountId ?? ""} onValueChange={(id) => setSelectedAccount(id)}>
        <SelectTrigger className="bg-secondary sm:w-[180px] text-sm h-8">
          <SelectValue placeholder="Select Account"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary text-sm">
          {user?.data.plaidAccounts
            .filter(
              (account: any) => account.type === "depository" || account.type === "investment"
            )
            .map((account: any, index: number) => {
              return (
                <SelectItem value={account.id} key={index}>
                  {account.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <button className="h-8 flex justify-center items-center bg-secondary border aspect-square rounded-md">
        <Plus className="h-4 w-4 text-foreground/75" />
      </button>
      <div className=" flex-1 relative sm:flex hidden">
        <Input
          className="bg-secondary placeholder:text-foreground/50 text-sm h-8 pl-8 pr-16"
          placeholder="Search..."
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/75 h-4 w-4" />
        <Shortcut keys={["⌘", "G"]} className="right-2 top-1/2 -translate-y-1/2" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-secondary w-min p-2 rounded-md border h-8">
          <Bell className="w-4 h-4 text-foreground/75" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-secondary w-[250px] min-h-[400px]">
          <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">Nothing to see here.</p>
          ) : (
            notifications.map((notification) => <p></p>)
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
