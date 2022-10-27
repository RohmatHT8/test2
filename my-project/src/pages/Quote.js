import RowQuotes from "../component/RowQuotes";
import { useEffect } from "react"
import { useState } from "react"

export default function Quotes() {
    const [quotes, setQuotes] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(result => result.json())
            .then(data => setQuotes(data))
    }, [])
    console.log(quotes)
    return (
        <div className='max-w-lg mx-auto mt-3'>
            <table className="table-fixed text-left">
                <thead>
                    <tr>
                        <th>No</th>
                        <th className='w-[30%]'>Name</th>
                        <th>Quotes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !quotes ? <p>loading...</p> : quotes.map((el, idx) => <RowQuotes key={idx} el={el} id={idx + 1}/>)
                    }
                    
                </tbody>
            </table>
        </div>
    )
}