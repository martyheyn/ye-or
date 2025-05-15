"use client"

import { useState } from "react";
import { ThemeProvider } from 'next-themes'
import Quote from "@/components/quote";
import { QuoteType } from './utils/types'
import ThemeBtn from "@/components/theme-btn";

export default function Home() {
  const [author, setAuthor] = useState<string>()
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [key, setKey] = useState(0);

  const startGame = async () => {
    setAuthor("kanye")
    setKey(prevKey => prevKey + 1);

    try {
        const res = await fetch(`/api/quote?author=kanye`)
        const data = await res.json()

        setQuotes(data)
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
  }

  return (
    <ThemeProvider attribute="class">
      <div className={`p-4 bg-[#fffefe] dark:bg-[#222121] text-black dark:text-white flex min-h-screen w-full"`}>
        <div className="w-full" id="base">
          <div className="flex flex-row justify-between items-center">
            <a href="/" className="text-3xl font-bold pointer-events-none">
              Kanye or Hitler
            </a>
            <ThemeBtn />
          </div>
            <div className="transition-opacity duration-300 ease-in-out">
                {author && quotes.length > 0 ? (
                    <div key={key} className={`animate-fade-in delay-500`}>
                      <Quote quotes={quotes} author={author} setQuotes={setQuotes} />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center text-center mt-20 md:mt-24 px-8">
                      <div className=" max-w-3xl flex flex-col gap-y-6 items-center">
                          <p className="text-2xl md:text-xl">Welcome to Kanye vs Hilter. This a simple game with an easy objective... Guess if a presented quote is from Ye (the artist formally known as Kanye West), or if it was said by the H man himself</p>
                          <button 
                            onClick={() => startGame()}
                            className="w-fit bg-[#f0efef] hover:bg-[#efeeee] dark:bg-[#7b7878] hover:dark:bg-[#616060] dark:border-white/70 px-6 py-2 drop-shadow-md transition-all duration-200 ease-in-out cursor-pointer hover:drop-shadow-xl hover:scale-[1.005] rounded-md text-black dark:text-white mt-8">
                              Start
                            </button>
                      </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
