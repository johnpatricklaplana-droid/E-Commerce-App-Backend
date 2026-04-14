import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Text from "../components/Text";
import CommonSvgIcon from "../components/CommonIcon";
import { useParams } from "react-router-dom";
import { GET } from "../api/API";
import { useSwipeable } from "react-swipeable";

export default function SellerProductInspect() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState({});
  const [variants, setvariants] = useState([]);
  const [activeVariant, setactiveVariant] = useState({
    id: "",
    color: "",
    image: "",
    price: "",
    sku: "",
    variantName: "",
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

  const categories = useMemo(() => {
    return product?.categories?.reduce((acc, category) => {
      return [...acc, category.categoryName]
    }, []);
  }, [product]);

  const cleanProduct = {
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
  };

  const forRefactor = useMemo(() => {
    return product?.variations?.reduce((acc, item) => {
      const imgs = item.imagesUrl.map((img) => {
        return {
          id: item.variantId,
          color: item.color,
          image: img,
          price: item.price,
          sku: item.sku,
          variantName: item.variationName
        }
      })
      return [...acc, imgs]
    }, []).flat().map((vary, i) => ({...vary, index: i}))
  }, [product]);

  useEffect(() => {
    setactiveVariant(forRefactor?.[0]);
  }, [forRefactor]);

  useEffect(() => {
    setvariants(forRefactor);
  }, [product]);

  const goNext = () => {
    const highIndex = variants.length - 1;
    const currentOne = activeVariant.index;

    const nextOne = currentOne + 1 > highIndex ? 0 : currentOne + 1;
    
    const realOne = variants.find(vary => vary.index === nextOne);
    
    setactiveVariant(realOne);
  };

  const goPrev = () => {
    const highIndex = variants.length - 1;
    const lowIndex = 0;
    const currentOne = activeVariant.index;

    const nextOne = currentOne - 1 < lowIndex ? highIndex : currentOne - 1;

    const realOne = variants.find(vary => vary.index === nextOne);

    setactiveVariant(realOne);
  };

  const jump = (index) => {
    const jumpTo = index;

    const realOne = variants.find(vary => vary.index === jumpTo);

    setactiveVariant(realOne);
  };

  const ratings = useMemo(() => {
    return product.ratings
  }, [product]);

  const expandDescription = () => {
    setExpanded(prev => prev ? false : true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: true
  });

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
              <div 
                {...swipeHandlers} 
                className="sm:rounded-[1.75rem] relative sm:h-125 bg-blue-50 sm:p-4 shadow-inner"
              >
                <div className="h-full absolute opacity-0 transition duration-500 hover:opacity-100 top-0 left-0 w-full">
                  <button 
                    className="absolute hover:opacity-50 cursor-pointer top-1/2 -translate-y-1/2 left-6"
                    onClick={goPrev}
                  >
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
                    onClick={goNext}
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
                  src={`http://localhost:8080/api/seller/product-image/${activeVariant?.image}`}
                  alt=""
                />
              </div>
              <div className="overflow-x-auto h-28 flex flex-nowrap gap-1.5 sm:block rounded-2xl p-2 sm:overflow-auto sm:h-125">
                {
                 variants?.map((current) => 
                   <button
                     key={`${id}`}
                     className={`rounded-[1.75rem] border-blue-500 ${current.index === activeVariant.index ? "border-2" : "border-0"}`}
                     onClick={() => jump(current.index)}
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
                <p className="mt-2 text-2xl font-semibold text-red-600">${activeVariant?.price}</p>
                <p className="mt-2 font-semibold text-slate-900">{activeVariant?.variantName}</p>
                <div className="flex items-center gap-1">
                  <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fff7b0" />
                        <stop offset="35%" stop-color="#ffd700" />
                        <stop offset="70%" stop-color="#ffb800" />
                        <stop offset="100%" stop-color="#ff8c00" />
                      </linearGradient>

                      <linearGradient id="shine" x1="0%" y1="0%" x2="200%" y2="0%">
                        <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                        <stop offset="45%" stop-color="rgba(255,255,255,0.6)" />
                        <stop offset="55%" stop-color="rgba(255,255,255,0.8)" />
                        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                        <animateTransform
                          attributeName="gradientTransform"
                          type="translate"
                          from="-1 0"
                          to="1 0"
                          dur="2.2s"
                          repeatCount="indefinite" />
                      </linearGradient>

                      <filter id="glow">
                        <feGaussianBlur stdDeviation="0.8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <path d="M12 2
           L15 9
           L22 9.5
           L17 14
           L18.5 21.5
           L12 17.8
           L5.5 21.5
           L7 14
           L2 9.5
           L9 9"
                      fill="url(#goldGrad)"
                      stroke="#ffcc33"
                      stroke-width="0.6"
                      filter="url(#glow)" />

                    <path d="M12 2
           L15 9
           L22 9.5
           L17 14
           L18.5 21.5
           L12 17.8
           L5.5 21.5
           L7 14
           L2 9.5
           L9 9"
                      fill="url(#shine)"
                      opacity="0.6" />
                  </svg>
                  <p className={`${ratings?.numberOfRaters === 0 ? "text-[#B0B0B0]" : "text-[#333333]"}`}>{ratings?.numberOfRaters === 0 ? "no rating" : ratings?.rating}</p>
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
