import Link from "next/link";
import React from "react";

export const navItemData = [
  {
    name: "Inicio",
    url: "/",
  },
  {
    name: "Propiedades",
    url: "/properties",
  },
  {
    name: "Nosotros",
    url: "/about",
  },
  {
    name: "Poloticas",
    url: "/policy",
  },
  {
    name: "PyR",
    url: "/faq",
  },
];

type Props = {
  activateItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activateItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemData &&
          navItemData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activateItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full flex-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Raiz
              </span>
            </Link>
          </div>
          {navItemData &&
            navItemData.map((i, index) => (
              <Link href="/" key={index} passHref>
                <span
                  className={`${
                    activateItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font--[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};
export default NavItems;
