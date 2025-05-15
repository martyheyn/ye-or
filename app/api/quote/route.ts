import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const author = searchParams.get('author');

    if(!author) {
        return NextResponse.json({ error: 'Author parameter is required' }, { status: 400 });
    }

    const result = await db.query(
        `SELECT id, quote, null as answer FROM (
            (SELECT id, quote FROM quotes WHERE author = 'nazi' ORDER BY RANDOM() LIMIT 18/2) 
                UNION ALL 
            (SELECT id, quote FROM quotes WHERE author =$1 ORDER BY RANDOM() LIMIT 18/2)
        ) AS combined_quotes ORDER BY RANDOM();`, [author]
    )

    return NextResponse.json(result.rows || { text: "No quote found" });
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id')
    const guess = searchParams.get('guess')

    if(!guess || !quoteId) {
        return NextResponse.json({ error: 'All parameters are required' }, { status: 400 });
    }

    const quote = await db.query(`SELECT * from quotes where id=$1`, [quoteId])

    if(quote.rows.length === 0) {
        return NextResponse.json({ error: 'Error, invalid query' }, { status: 500 });
    }

    if(!quote.rows[0].author) {
        return NextResponse.json({ error: 'Error, invalid query' }, { status: 500 });
    }

    const answer = {
        author: quote.rows[0].author,
        source: quote.rows[0].source,
        srcType: quote.rows[0].src_type,
        srcLink: quote.rows[0].src_link,
    }

    if(!answer) {
        return NextResponse.json({ error: 'Error, no answer' }, { status: 500 });
    }


    return NextResponse.json(answer);
}