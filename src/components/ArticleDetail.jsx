import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../services/articlesService';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = getArticleById(parseInt(id));

    if (!article) {
        return <p>Article not found.</p>;
    }

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                Back to Articles
            </button>
        </div>
    );
};

export default ArticleDetail;
