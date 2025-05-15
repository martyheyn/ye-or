"use client"
import { useState } from "react"
import { celebsMap, QuoteType } from "@/app/utils/types"

interface SelectProps {
  celebs: string[];
  author?: string;
  setAuthor: (selected: string) => void;
  setQuotes: (selected: QuoteType[]) => void;
}

export default function Select({ celebs, author, setAuthor, setQuotes } : SelectProps) {
    const [selectOpen, setSelectOpen] = useState(false)

    const openSelect = () => {
        if(selectOpen) {
            setSelectOpen(false)
        } else {
            setSelectOpen(true)
        }
    }

    const selectAuthor = async (celeb: string) => {
        setAuthor(celeb)
        setSelectOpen(false)

        try {
            const res = await fetch(`/api/quote?author=${celeb}`)
            const data = await res.json()

            setQuotes(data)
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    }

    return (
        <div>
            <button
            className={`flex flex-row justify-between items-center w-72 text-lg py-1.5 sm:py-2 pl-3 sm:pl-4 pr-2 gap-x-4 transition-all duration-200 delay-0
                rounded-md group cursor-auto border hover:border-black/30 hover:dark:border-white/70 ${selectOpen ? "border-black/30 dark:border-white/70" : "border-black/5 dark:border-white/40"} drop-shadow-2xl ease-in-out relative`}
            >
                {author ? (
                    <p className="transition-all duration-300 ease-in-out">{celebsMap[author]}</p>
                ) : (
                    <p className="transition-all duration-300 ease-in-out">Please select a celeb</p>
                )}
                <span
                    className="transition-all duration-200 ease-in-out sm:opacity-0 sm:-translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 cursor-pointer"
                    onClick={openSelect}
                >
                    <svg 
                        className={`transition-all duration-200 ease-in-out delay-100 ${selectOpen ? "rotate-[270deg]" : " rotate-90"}`}
                        width="28"
                        height="28"
                    >
                        <path
                        className="stroke-black dark:stroke-white"
                        d="M10 7L15 12L10 17"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        />
                    </svg>
                </span>
            </button>
            <div className={`absolute top-[58px] md:top-[62px] left-4 w-72 flex flex-col text-left transition-all duration-200 ease-in-out ${selectOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-16 pointer-events-none"}`}>
                {celebs.map((celeb, i) => (
                    <button
                        key={`${celeb}-${i}`}
                        className={`w-full border border-black/20 h-[42px] md:h-[46px] dark:border-white/70 text-left py-2 px-4 transition-all duration-200 ease-in-out text-xl ${i === 0 ? "rounded-t-md" : "rounded-t-none"} ${i === (celebs.length - 1) ? "rounded-b-md" : "rounded-b-none"} ${celeb === author ? 'bg-[#efefef] dark:bg-[#242323] pointer-events-none' :  'bg-[#fffefe] hover:bg-[#efefef] dark:bg-[#242323] hover:dark:bg-[#383636] cursor-pointer '}`}
                        onClick={() => selectAuthor(celeb)}
                    >
                        { celebsMap[celeb] }
                    </button>
                ))}
            </div>
        </div>
    )
}