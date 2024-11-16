import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle } from '../services/articlesService';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = getArticleById(parseInt(id));

    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    const handleSave = () => {
        const updatedArticle = { ...article, title, content };
        updateArticle(updatedArticle); // Aktualizace článku
        alert('Article updated successfully!');
        navigate('/'); // Přesměrování na přehled článků
    };

    const CloseEdit = () => {
        navigate('/'); // Přesměrování na přehled článků
    };

    return (
        <div>
            <h2>Edit Article</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={CloseEdit}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default EditArticle;
