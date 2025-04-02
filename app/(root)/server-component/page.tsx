const ServerComponent = async () => {
    const todos: any[] = await fetch('https://jsonplaceholder.typicode.com/todos').then(data => data.json());
    return (
        <div>
            <h1>Server Component</h1>
            <ul>
                {
                    todos.map((item) => (
                        <li key={item.id}>
                            <p>{item.title}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ServerComponent;