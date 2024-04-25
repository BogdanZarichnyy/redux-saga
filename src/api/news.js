export const getLatestNews = async (searchQuery = 'react') => {
    console.log(searchQuery);
    // const request = await fetch('https://hn.algolia.com/api/v1/search?query=react&hitsPerPage=10&page=0');
    // const request = await fetch(`https://h1n.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=10&page=0`); // для yield all() ломаємо один із запитів на АРІ
    const request = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=10&page=0`);
    return await request.json();
}

export const getPopularNews = async () => {
    // const request = await fetch('https://h1n.algolia.com/api/v1/search?query=&hitsPerPage=10&page=0'); // для yield all() ломаємо один із запитів на АРІ
    const request = await fetch('https://hn.algolia.com/api/v1/search?query=&hitsPerPage=10&page=0');
    return await request.json();
}