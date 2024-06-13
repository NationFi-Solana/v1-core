import groq from 'groq';

export const getMarket = groq`
*[_type == 'market' && slug.current == $slug ]{
    unixTimestamp, 
    title, 
    "thumb": thumbnail.asset->url,   
    description,
    optiona, 
    optionb
}`;
