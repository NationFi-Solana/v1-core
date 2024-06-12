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
