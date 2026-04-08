import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";
import DynamicLayout from "../layouts/DynamicLayout";
import MainLayout from "../layouts/MainLayout";
import GenresLayout from "../layouts/GenresLayout";
import Top10Layout from "../layouts/Top10Layout";
import useGenresStore from "../store/genresStore";
import { useEffect } from "react";
import useTopTenStore from "../store/toptenStore";
import Footer from "../components/Footer";

import { genres } from "../utils/genres";
import { Helmet } from "react-helmet";
const Home = () => {
  const { data, isLoading, error, isError } = useApi("/home");

  const setGenres = useGenresStore((state) => state.setGenres);
  const setTopTen = useTopTenStore((state) => state.setTopTen);

  useEffect(() => {
    setGenres(genres);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setTopTen(data.data.topTen);
    }
  }, [data]);

  if (isError) {
    notify("error", error.message);
    return;
  }
  return (
    <div className="relative">
      <Helmet>
        <title>
          Watch Anime Online, Free Anime Streaming Online on watanuki Anime
          Website
        </title>
        <meta
          name="description"
          content=" watanuki to is a free no ads anime site to watch free anime. Online anime streaming at watanuki with DUB, SUB in HD watanuki.shop."
        />
        <meta property="og:title" content="home - watanuki" />
      </Helmet>
      {isLoading ? (
        <Loader className="h-[100dvh]" />
      ) : (
        <>
          <HeroBanner slides={data?.data?.spotlight} />
          <div className="xl:mx-10">
            <TrendingLayout data={data?.data?.trending} />
            <div className="grid mx-2 grid-cols-12 gap-4 my-5">
              <DynamicLayout
                title="Top Airing"
                endpoint="top-airing"
                data={data?.data?.topAiring}
              />
              <DynamicLayout
                title="Most Popular"
                endpoint="most-popular"
                data={data?.data?.mostPopular}
              />
              <DynamicLayout
                title="Most Favorite"
                endpoint="most-favorite"
                data={data?.data?.mostFavorite}
              />
              <DynamicLayout
                title="Latest Completed"
                endpoint="completed"
                data={data?.data?.latestCompleted}
              />
            </div>
            <div className="row grid my-10 gap-2 justify-center grid-cols-12 sm:mx-2">
              <div className="left col-span-12 xl:col-span-9">
                <MainLayout
                  title="Latest Episode"
                  endpoint="recently-updated"
                  data={data?.data?.latestEpisode}
                />
                <MainLayout
                  title="New Added"
                  endpoint="recently-added"
                  data={data?.data?.newAdded}
                />
                <MainLayout
                  title="Top Upcoming"
                  endpoint="top-upcoming"
                  data={data?.data?.topUpcoming}
                />
              </div>
              <div className="right col-span-12 xl:col-span-3">
                <GenresLayout />
                <Top10Layout />
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
