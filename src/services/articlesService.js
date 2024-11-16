let articles = [
    {
        id: 1,
        title: "Introduction to React",
        content: "React is a JavaScript library for building user interfaces...",
        createdAt: "2023-11-01"
    },
    {
        id: 2,
        title: "Understanding Redux",
        content: "Redux is a predictable state container for JavaScript apps...",
        createdAt: "2023-11-02"
    },
    {
        id: 3,
        title: "Getting Started with Bootstrap",
        content: "Bootstrap is a free and open-source CSS framework...",
        createdAt: "2023-11-03"
    }
];

export const getArticles = () => articles;
export const getArticleById = (id) => articles.find((article) => article.id === id);
export const updateArticle = (updatedArticle) => {
    articles = articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
    );
};
export const addArticle = (newArticle) => {
    newArticle.id = articles.length + 1;
    newArticle.createdAt = new Date().toISOString().split("T")[0]; // Dnešní datum
    articles.push(newArticle);
};
