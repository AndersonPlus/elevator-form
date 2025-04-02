import { headers } from "next/headers";

const DynamicServerComponent = async () => {
    const header = await headers();
    const ua = header.get("user-agent");
    const isMobile = ua?.includes("Mobile");
    return (
        <div>
            <p>Dynamic Server Component</p>
            <p>{isMobile ? "Mobile" : "Desktop"}</p>
        </div>
    )
}

export default DynamicServerComponent;