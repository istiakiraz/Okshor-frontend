import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();

  console.log( "data" ,  data);

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
