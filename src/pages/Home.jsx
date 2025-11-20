import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

import useFetch from '../hooks/useFetch'

function Home() {
  const trendingData = useSelector(state => state.movieoData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing?api_key=9d2df73bb12e1429b9a048dc7e43c1fc')
  const {data : topRatedData } = useFetch('/movie/top_rated?api_key=9d2df73bb12e1429b9a048dc7e43c1fc')
  const {data : popularTvShowData} = useFetch('/tv/popular?api_key=9d2df73bb12e1429b9a048dc7e43c1fc')
  const {data : onTheAirShowData} = useFetch('/tv/on_the_air?api_key=9d2df73bb12e1429b9a048dc7e43c1fc')


  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular TV Show"} media_type={"tv"}/>
      <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"}  media_type={"tv"}/>

    </div>
  )
}

export default Home
