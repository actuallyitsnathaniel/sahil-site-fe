import { Link } from "react-router-dom";
import SEO from "../components/seo";
import Footer from "../components/footer";
import { BackgroundMediaLayer } from "../components/background-media";

// All policy copy lives here so wording is editable without touching layout.
// "the Owner" is defined on first mention (Ownership) and reused throughout.
const SECTIONS: { heading: string; body?: string; list?: string[] }[] = [
  {
    heading: "Ownership",
    body:
      'This website and all music, audio recordings, compositions, lyrics, and stems published on it are owned by Sahil Jindal ("the Owner"), including works created in collaboration with or on behalf of affiliated artists, clients, and rights-holders, all of which are upheld by this policy. All rights reserved.',
  },
  {
    heading: "Permitted Use",
    body:
      "You may listen for personal, non-commercial purposes, or use the work as explicitly licensed in writing by the Owner. Nothing else is permitted without prior written consent.",
  },
  {
    heading: "No AI or Machine-Learning Grant",
    body:
      "No permission, express or implied, is granted to use any work covered by this policy for the training, fine-tuning, evaluation, or dataset creation of any artificial-intelligence or machine-learning system.",
  },
  {
    heading: "Explicit Prohibitions",
    body: "You may not:",
    list: [
      "Include the Owner's or any affiliated audio in any AI/ML dataset.",
      "Use it to train, fine-tune, or evaluate any AI/ML model.",
      'Build tools or services that generate music "in the style of" Sahil Jindal, or that imitate his — or his collaborators\' — sound, voice, or production.',
    ],
  },
  {
    heading: "License Scope",
    body:
      "Any license granted by the Owner excludes AI and machine-learning rights unless those rights are explicitly stated in writing.",
  },
  {
    heading: "Inquiries",
    body:
      "Research and technology use requires prior written approval. Sahil Jindal is the sole primary contact for all matters under this policy.",
  },
  {
    heading: "Agreement",
    body:
      "Accessing, streaming, or downloading any work on this site implies agreement with this policy. Unauthorized use may violate the rights of the Owner and affiliated rights-holders, as well as applicable law.",
  },
];

const UsagePolicy = () => {
  return (
    <>
      <SEO
        title="Usage & AI Policy"
        description="Sahil Jindal's music is not licensed for AI or machine-learning training. Read the full usage and AI policy."
        url="https://sahiljindal.com/usage-and-ai-policy"
        type="website"
      />
      <BackgroundMediaLayer />
      <main className="min-h-screen flex flex-col items-center text-white font-light px-4 py-16">
        <article className="w-full max-w-4xl bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-10">
          <header className="border-b border-white/20 pb-5 mb-8">
            <h1 className="text-3xl md:text-4xl">Usage &amp; AI Policy</h1>
            <p className="mt-2 text-white/70">Owned and operated by Sahil Jindal</p>
          </header>

          <div className="md:columns-2 md:gap-10">
            {SECTIONS.map(({ heading, body, list }) => (
              <section key={heading} className="mb-8 break-inside-avoid">
                <h2 className="text-xl mb-2 font-normal">{heading}</h2>
                {body && <p className="text-white/85 leading-relaxed">{body}</p>}
                {list && (
                  <ul className="mt-2 list-disc list-inside text-white/85 leading-relaxed">
                    {list.map((item) => (
                      <li key={item} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="border-t border-white/20 pt-6 mt-2 flex flex-wrap justify-between gap-4">
            <Link className="link" to="/">
              ← Back to site
            </Link>
            <Link className="link" to="/#connect">
              Contact Sahil Jindal
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default UsagePolicy;
