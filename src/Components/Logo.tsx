import React from "react";

interface LogoProps {
  width: string;
}

const Logo: React.FC<LogoProps> = ({ width }) => {
  return <div style={{ width }}>Logo</div>;
};

export default Logo;
