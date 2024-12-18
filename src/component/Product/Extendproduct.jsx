import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import './Extendproduct.css';

const Extendproduct = () => {
  return (
    <div className="" id="products">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const [scrollAnimation, setScrollAnimation] = useState("");
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [1, 0], ["-80%", "1%"]);

  useEffect(() => {
    const customScrollAnimation = () => {
      if (window.innerWidth > 768) {
        setScrollAnimation("desktop-version");
      } else {
        setScrollAnimation("mobile-version");
      }
    };

    customScrollAnimation();

    window.addEventListener("resize", customScrollAnimation);

    return () => window.removeEventListener("resize", customScrollAnimation);
  }, []);

  return (
    <section
      ref={targetRef}
      className={`relative h-[300vh] bg-black ${
        scrollAnimation === "mobile-version" ? "scroll-smooth" : ""
      }`}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{
            x,
            ...(scrollAnimation === "desktop-version" && {
              transition: "transform 1s ease-out",
            }),
          }}
          className="flex gap-4"
        >
          <div
            className="card flex items-center justify-center"
          >
            <p className="inline-block font-normal text-3xl sm:text-4xl lg:text-[2.7rem] text-headerLaseWhite">
              Our <span className="text-white">Products...</span>
            </p>
          </div>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden card"
    >
      <div
        style={{
          backgroundImage: `${card.url}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 "
      ></div>
      <div className="absolute inset-0 z-10 product-card-data">
        <h2 className="title-num font-light">{card.id}</h2>
        <p className="uppercase text-white product-title font-ppbook">
          {card.title}
        </p>
        <span className="product-description font-ppbook">
          {card.description}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20 text-white">
        <ArrowUpRight size={30} />
      </div>
    </a>
  );
};

export default Extendproduct;

const cards = [
  {
    id: "001",
    title: "THROUGHBIT",
    description:
      "Redefining Bitcoin and Ethereum Transactions in India with INRFalcon for Lightning-Fast Trading.",
    url: "url('/product/throughbit.png')",
    link: "https://throughbit.com",
  },
  {
    id: "002",
    title: "COINDIARY",
    description:
      "Your Gateway to Staying informed, Engaged, and Leading the Way in the Crypto Space.",
    url: "url('product/coindairybg.png')",
    link: "https://coindiary.com/",
  },
  {
    id: "003",
    title: "SQUARENFT",
    description:
      "Dive into the Future of RealEstate and Own Your NFT Land from Any Corner of the Globe.",
    url: "url('/product/squarenft.png')",
    link: "https://squarenft.com",
  },
  {
    id: "004",
    title: "THEBITCOIN.COM",
    description:
      "Your Innovative Exchange Hub Connecting Cash and Cryptocurrency for Easy Transactions.",
    url: "url('/product/bitcoin.png')",
    link: "https://www.thebitcoin.com/",
  },
];
