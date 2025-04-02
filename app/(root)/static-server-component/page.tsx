const list = [
    {
        id: 1,
        title: "Learn Next.js",
        description: "I Want to Learn Next.js",
    },
    {
        id: 2,
        title: "Learn React",
        description: "I Want to Learn React",
    },
]
const StaticServerComponent = () => {
    const getList = () => {
       return list; 
    }
    return (
        <div className="w-screen flex justify-center pt-16">
            <ul>
                {getList().map((item) => (
                    <li key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StaticServerComponent;