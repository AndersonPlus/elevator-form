import ElevatorForm from "@/components/elevator/elevator-form";
import Link from "next/link";
const router = [
    {
        path: 'static-server-component',
        title: 'StaticServerComponent'
    },
    {
        path: 'dynamic-server-component',
        title: 'DynamicServerComponent'
    }
]
export default function Home() {
    return (
        <>
            <ElevatorForm />
            {
                router.map((item, index) => (
                    <div className="!block hover:bg-amber-200 hover:cursor-pointer transition duration-700 p-5 rounded-2xl" key={index}>
                        <Link key={index} href={`/${item.path}`}>
                            {item.title}
                        </Link>
                    </div>
                ))
            }
        </>
    );
}
