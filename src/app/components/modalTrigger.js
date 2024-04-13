import Image from "next/image";

const ModalTrigger = ({ value, clickAction }) => {
  
  return (
    <>
      <div
        className="box-border flex flex-row flex-grow gap-1 p-1 border border-solid border-b40 bg-b0 hover:cursor-pointer items-center"
        onClick={() => clickAction()}
      >
        {value.image && (
          <div className="min-w-2five min-h-1five relative">
            <Image
              src={value.image.url}
              alt={value.image.name}
              fill
              sizes="(min-width: 320px) 100vw"
            />
          </div>
        )}
        <div className="w-full whitespace-nowrap">{value.name}</div>
        <div className="min-w-1twofive min-h-1twofive relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}/images/icons/icon-chevron-down.svg`}
            alt="chevron down"
            fill
            sizes="(min-width: 320px) 100vw"
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default ModalTrigger;
