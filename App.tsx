
function App() {
    return (
        <>
            <main className="max-w-2xl mx-auto flex px-4 py-8 gap-8">
                <div className="py-8 flex  flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">

            <span className="text-5xl">
              textPulse: fast
            </span>
                        <br />
                        <span className="bg-gradient-to-br from-orange-600 to-yellow-400 bg-clip-text text-transparent">
              video summarizer
            </span>
                    </h1>

                    <form className="grid gap-2 overflow-hidden">
                        <input
                            className="border-2 rounded-full bg-transparent text-white  px-4 py-2 grow"
                            type="url" placeholder="https://...."/>
                        <button
                            className="bg-amber-400 text-white px-4 py-2 rounded-full font-bold"
                            type="submit">
                            Create video
                        </button>
                    </form>
                </div>
                <div className="p=8">
                    <div className="bg-gray-200 w-[240px] h-[480px] text-gray-500 rounded-2xl p-8">
                    </div>
                </div>
            </main>

        </>
    )
}

export default App
