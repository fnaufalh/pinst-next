import Button from "./button";
import Image from "next/image";

const CardNews = ({ thumbnail, title, summary, publishedAt, clickAction }) => {
  const formatDate = (string) => {
    var options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  return (
    <div
      className="flex flex-col items-start bg-b0 cursor-pointer w-full lg:w-full"
      onClick={() => clickAction()}
    >
      {thumbnail && (
        <div className="w-full min-h-12 relative">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_URL + thumbnail.url}
            alt={thumbnail.name}
            fill
            sizes="(min-width: 320px) 100vw"
            className="object-contain aspect-auto"
            priority={true}
          />
        </div>
      )}
      {!thumbnail && <div className="w-full min-h-12 relative bg-b40"></div>}
      <div className="w-full h-full flex flex-col justify-between items-start gap-1five p-1five">
        <span className="font-bold">{title}</span>
        <span className="h-full lg:line-clamp-5 line-clamp-3 overflow-hidden">
          {summary}
        </span>
        <span className="caption-1">{formatDate(publishedAt)}</span>
      </div>
    </div>
  );
};

const CardProduct = ({ image, name, clickAction }) => {
  return (
    <div
      className="flex flex-col items-start w-full bg-b0 cursor-pointer"
      onClick={() => clickAction()}
    >
      <div className="w-full min-h-12 relative">
        <Image
          fill
          src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url}
          alt={image.name}
          sizes="(min-width: 320px) 100vw"
          className="object-contain aspect-auto"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-start gap-1five p-1five justify-between h-full">
        <span>{name}</span>
        <span className="text-r300 font-bold">View Details</span>
      </div>
    </div>
  );
};

const CardOtherProduct = ({ src, name }) => {
  return (
    <div className="p-0five">
      <div className="relative w-6twofive h-6twofive">
        <Image fill src={src} alt={name} sizes="(min-width: 320px) 100vw" />
      </div>
    </div>
  );
};

const CardService = ({ title, content, icon }) => {
  return (
    <div className="w-full flex flex-col items-start bg-b0">
      <div className="flex flex-col items-start gap-1five p-2five">
        <div className="flex md:flex-row flex-col gap-1five">
          <div className="w-4 h-4 relative">
            <Image
              fill
              src={icon.url}
              alt={icon.name}
              sizes="(min-width: 320px) 100vw"
            />
          </div>
          <span className="heading-4 flex items-center">{title}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

const CardTeamPortrait = ({ avatar, position, name, email, clickAction }) => {
  return (
    <div className="w-full flex flex-col p-1 sm:p-2five gap-1 bg-b0 items-center">
      <div className="w-6twofive h-6twofive relative">
        <Image
          fill
          src={process.env.NEXT_PUBLIC_STRAPI_URL + avatar.url}
          alt={avatar.name}
          className="rounded-full"
          sizes="(max-width: 1440px) 100vw"
        />
      </div>
      <div className="flex flex-col gap-1five w-full items-center">
        <div className="flex flex-col gap-0 items-center w-full">
          <span className="caption-1">{position}</span>
          <span className="heading-4">{name}</span>
          <span className="caption-1">{email}</span>
        </div>
        <Button text="View Team" clickAction={clickAction} />
      </div>
    </div>
  );
};
const CardTeamHorizontal = ({ avatar, position, name, email, clickAction }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row p-1 sm:p-2five gap-1 sm:gap-6 bg-b0 items-center justify-center">
      <div className="min-w-6twofive sm:min-w-7five min-h-6twofive sm:min-h-7five relative">
        <Image
          fill
          src={avatar}
          alt={name}
          className="rounded-full"
          sizes="(max-width: 1440px) 100vw"
        />
      </div>
      <div className="flex flex-col gap-1five w-full sm:w-auto items-center">
        <div className="flex flex-col gap-0 items-center w-full">
          <span className="caption-1">{position}</span>
          <span className="heading-4">{name}</span>
          <span className="caption-1">{email}</span>
        </div>
        <Button text="View Team" clickAction={clickAction} />
      </div>
    </div>
  );
};

const CardTeamModalHorizontal = ({ team }) => {
  return (
    <div className="rounded-1 w-full flex flex-row p-1 gap-1 bg-b10 items-start justify-between">
      <div className="flex flex-row justify-start items-start gap-1">
        <div className="w-4 h-4 relative">
          <Image
            fill
            src={process.env.NEXT_PUBLIC_STRAPI_URL + team.avatar.url}
            alt={team.name}
            sizes="(min-width: 320px) 100vw"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-0">
          <span className="font-bold">{team.name}</span>
          <span className="caption-1">{team.email}</span>
        </div>
      </div>
      <span className="caption-1">{team.position}</span>
    </div>
  );
};

const CardTeamModalPortrait = ({ team }) => {
  return (
    <div className="rounded-1 w-full flex flex-col p-1 gap-0 bg-b10 items-start justify-between">
      <div className="flex flex-row justify-start items-start gap-1">
        <div className="flex flex-col gap-0 items-start">
          <span className="font-bold">{team.name}</span>
          {team.email && <span className="caption-1">{team.email}</span>}
        </div>
      </div>
      <span className="caption-1">{team.position}</span>
    </div>
  );
};

export {
  CardNews,
  CardProduct,
  CardOtherProduct,
  CardService,
  CardTeamPortrait,
  CardTeamHorizontal,
  CardTeamModalHorizontal,
  CardTeamModalPortrait,
};
