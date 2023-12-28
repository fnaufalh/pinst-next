const Input = (props) => {
  return (
    <div className="flex flex-col items-start gap-0five w-full">
      <span>{props.label}</span>
      <input
        className="box-border flex p-1 justify-content, items-center w-full border-solid border border-b40 bg-b0"
        {...props}
      />
    </div>
  );
};

const TextArea = (props) => {
  return (
    <div className="flex flex-col items-start gap-0five w-full">
      <span>{props.label}</span>
      <textarea
        className="box-border flex p-1 justify-content, items-center self-stretch border-solid border border-b40 bg-b0 h-40"
        {...props}
      />
    </div>
  );
};

export { Input, TextArea };
