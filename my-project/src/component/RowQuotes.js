export default function RowQuotes({ el, id }) {
    return (
        <>
            < tr >
                <td>{id}</td>
                <td>{el.a}</td>
                <td>{el.q}</td>
            </tr >
        </>
    )
}