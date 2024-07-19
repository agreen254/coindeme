import { signIn, signOut } from "@/validation/auth";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

export function SignOut(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button className="w-full p-0" {...props}>
        Sign Out
      </button>
    </form>
  );
}
