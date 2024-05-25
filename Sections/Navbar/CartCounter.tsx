"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
type Props = {};

function CartCounter({}: Props) {
  const productCount = useSelector(
    (state: RootState) => state.cartOrderReducer.cartList
  ).length;
  return (
    productCount > 0 && (
      <text
        x="320"
        y="200"
        style={{
          fontSize: "250px",
          fontWeight: 700,
          fill: "#FF5A1F",
          textAnchor: "middle",
          dominantBaseline: "middle",
        }}
      >
        {productCount > 9 ? "9+" : productCount}
      </text>
    )
  );
}

export default CartCounter;
