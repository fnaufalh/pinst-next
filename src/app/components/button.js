"use client";
const Button = ({ text, clickAction, fullWidth }) => {
  return (
    <button
      className={
        "flex p-1 justify-center items-center bg-r300 text-b0 w-full " +
        (fullWidth ? "w-full" : "sm:w-15 ") +
        "hover:bg-r400 focus:bg-r400 cursor-pointer"
      }
      onClick={() => clickAction()}
    >
      {text}
    </button>
  );
};
export default Button;
