import Home from "@/components/Home";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
