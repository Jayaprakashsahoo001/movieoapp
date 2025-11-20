import { useEffect, useState } from "react"
import axios from 'axios'


const useFetchDetails = (endpoint) => {
    const [data, setData] = useState([])
    const [loading, setaLoading] = useState()

    const fetchData = async () => {
        try {
            setaLoading(true)
            const response = await axios.get(endpoint)
            setaLoading(false)
            setData(response.data)

        } catch (error) {
            console.log("error", error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return { data, loading }
}


export default useFetchDetails