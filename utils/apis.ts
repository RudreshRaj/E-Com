export async function getCategoryList() {
  const res = await fetch(`https://fakestoreapi.com/products/categories`, {
    method: "GET",
  });
  const data = await res.json();

  return { props: { data } };
}
export async function getFullProductList() {
  const res = await fetch(`https://fakestoreapi.com/products/`, {
    method: "GET",
  });
  const data = await res.json();

  return { props: { data } };
}

export async function getNewProductList() {
  const res = await fetch(`https://fakestoreapi.com/products?limit=7`, {
    method: "GET",
  });
  const data = await res.json();

  return { props: { data } };
}

export async function getCategoryProductList(category: string) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return { props: { data } };
}
export async function getProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "GET",
  });
  const data = await res.json();

  return { props: { data } };
}
