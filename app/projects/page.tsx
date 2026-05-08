import { Suspense } from "react";
import { Projects } from "../../src/routes/Projects/Projects";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Projects...</div>}>
      <Projects />
    </Suspense>
  );
}
