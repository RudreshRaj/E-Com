import { getCategoryList } from "@/utils/apis";
import Link from "next/link";

const extraImg =
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
type Props = { name: string; index: number };

async function CategoryList() {
  let {
    props: { data },
  } = await getCategoryList();
  if (data.length == 0) return;
  return (
    <div className="container bg-white">
      <div className="flex overflow-x-scroll py-2 gap-1">
        {data.map((name: string, index: number) => (
          <Category name={name} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

function Category({ name, index }: Props) {
  return (
    <div className="pt-4 px-2 ">
      <div className=" ">
        <Link href={`/${name}`}>
          <div className="bg-white relative pb-0 p-2  text-gray-800 hover:shadow-md rounded-md">
            <div className="flex flex-col items-center justify-center ">
              <img
                src={index < 4 ? `/${name}.jpeg` : extraImg}
                className="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
              />
              <div className="py-2 px-2">
                <div className=" font-bold font-title text-center capitalize">
                  {name}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CategoryList;
