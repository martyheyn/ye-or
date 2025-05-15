"use client"
import { useState } from "react"
import { celebsMap, QuoteType, ReferenceType } from "@/app/utils/types"
import Reference from "./reference";

interface QuoteProps {
    quotes: QuoteType[];
    author: string;
    setQuotes: (selected: QuoteType[]) => void;
}

export default function Quote({ quotes, author, setQuotes }: QuoteProps) {
    const [references, setReferences] = useState<ReferenceType[]>()
    const [score, setScore] = useState<string>()
    const [quoteAuthor, setQuoteAuthor] = useState<string>()
    const [selectedAuthor, setSelectedAuthor] = useState<string>()
    const [quoteCount, setQuoteCount] = useState(0)
    const [direction, setDirection] = useState<string>()

    const selectAuthorGuess = (guess: string) => {
        if(guess === selectedAuthor) {
            setSelectedAuthor(undefined)
            return
        }
        setSelectedAuthor(guess)
    }

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `/api/quote?id=${quotes[quoteCount].id}&guess=${selectedAuthor}`,
                { method: 'POST' }
            )
            const data = await res.json()

            setQuoteAuthor(data.author)
            const newQuote = quotes.map((q, i) => i === quoteCount ? { ...q, answer: data.author === selectedAuthor } : q)
            setQuotes(newQuote)

            const newRef = {
                source: data.source,
                srcType: data.srcType,
                srcLink: data.srcLink,
            }

            const totals = newQuote.filter((q) => q.answer !== null).length
            const correct = newQuote.filter((q) => q.answer).length
            setScore(`${correct} / ${totals}`)

            const reff = references ? [...references, newRef] : [newRef]
            setReferences(reff)
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    }

    const reset = () => {
        setQuoteAuthor(undefined)
        setSelectedAuthor(undefined)
    }

    const resart = () => {
        setScore(undefined)
        setQuoteAuthor(undefined)
        setSelectedAuthor(undefined)
        setQuoteCount(0)
        setQuotes([])
    }

    return (
        <div className="w-full h-full flex-auto flex flex-col justify-center items-center gap-y-6 p-8 mt-6">
            <h1 className="text-2xl font-semibold transition-all duration-300 ease-in-out text-black dark:text-white">{ celebsMap[author] } or Hitler</h1>
            
            <div className={`flex flex-col gap-y-6 justify-center items-center ${direction === 'forward' ? 'animate-in-right' : 'animate-in-left'}`} key={quoteCount}>
                <p className="text-lg italic transition-all duration-300 ease-in-out text-black dark:text-white">"{quotes[quoteCount].quote}"</p>

                <div className="w-full flex flex-row justify-center items-center gap-x-32">
                    <img 
                        src={`img/${author}.png`}
                        alt="author"
                        onClick={() => selectAuthorGuess(author)}
                        className={`w-24 h-24 rounded-full object-cover transition-all duration-100 border border-black/20 ${selectedAuthor !== "nazi" && selectedAuthor !== undefined ? "outline-2 outline-offset-2 outline-[#1d9b3a]" : "outline-0"} ${!quoteAuthor ? '' : quoteAuthor !== 'nazi' ? 'outline-2 outline-offset-2 outline-[#1d9b3a]' : quoteAuthor !== selectedAuthor && selectedAuthor !== 'nazi' ? 'outline-2 outline-offset-2 outline-[#e32c2c]' : ''} ${quoteAuthor || quotes[quoteCount].answer !== null ? 'pointer-events-none' : 'hover:scale-[1.01] hover:drop-shadow-2xl cursor-pointer'} dark:border-white/70`}
                    />
                    <img
                        src="/img/swastika.svg"
                        alt="nazi" 
                        onClick={() => selectAuthorGuess("nazi")}
                        className={`w-24 h-24 rounded-full object-cover transition-all duration-100 border border-black/20 ${selectedAuthor === "nazi" ? "outline-2 outline-offset-2 outline-[#1d9b3a]" : "outline-0"} ${!quoteAuthor ? '' : quoteAuthor === 'nazi' ? 'outline-2 outline-offset-2 outline-[#1d9b3a]' : quoteAuthor !== 'nazi' && selectedAuthor === 'nazi' ? 'outline-2 outline-offset-2 outline-[#e32c2c]' : ''} ${quoteAuthor || quotes[quoteCount].answer !== null ? 'pointer-events-none' : 'hover:scale-[1.01] hover:drop-shadow-2xl cursor-pointer'} dark:border-white/70`}
                    />
                </div>

                {quotes[quoteCount].answer !== null ? (
                    <div className="flex flex-col gap-y-4 items-center">
                        <div className={`flex flex-row justify-center gap-x-12`}>
                            {quoteCount > 0 && (
                                <div 
                                    className={`transition-all duration-200 ease-in-out py-2 px-4 bg-white drop-shadow-md hover:drop-shadow-xl hover:scale-[1.005] cursor-pointer rounded-md animate-in-left delay-700`}
                                    onClick={() => {
                                        setQuoteCount(quoteCount - 1)
                                        setDirection('back')
                                        reset()
                                    }}
                                > 
                                    <svg  className={`flex justify-center item-center rotate-[180deg] w-6 h-6`}>
                                        <path
                                        className="stroke-black"
                                        d="M10 7L15 12L10 17"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        />
                                    </svg>
                                </div>
                            )}

                            <div className={`transition-all duration-200 ease-in-out px-6 py-2 drop-shadow-md rounded-md text-white ${quoteAuthor === selectedAuthor ? 'bg-green-400' : 'bg-red-400'} animate-in-down delay-100`}>
                                {quotes[quoteCount].answer ? quotes[quoteCount].answer ? 'Correct' : 'Incorrect' : quoteAuthor === selectedAuthor ? 'Correct' : 'Incorrect' }
                            </div>

                            {quoteCount < quotes.length - 1 && (
                                <div 
                                    className={`transition-all duration-200 ease-in-out py-2 px-4 bg-white drop-shadow-md hover:drop-shadow-xl hover:scale-[1.005] cursor-pointer rounded-md animate-in-right delay-700`}
                                    onClick={() => {
                                        setQuoteCount(quoteCount + 1)
                                        setDirection('back')
                                        reset()
                                    }}

                                > 
                                    <svg className={`flex justify-center item-center w-6 h-6`}>
                                        <path
                                        className="stroke-black"
                                        d="M10 7L15 12L10 17"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="text-lg font-semibold">{score}</p>
                    </div>
                ) : (
                    <div className={`transition-all duration-200 ease-in-out ${selectedAuthor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <button
                            onClick={onSubmit}
                            className="bg-white dark:bg-[#7b7878] hover:dark:bg-[#616060] dark:border-white/70 px-6 py-2 drop-shadow-md transition-all duration-200 hover:drop-shadow-xl hover:scale-[1.005] cursor-pointer rounded-md text-black dark:text-white"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            {quotes[quoteCount].answer !== null && references && references[quoteCount] && (
                <div className="animate-in-up delay-100">
                    <Reference source={references[quoteCount].source} srcLink={references[quoteCount].srcLink} srcType={references[quoteCount].srcType}  />
                </div>
            )}

            {quoteCount === 17 && quotes[quoteCount].answer !== null && (
                <button
                    onClick={resart}
                    className="w-fit bg-[#f0efef] hover:bg-[#efeeee] dark:bg-[#7b7878] hover:dark:bg-[#616060] dark:border-white/70 px-6 py-2 drop-shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:drop-shadow-xl hover:scale-[1.005] rounded-md text-black dark:text-white mt-2">
                    Replay
                </button>
            )}
        </div>
    )
}