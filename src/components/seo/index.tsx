import { useHead } from "@unhead/react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "music.album" | "music.song" | "profile";
  jsonLd?: object;
}

const SEO = ({
  title = "Sahil Jindal Music",
  description = "Sahil Jindal - Music producer, composer, and audio engineer. Explore my original music, credits, and connect for collaborations.",
  image = "https://sahiljindal.com/og-image.png",
  url = "https://sahiljindal.com",
  type = "website",
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes("Sahil Jindal") ? title : `${title} | Sahil Jindal`;

  useHead({
    title: fullTitle,
    meta: [
      { name: "title", content: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      { name: "author", content: "Sahil Jindal" },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "Sahil Jindal Music" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [{ rel: "canonical", href: url }],
    script: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
  });

  return null;
};

export default SEO;
