// components/CopyrightSection.js
import React from "react";

function CopyrightSection() {
  const thisYear = new Date().getFullYear();
  return (
    <div className="box-border w-full xl:px-7five sm:px-4 xs:px-1 flex items-start justify-center border-t border-b40 py-2 text-center bg-b20">
      Copyright © PT. PUTERA INSTRUMENINDO {thisYear}. All Rights Reserved.
    </div>
  );
}

export default CopyrightSection;
