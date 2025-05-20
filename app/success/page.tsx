export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SuccessClient from "./successClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-indigo-600">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
