import Autor from "./autor"

export const metadata = {
    title: 'Autores'
}

export default function Page() {
    return (
        <>
            <h2>Autores</h2>
            <div className="d-flex flex-wrap">
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
                <div className="w-25 mb-4">
                    <Autor />
                </div>
            </div>
        </>
    )
}