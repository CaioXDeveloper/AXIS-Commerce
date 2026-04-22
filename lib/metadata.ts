import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
}

export function buildMetadata(opts: BuildMetadataOptions = {}): Metadata {
  const title = opts.title ? `${opts.title} — ${SITE.name}` : `${SITE.name} · ${SITE.tagline}`;
  const description = opts.description ?? SITE.description;
  const url = `${SITE.url}${opts.path ?? ""}`;
  const images = [{ url: opts.image ?? `${SITE.url}/og.png`, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images,
      locale: "en_US",
      type: (opts.type === "product" ? "website" : opts.type) ?? "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export const defaultMetadata: Metadata = buildMetadata();
