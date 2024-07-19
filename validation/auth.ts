import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Coinbase from "next-auth/providers/coinbase"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Coinbase, Github],
});
