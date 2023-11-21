import LotusIcon from "../icons/LotusIcon";

function Logo({ bigVersion }: { bigVersion: boolean }) {
  const fontSize = bigVersion ? "text-3xl" : "text-lg";

  return (
    <div className="flex items-center gap-2">
      <div className="dark:fill-primary fill-black">
        <LotusIcon />
      </div>
      <h2
        className={`dark:text-primary text-black font-space-grotesk font-bold ${fontSize}`}
      >
        Themis
      </h2>
    </div>
  );
}

export default Logo;
