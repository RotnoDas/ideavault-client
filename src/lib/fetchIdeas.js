export const fetchIdeas = async (search = '') => {
    const url = search 
        ? `${process.env.PUBLIC_ALL_API}/ideas?search=${encodeURIComponent(search)}`
        : `${process.env.PUBLIC_ALL_API}/ideas`;
    const response = await fetch(url, { cache: 'no-store' });
    const ideas = await response.json();
    return ideas;
}
export const featuredIdeas = async() => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/featured`)
    const ideas = await response.json();
    return ideas;
}