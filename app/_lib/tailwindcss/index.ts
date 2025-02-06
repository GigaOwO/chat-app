import { DefaultSize, Flex, InputSize, Opacity, Width } from "./types";

export const text:DefaultSize = {
  S: "text-xs md:text-sm",
  M: "text-sm md:text-base",
  L: "text-base md:text-lg",
  XL: "text-lg md:text-xl",
}

export const padding:DefaultSize = {
  S: "px-2 py-[6px] md:px-3 md:py-2",
  M: "px-4 py-2 px-5 py-3",
  L: "px-7 py-4 md:px-8 py-6",
  XL: "px-10 py-6 md:px-12 py-7",
}

export const width:Width = {
  SS: "w-10 md:w-20",
  S: "w-20 md:w-28",
  M: "w-28 md:w-40",
  L: "w-40 md:w-60",
  XL: "w-60 md:w-80",
  XXL: "w-80 md:w-96",
  full: "w-full",
}

export const input:InputSize = {
  S: `outline-none ${width.M}`,
  M: `outline-none ${width.L}`,
  L: `outline-none ${width.XL}`,
  XL: `outline-none ${width.XXL}`,
  full: `w-full outline-none`,
}

export const opacity:Opacity = {
  focus: 'opacity-40 focus:opacity-100 transition-opacity duration-300 ease-in-out',
  hover: 'opacity-100 hover:opacity-40 transition-opacity duration-200',
};

export const flex:Flex = {
  row: "flex flex-row",
  col: "flex flex-col",
  rowReverse: "flex flex-row-reverse",
  colReverse: "flex flex-col-reverse",
}