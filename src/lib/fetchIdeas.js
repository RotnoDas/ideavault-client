export const fetchIdeas = async () => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/ideas`);
    const ideas = await response.json();
    return ideas;
}

export const featuredIdeas = async() => {
    const response = await fetch(`${process.env.PUBLIC_ALL_API}/featured`)
    const ideas = await response.json();
    return ideas;
}