import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Text from "../components/Text";
import CommonSvgIcon from "../components/CommonIcon";
import { useParams } from "react-router-dom";
import { GET } from "../api/API";

export default function SellerProductInspect() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState({});

  const cleanProduct = {
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
  };

  const categories = product.categories?.reduce((acc, item) => {
    return [...acc, item.categoryName];
  }, []);

  const variations = product?.variations;

  const images = variations?.map((variant) => ({
    id: variant.variantId,
    image: variant.imagesUrl
  }));

  const imagesClean = images
    ?.flatMap(item =>
      item.image.map(img => ({
        id: item.id,
        image: img
      }))
    )
    .map((item, index) => ({
      ...item,
      index
    }));

  console.log(imagesClean);

  const [currentVariant, setcurrentVariant] = useState({
    variantId: "",
    currentImg: "",
    variantName: "",
    price: "",
    name: "",
    index: ""
  });
  
  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://localhost:8080/api/seller/product/${id}`;

      const result = await GET(url);
      setProduct(result[0]);
    };

    fetchProduct();
  }, [id]);

  const expandDescription = () => {
    setExpanded(prev => prev ? false : true);
  };

  const changeImage = (id, image, index) => {
    const currentVar = variations?.find((v) => Number(v.variantId) === Number(id));
    setcurrentVariant({
      variantId: id, 
      currentImg: image,
      color: currentVar.color,
      price: currentVar.price,
      index: index,
      variantName: currentVar.variationName
    });
  };

  const nextImage = (index) => {
    const image = imagesClean.find((img) => Number(img.index) === ((imagesClean.length - 1) <= index ? 0 : (index + 1)));
    const currentVar = variations?.find((v) => Number(v.variantId) === Number(image.id));
    
    setcurrentVariant({
      variantId: image.id,
      currentImg: image.image,
      color: currentVar.color,
      price: currentVar.price,
      index: image.index,
      variantName: currentVar.variationName
    });
  };
 
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="mx-auto max-w-6xl h-screen w-full bg-white shadow-xl overflow-auto">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Seller product</p>
            </div>
          </div>
        </header>

        <main className="gap-6 sm:p-6 lg:p-8">
          <section className="sm:space-y-6">
            <div className="sm:grid sm:gap-4 flex flex-col sm:grid-cols-[1fr_96px]">
              <div className="sm:rounded-[1.75rem] relative sm:h-125 bg-blue-50 sm:p-4 shadow-inner">
                <div className="h-full absolute opacity-0 transition duration-500 hover:opacity-100 top-0 left-0 w-full">
                  <button className="absolute hover:opacity-50 cursor-pointer top-1/2 -translate-y-1/2 left-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="absolute hover:opacity-50 cursor-pointer top-1/2 -translate-y-1/2 right-6"
                    onClick={()=> nextImage(currentVariant.index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <img
                  className="h-full w-full rounded-3xl object-contain"
                  src={`http://localhost:8080/api/seller/product-image/${currentVariant.currentImg}`}
                  alt=""
                />
              </div>
              <div className="overflow-x-auto h-28 flex flex-nowrap sm:block rounded-2xl p-2 sm:overflow-auto sm:h-125">
                {
                 imagesClean?.map((current) => 
                   <button
                     key={`${id}`}
                     className="rounded-[1.75rem]"
                     onClick={() => changeImage(current.id, current.image, current.index)}
                   >
                     <img
                       className="rounded-2xl object-cover max-h-full hover:border-2 border-blue-500"
                       src={`http://localhost:8080/api/seller/product-image/${current.image}`}
                       alt=""
                     />
                   </button>
                 )
                }                                                          
              </div>
            </div>
            <div className="border-y border-slate-300 sm:border-0 sm:bg-blue-50 sm:rounded-3xl flex items-center justify-between p-1.5 sm:p-5">  
              <div className="flex justify-between w-fit flex-col">
                <p className="mt-2 text-2xl font-semibold text-red-600">${currentVariant.price}</p>
                <p className="mt-2 font-semibold text-slate-900">{currentVariant.variantName}</p>
                <div className="flex gap-3">
                  <p className="mt-2 font-semibold text-slate-900">sku</p>
                  <p className="mt-2 font-semibold text-slate-900">red</p>
                  <p className="mt-2 font-semibold text-slate-900">10</p>
                  <p className="mt-2 font-semibold text-slate-900">v3</p>
                  <p className="mt-2 font-semibold text-slate-900">best</p>
                </div>
              </div>
              <CommonSvgIcon width={"40"} height={"40"} color={"red"} type={"heart"}></CommonSvgIcon>
            </div>
            <div className="space-y-6 mt-6">
              <div className="p-6 bg-blue-50 sm:w-[450px] w-fit rounded-[1.75rem]">
                <Text variant={"h3"}>Category</Text>
                <div className="mt-4 flex flex-wrap gap-3">
                  {categories?.map((cat) =>
                    <p
                      className="bg-[#6C5CE7] w-fit px-3 py-1.5 text-sm rounded-2xl text-white"
                    >{cat}</p>
                  )
                  }
                  {/* <p className="bg-[#6C5CE7] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">gaming</p>
                <p className="bg-[#0984E3] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">Electronics</p>
                <p className="bg-[#FD79A8] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">fashion</p>
                <p className="bg-[#E17055] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">home</p>
                <p className="bg-[#A29BFE] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">beauty</p>
                <p className="bg-[#00B894] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">sports</p>
                <p className="bg-[#FDCB6E] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">books</p>
                <p className="bg-[#E67E22] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">food</p>
                <p className="bg-[#636E72] w-fit px-3 py-1.5 text-sm rounded-2xl text-white">automotive</p> */}
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-blue-50 transition-all duration-400 ease-in-out hover:bg-blue-100 p-6">
                <div>
                  <div onClick={expandDescription}>
                    <Text variant={"h3"}>Description</Text>
                    <p
                      className={`mt-4 text-sm text-slate-900 cursor-pointer ${expanded ? '' : 'truncate'}`}
                    >
                      {cleanProduct.productDescription}
                    </p>
                    <p className="font-bold cursor-pointer text-sm">See more</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
