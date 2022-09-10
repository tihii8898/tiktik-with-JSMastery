import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const ListRender = ({
  items,
  mt = true,
}: {
  items: string[];
  mt?: boolean;
}) => (
  <div className={`mt-5 flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item) => (
      <p
        className="text-gray-400 text-sm hover:underline cursor-pointer"
        key={item}
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <ListRender items={footerList1} mt={false} />
      <ListRender items={footerList2} />
      <ListRender items={footerList3} />
      <p className="text-gray-400 text-md mt-5 ml-20 ">
        TiHii NgũYên learning Nextjs
      </p>
    </div>
  );
};

export default Footer;
