import { useHead } from "@unhead/react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "music.album" | "music.song" | "profile";
  jsonLd?: object;
}

const BASE_URL = "https://sahiljindal.com";

const SEO = ({
  title = "Sahil Jindal Music",
  description = "Sahil Jindal - Music producer, composer, and audio engineer. Explore my original music, credits, and connect for collaborations.",
  image = `${BASE_URL}/og-image.png`,
  url = BASE_URL,
  type = "website",
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes("Sahil Jindal") ? title : `${title} | Sahil Jindal`;
  // Strip hash fragments from canonical URL for proper SEO
  const canonicalUrl = url.split('#')[0] || BASE_URL;

  useHead({
    title: fullTitle,
    meta: [
      { name: "title", content: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      { name: "author", content: "Sahil Jindal" },
      { property: "og:type", content: type },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "Sahil Jindal Music" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: canonicalUrl },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
  });

  return null;
};

export default SEO;
