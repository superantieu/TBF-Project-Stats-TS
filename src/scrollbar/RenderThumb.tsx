import { CSSProperties } from "react";

interface RenderThumbProps {
  style: CSSProperties;
  [key: string]: any;
}

const RenderThumb: React.FC<RenderThumbProps> = ({ style, ...props }) => {
  const thumbStyle: CSSProperties = {
    backgroundColor: "#e7dede", // Màu của nút thumb dọc
    borderRadius: "4px",
  };

  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export default RenderThumb;
