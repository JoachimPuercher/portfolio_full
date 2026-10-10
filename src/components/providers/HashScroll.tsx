"use client";

import { useEffect } from "react";
import { keepAligned } from "@/helpers/scroll";

/**
 * Arriving on the home page with a hash (header link clicked on a project page, or a
 * shared /de/#contact-me-section URL): the browser jumps to the section while the
 * images below are still lazy-loading, so the document grows afterwards and the
 * section slides out of view - the contact link ended up at the testimonials.
 * Re-aim at the target until the page height settles.
 */
export default function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ block: "start" });
    keepAligned(el);
  }, []);

  return null;
}
