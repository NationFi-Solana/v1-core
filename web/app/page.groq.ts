import groq from 'groq';

export const getMarkets = groq`
*[_type == 'market']{
    unixTimestamp, 
    title, 
    "thumb": thumbnail.asset->url,
    slug, 
    _id,
    optiona,
    optionb
}
`;

export const getMarketsByCategory = groq`
*[_type == 'market' && category.current == $category]{
    unixTimestamp, 
    title, 
    "thumb": thumbnail.asset->url,
    slug, 
    _id,
    optiona,
    optionb
}
`

export const getCategories = groq`
*[_type == 'category'] {
    slug,
    title
}
`
