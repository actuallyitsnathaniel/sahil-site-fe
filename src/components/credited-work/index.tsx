export const CreditedWork = ({
  artwork,
  title,
  url,
  alt,
}: {
  artwork: string;
  title: string;
  url?: string;
  alt: string;
}) => {
  return (
    <div className="flex flex-col justify-center mx-10 p-14 max-w-xs">
      <a href={url} className="flex flex-col">
        <img className="max-h-72" src={artwork} alt={alt} />

        <p className="text-center">{title}</p>
      </a>
    </div>
  );
};
