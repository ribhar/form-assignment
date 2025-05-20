import { Suspense } from "react";
import SuccessClient from "./successClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
