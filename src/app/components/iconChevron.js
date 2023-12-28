import { useState, useEffect } from "react";

const IconChevron = ({ isActive }) => {
  const [white, setWhite] = useState();
  const [rotate, setRotate] = useState();

  useEffect(() => {
    if (isActive) {
      setWhite(true);
      setRotate(true);
    } else {
      setWhite(false);
      setRotate(false);
    }
  }, [isActive, white, rotate]);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rotate ? "rotate-180" : "rotate-0"}
    >
      <path
        d="M9.74935 10.7493L12.9993 7.49935C13.1521 7.34657 13.3466 7.27018 13.5827 7.27018C13.8188 7.27018 14.0132 7.34657 14.166 7.49935C14.3188 7.65213 14.3952 7.84657 14.3952 8.08268C14.3952 8.31879 14.3188 8.51324 14.166 8.66602L10.3327 12.4993C10.2493 12.5827 10.1591 12.6416 10.0618 12.676C9.96463 12.7105 9.86046 12.728 9.74935 12.7285C9.63824 12.7285 9.53407 12.711 9.43685 12.676C9.33963 12.641 9.24935 12.5821 9.16602 12.4993L5.33268 8.66602C5.1799 8.51324 5.10352 8.31879 5.10352 8.08268C5.10352 7.84657 5.1799 7.65213 5.33268 7.49935C5.48546 7.34657 5.6799 7.27018 5.91602 7.27018C6.15213 7.27018 6.34657 7.34657 6.49935 7.49935L9.74935 10.7493Z"
        className={white ? "fill-b0" : "fill-b500"}
      />
    </svg>
  );
};

export default IconChevron;
