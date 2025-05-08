export default function Greeting({ session }: { session: any }) {
  const timeOfDay = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "morning";
    } else if (hour < 16) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl">
        Good {timeOfDay()}, {session?.data?.user.name.split(" ")[0]}
      </h1>
      <p className="text-sm text-foreground/75">This is your finance report</p>
    </div>
  );
}
