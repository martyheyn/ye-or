import { UUID } from "crypto"

export const celebsMap: {[key: string]: string} = {
    "kanye" : "Kanye (Ye)",
    "bilzerian" : "Dan Bilzerian",
    "owens" : "Candace Owens",
  }

export type QuoteType = {
  id: UUID
  quote: string
  answer: boolean | null
}

export type ReferenceType = {
  source: string;
  srcType: 'text' | 'video';
  srcLink: string;
}