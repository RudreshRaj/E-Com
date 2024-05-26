import toast from "react-hot-toast";

export function shakeCartCount() {
  toast.success("Product added to Cart.");

  document.getElementById("navbar")?.scrollIntoView({ behavior: "smooth" });
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.classList.add("tilt-shake");

    setTimeout(() => {
      cartCountElement.classList.remove("tilt-shake");
    }, 2000); // 2000 milliseconds = 2 seconds
  }
}
