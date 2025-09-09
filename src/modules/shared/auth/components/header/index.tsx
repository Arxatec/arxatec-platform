import React from "react";
import { CardTitle, CardDescription } from "@/components/ui";

interface Props {
  title: string;
  description: string;
}

export const Header: React.FC<Props> = ({ title, description }) => {
  return (
    <React.Fragment>
      <CardTitle>
        <h1 className="text-xl font-extrabold font-serif">{title}</h1>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </React.Fragment>
  );
};
