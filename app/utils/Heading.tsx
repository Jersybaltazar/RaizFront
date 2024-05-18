import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  Keywords: string;
}
const Heading: FC<HeadProps> = ({ title, description, Keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device=width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={Keywords} />
    </>
  );
};
export default Heading;