import { notFound } from "next/navigation";

/** Catch-all: renders the localized not-found page for unknown paths inside a locale. */
export default function CatchAllPage() {
  notFound();
}
