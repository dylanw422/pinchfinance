import Profile from "@/components/profile";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center ">
      {children}
      <Profile />
    </div>
  );
}
