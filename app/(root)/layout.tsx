const AppLayot = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-screen pt-16 flex flex-col items-center">
            { children }
        </main>
    )
}

export default AppLayot;