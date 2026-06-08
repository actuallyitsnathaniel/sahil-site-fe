export type CollaboratorType = {
  Logo: { url: string };
  Title: string;
  url?: string;
};

interface CollaboratorCarouselProps {
  collaborators: CollaboratorType[];
}

const CollaboratorCard = ({ item }: { item: CollaboratorType }) => {
  const inner = (
    <div className="group/card flex flex-col items-center flex-shrink-0 mx-6 md:mx-8">
      <img
        src={item.Logo.url}
        alt={item.Title}
        className="h-16 w-24 object-contain"
      />
      <p className="text-xs text-center text-white/60 mt-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
        {item.Title}
      </p>
    </div>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.Title}
      >
        {inner}
      </a>
    );
  }

  return inner;
};

const CollaboratorCarousel = ({ collaborators }: CollaboratorCarouselProps) => {
  if (!collaborators?.length) return null;

  const doubled = [...collaborators, ...collaborators];

  return (
    <section
      aria-label="Collaborators"
      className="py-6 md:py-8 flex flex-col items-center"
    >
      <span className="text-xs uppercase tracking-widest text-white/60 mb-4">
        Collaborators
      </span>
      <div className="relative w-full md:w-3/5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex flex-nowrap w-max animate-marquee">
          {doubled.map((item, i) => (
            <CollaboratorCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaboratorCarousel;
