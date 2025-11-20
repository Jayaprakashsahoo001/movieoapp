import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [loading, setaLoading] = useState(false)

    const fetchData = async () => {
        try {
            setaLoading(true)
            const response = await axios.get(endpoint)
            setaLoading(false)
            setData(response.data.results)

        } catch (error) {
            console.log("error", error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return { data, loading }
}


export default useFetch