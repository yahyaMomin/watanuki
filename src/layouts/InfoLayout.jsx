/* eslint-disable react/prop-types */
import { useState } from "react";
import SoundsInfo from "../components/SoundsInfo";
import { Link } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import CircleRatting from "../components/CircleRatting";

const InfoLayout = ({ data, showBigPoster }) => {
  const [showFull, setShowFull] = useState(false);

  // Regular expression to check if the string ends with a number

  const colors = [
    "#d0e6a5",
    "#ffbade",
    "#fc887b",
    "#ccabda",
    "#abccd8",
    "#d8b2ab",
    "#86e3ce",
  ];
  return (
    <>
      <div className="banner min-h-[700px] relative w-full bg-[#262525] pt-10 md:pt-20">
        <div className="backdrop-img bg-backGround w-full h-full absolute top-0 left-0 overflow-hidden opacity-[.1]">
          <img
            src={data.poster}
            alt={data.title}
            className="object-cover object-center h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="opacity-overlay"></div>
        <div className="content max-w-[1200px] w-full mx-auto flex flex-col items-start md:flex-row gap-2 mb-2 relative px-2">
          <div className="left w-full md:w-60 xl:w-80 flex justify-center">
            <div
              className="posterImg px-5 md:w-full cursor-pointer"
              onClick={() => showBigPoster(data.poster)}
            >
              <img
                src={data.poster}
                alt={data.title}
                className="rounded-md h-full w-full"
              />
            </div>
          </div>
          <div className="right mt-3 w-full flex flex-col gap-2">
            <div className="path hidden md:flex items-center gap-2 text-base ">
              <Link className="" to="/home">
                <h4 className="">home</h4>
              </Link>
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <Link to={`/animes/${data.type.toLowerCase()}`}>
                <h4 className="hover:text-primary">{data.type}</h4>
              </Link>
              <span className="h-1 w-1  rounded-full bg-primary"></span>
              <h4 className="gray">{data.title}</h4>
            </div>
            <h1 className="title text-lg md:text-4xl font-extrabold">
              {data.title}
            </h1>
            <div className="alternative gray text-lg font-bold">
              {data.alternativeTitle}
            </div>
            <div className="alternative gray text-lg font-bold">
              {data.japanese}
            </div>
            <div className="sounds flex items-center gap-2 my-2">
              <SoundsInfo
                episodes={{
                  rating: data.rating,
                  ...data.episodes,
                }}
              />
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <span className="type text-[#ccc] text-sm font-bold">
                {data.type}
              </span>
              <span className="h-1 w-1 rounded-full bg-primary"></span>
              <span className="duration text-[#ccc] text-sm font-bold">
                {data.duration}
              </span>
            </div>
            <div className="cercle h-14 w-14">
              <CircleRatting rating={data.MAL_score} />
            </div>
            {data.id && (
              <div className="watch-btn my-4">
                <Link to={`/watch/${data.id}`}>
                  <button className=" flex justify-center items-center gap-2 py-1 rounded-3xl text-lg text-black bg-primary w-1/2 ">
                    <FaCirclePlay />
                    <span>Watch Now</span>
                  </button>
                </Link>
              </div>
            )}
            <div className="genres rounded-child flex flex-wrap">
              {data.genres.map((genre, index) => (
                <Link to={`/animes/genre/${genre.toLowerCase()}`} key={genre}>
                  <p
                    style={{ background: colors[index % colors.length] }}
                    className="px-2 border border-black text-black py-0.5 rounded-none "
                  >
                    {genre}
                  </p>
                </Link>
              ))}
            </div>

            {data.synopsis && (
              <div className="overview">
                <p
                  className={`${
                    showFull ? "line-clamp-none" : "line-clamp-3"
                  } text-balance text-gray-300`}
                >
                  {data.synopsis}
                </p>
                <span
                  onClick={() => setShowFull(!showFull)}
                  className="text-sm cursor-pointer font-extrabold"
                >
                  {showFull ? " - LESS" : " - MORE"}
                </span>
              </div>
            )}
            <div className="lightBorder"></div>

            <div className="infor flex-col sm:flex-row flex gap-5">
              <div className="flex gap-1 status">
                <p className="font-extrabold">status : </p>
                <span className="text-lighttext">{data.status}</span>
              </div>
              <div className="flex gap-1 aired">
                <p className="font-extrabold">Aired : </p>
                <div className=" text-lighttext flex  items-center gap-2">
                  <span>{data.aired.from}</span>
                  {data.aired.to && (
                    <>
                      <span>
                        <FaArrowRight />
                      </span>
                      <span>{data.aired.to}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="lightBorder"></div>
            {data.studios && (
              <>
                <div className="studio">
                  <span>Studio : </span>
                  <div>
                    {data.studios.map((studio) => (
                      <Link
                        key={studio}
                        to={`/producer/${studio
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <span className="text-primary">{data.studios}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="lightBorder"></div>
              </>
            )}
            <div className="studio">
              <h4 className="text-center mb-2">Producers</h4>
              {data.producers && (
                <ul className="flex flex-wrap gap-2">
                  {data.producers.map((producer, index) => (
                    <Link
                      to={`/producer/${producer}`}
                      key={producer}
                      className="hover:opacity-[0.7]"
                    >
                      <li style={{ color: colors[index % colors.length] }}>
                        {producer}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
            <div className="lightBorder"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoLayout;
