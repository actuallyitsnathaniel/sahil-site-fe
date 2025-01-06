export const CreditedWork = ({
  artwork,
  title,
  workType,
  url,
  alt,
}: {
  artwork: string;
  title: string;
  workType: string;
  url?: string;
  alt: string;
}) => {
  return (
    <div className="flex flex-col justify-center mx-10 p-14 max-w-xs">
      <a href={url} className="flex flex-col">
        <img className="max-h-72" src={artwork} alt={alt} />

        <p className="text-center">
          {title}&nbsp;({workType})
        </p>
      </a>
    </div>
  );
};
