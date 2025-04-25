import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-4">
      <h1>Dashboard</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
