import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type Coords = [number, number];

export default function Home() {
    const [selection, setSelection] = useState<[number, number][]>([[0, 0]])
    const [validSqr, setValidSqr] = useState<[number, number][]>([])

    function inSelection(i: Coords) {
        return selection.some((j) => j[0] === i[0] && j[1] === i[1])
    }

    function isValid(i: Coords) {
        return validSqr.some((j) => j[0] === i[0] && j[1] === i[1])
    }

    function newValidSqr(i: Coords) {
        console.log("selected sqr", i)
        setValidSqr([[i[0], 0], [i[0], 1]])
    }

    useEffect(() => {
        document.addEventListener("mouseup", () => {
            setSelection([])
        })
    }, [])

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen flex items-center justify-center">
                <button onClick={() => {
                    setSelection([...selection, [1, 1]])
                    console.log(selection)
                }}>Click me</button>
                <Card>
                    <div className="p-4 aspect-square grid grid-cols-2 grid-rows-2 gap-1">
                        {
                            ["a", "b", "c", "c"].map((letter, i) => {
                                const coords: Coords = [i % 2, Math.floor(i / 2)]
                                return (
                                    <div key={i}
                                        onMouseDown={() => {
                                            setSelection([...selection, coords])
                                            newValidSqr(coords)
                                        }}
                                        onMouseOver={() => {
                                            if (selection.length > 0 && isValid(coords)) {
                                                setSelection([...selection, coords])
                                            }
                                        }}
                                        className={
                                            cn("aspect-square p-1 h-10 bg-red-500 flex justify-center items-center select-none", inSelection(coords) ? "selected bg-blue-500" : "sqr")
                                        }
                                    >
                                        {letter}
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card>
            </main>
        </>
    );
}
