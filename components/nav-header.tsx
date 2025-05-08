import Link from "next/link";
import { useSidebar } from "./ui/sidebar";

export default function NavHeader() {
  const {} = useSidebar();
  return (
    <div className="flex flex-col items-center border-b py-4">
      <Link href="/">
        <img src="/pinchFullWhite.webp" alt="pinch logo" className="h-5" />
      </Link>
    </div>
  );
}
