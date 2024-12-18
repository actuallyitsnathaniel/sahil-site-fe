export const EmailSent = ({ firstName }: { firstName: string }) => {
  return (
    <div className="flex flex-col text-3xl text-center">
      <p>
        Thanks for connecting,&#xa0;
        {firstName}.&#xa0;I&apos;ll reach out soon!
      </p>
    </div>
  );
};
