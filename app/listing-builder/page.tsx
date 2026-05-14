import { Suspense } from "react";
import { ListingBuilderView } from "@/components/screens/ListingBuilderView";

export default function ListingBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] animate-pulse rounded-md bg-bg-sunken" aria-hidden />}>
      <ListingBuilderView />
    </Suspense>
  );
}
