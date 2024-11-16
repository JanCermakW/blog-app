import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddArticleModal from './AddArticleModal';
import { getArticles, addArticle } from '../services/articlesService';

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("title-asc");
    const role = localStorage.getItem('role');
    const [currentPage, setCurrentPage] = useState(1); // Aktuální stránka
    const itemsPerPage = 6; // Počet uživatelů na stránku

    const handleDeleteArticle = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            const updatedArticles = articles.filter((article) => article.id !== id);
            setArticles(updatedArticles);
        }
    };


    useEffect(() => {
        setArticles(getArticles());
    }, []);

    const handleAddArticle = (newArticle) => {
        addArticle(newArticle);
        setArticles(getArticles());
    };

    const filteredAndSortedArticles = articles
        .filter((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "title-asc") {
                return a.title.localeCompare(b.title);
            }
            if (sortOption === "title-desc") {
                return b.title.localeCompare(a.title);
            }
            if (sortOption === "date-asc") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            if (sortOption === "date-desc") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage; // Poslední uživatel na stránce
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // První uživatel na stránce
    const currentArticles = filteredAndSortedArticles.slice(indexOfFirstItem, indexOfLastItem); // Data pro aktuální stránku

    const totalPages = Math.ceil(filteredAndSortedArticles.length / itemsPerPage); // Počet stránek

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const Pagination = ({ totalPages, currentPage, onPageChange }) => {
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1); // Generování čísel stránek

        return (
            <nav>
                <ul className="pagination">
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={`page-item ${page === currentPage ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return (
        <div>
            <h2>Articles</h2>
            {['Administrator', 'Editor'].includes(localStorage.getItem('role')) && (
                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowAddModal(true)}
                >
                    Add New Article
                </button>
            )}
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control me-3"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="date-asc">Date (Oldest first)</option>
                    <option value="date-desc">Date (Newest first)</option>
                </select>
            </div>
            <div className="row">
                {currentArticles.map((article, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.content.slice(0, 100)}...</p>
                                <button className="btn btn-secondary">
                                    <Link
                                        to={`/article/${article.id}`}
                                        className="text-white text-decoration-none"
                                    >
                                        Read More
                                    </Link>
                                </button>
                                {(role === 'Editor' || role === 'Administrator') && (
                                    <button className="btn btn-warning ms-2">
                                        <Link to={`/article/edit/${article.id}`}
                                              className="text-white text-decoration-none">
                                            Edit
                                        </Link>
                                    </button>
                                )}
                                {role === 'Administrator' && (
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDeleteArticle(article.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <AddArticleModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddArticle}
            />
        </div>
    );
};

export default ArticlesPage;
