import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="dark:text-cyan-600 text-red-400 dark:text-4xl text-7xl">
        {" "}
        hello
      </h1>

      <ThemeToggle />
      <Button className="bg-red-400 dark:bg-green-400">click me</Button>
    </div>
  );
}
