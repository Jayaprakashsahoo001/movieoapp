import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { document } from 'postcss';
import Card from '../components/Card';


function ExplorePage() {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)


  console.log("params", params.explore);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/${params.explore}?api_key=9d2df73bb12e1429b9a048dc7e43c1fc`, {
        params: {
          page: pageNo
        },
      });

      setData((prev) => [
        ...prev,
        ...response.data.results
      ]);

      setTotalPageNo(response.data.total_pages)

    } catch (error) {
      console.log("API Error:", error);

    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHieght) {
      setPageNo(preve => preve + 1)
    }
  };

  useEffect(() => {
    if (params.explore) {
      fetchData()
    }
  }, [params.explore, pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore} show</h3>
      </div>


      <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
        {
          data.map((exploreData, index) => {
            return (
              <Card data={exploreData} key={exploreData.id + "exploreSEction"} media_type={params.explore} />
            )
          })
        }
      </div>

    </div>
  )
}

export default ExplorePage;
