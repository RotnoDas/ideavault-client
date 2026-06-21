export const fetchIdeas = async (search = '', category = '') => {
    let url = `${process.env.PUBLIC_ALL_API}/ideas?`;
    if (search) {
        url += `search=${encodeURIComponent(search)}&`;
    }
    if (category) {
        url += `category=${encodeURIComponent(category)}&`;
    }
    
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
        return [];
    }
    const ideas = await response.json();
    return ideas;
}
export const featuredIdeas = async() => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/featured`)
    if (!response.ok) {
        return [];
    }
    const ideas = await response.json();
    return ideas;
}