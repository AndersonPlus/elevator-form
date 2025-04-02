"use client"
import { useEffect, useState } from "react"
const ClientComponent = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos').then(data => data.json()).then(data => {
            setData(data);
            setLoading(false);
        })
    }, [])
    return (
        <div>
            <h1>Client Component</h1>
            <ul>
                {
                    loading ? "Loading..." : data.map((item) => (
                        <li key={item.id}>
                            <p>{item.title}</p>
                        </li> 
                    ))
                }
            </ul>
        </div> 
    )
}

export default ClientComponent;