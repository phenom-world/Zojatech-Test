import React from "react";
import Image from "../../assets/images/cover.png";

const CoverImage = () => {
  return (
    <div className="w-[50%] md:flex justify-end h-full hidden order-1">
      <img src={Image} alt="" className="object-cover h-[full] w-[100%]" />
    </div>
  );
};

export default CoverImage;
