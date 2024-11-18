import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ArticlesPage from './components/ArticlesPage';
import ArticleDetail from './components/ArticleDetail';
import EditArticle from './components/EditArticle';
import Header from './components/Header';
import Footer from './components/Footer';
import articlesData from './data/articles.json';
import AdminRoute from "./components/AdminRoute";
import ProfilePage from './components/ProfilePage';
import Login from "./components/Login";

function App() {
  const [articles, setArticles] = useState(articlesData);

  const updateArticle = (updatedArticle) => {
    setArticles((prevArticles) =>
        prevArticles.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article
        )
    );
  };

  return (
      <Router>
        <Header />
        <div className="container mt-4" id={"body-id"}>
          <Routes>
            <Route
                path="/"
                element={<ArticlesPage articles={articles} />}
            />
            <Route
                path="/article/:id"
                element={<ArticleDetail articles={articles} />}
            />
            <Route
                path="/article/edit/:id"
                element={<EditArticle articles={articles} onUpdate={updateArticle} />}
            />
            <Route path="/dashboard" element={<AdminRoute> <Dashboard /> </AdminRoute>} />
            <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
  );
}

export default App;
