import ContentWrapper from "../components/ContentWrapper";
import { FaArrowCircleRight, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import banner from "../assets/homeBanner.png";
import background from "../assets/background.jpg";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Root = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const changeInput = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${value}`);
  };
  return (
    <ContentWrapper>
      <div className="pt-2">
        <Navbar />
        <div
          className="box relative py-3 px-2 md:p-5 mt-4 bg-lightBg rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="box-content relative">
            <div className="flex justify-center items-center">
              <img className=" h-8 md:h-10 w-auto" src={logo} alt="logo" />
            </div>
            <div className="searchBox mt-5">
              <form
                onSubmit={handleSubmit}
                action={`/search?keyword=${value}`}
                className="flex h-10 justify-center items-center"
              >
                <input
                  value={value}
                  onChange={changeInput}
                  type="text"
                  placeholder="search anime..."
                  className="w-full text-lg md:w-1/2 px-3 bg-white text-black input h-full"
                />
                <button
                  type="submit"
                  className="px-3 bg-primary btn w-11  h-full"
                >
                  <FaSearch />
                </button>
              </form>
              <div className="banner flex justify-center items-center">
                <img src={banner} alt="" />
              </div>
              <div className="explore w-full flex justify-center items-center mt-5 ">
                <Link
                  to="/home"
                  className="font-bold bg-primary px-4 py-2 rounded-xl w-full md:w-1/2"
                >
                  <h1 className="flex justify-center items-center gap-2 text-base">
                    <p> Explore Animes</p>
                    <FaArrowCircleRight />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Root;
