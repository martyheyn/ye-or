import { ReferenceType } from '@/app/utils/types'

export default function Reference({ source, srcType, srcLink }: ReferenceType) {
    return (
        <div className="w-full h-full flex flex-col items-center items-cente gap-y-4">
            {srcType === 'video' && (
                <iframe className="h-[315px] md:h-[375px] w-[95vw] md:w-[70vw]" src={srcLink} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            )}

            <div className={`flex flex-row gap-x-3 items-center transition-all duration-300 ease-in-out text-black dark:text-white ${srcType === 'video' ? 'mt-2' : ''}`}>
                <p className="text-lg">- {source}</p>
                {srcType === 'text' && (
                    <a className="text-blue-500 dark:text-blue-300 text-lg" target='_blank' href={srcLink}>
                        link
                    </a>
                )}
            </div>
        </div>
    )
}