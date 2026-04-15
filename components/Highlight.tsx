import type { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  color?: string;
  to?: string;
}

const Highlight = ({ children, color, to }: HighlightProps) => {
  const style = {
    backgroundColor: color,
    borderRadius: "4px",
    color: "#fff",
    padding: "0.2rem",
    textDecoration: "none",
  };

  if (to) {
    return (
      <a href={to} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <span style={style}>{children}</span>;
};

export default Highlight;
