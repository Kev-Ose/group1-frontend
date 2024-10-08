import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import getText from '../../utils/getText';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

import './Posts.css';
import SERVER_URL from '../../server';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cat = useLocation().search;
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(null);
    const pageSize = 8;
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    const paginatedPosts = searchResults.slice(firstIndex, lastIndex);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(SERVER_URL + `api/posts${cat}`);
                setPosts(res.data);
                setNumberOfPages(Math.ceil(res.data.length / pageSize));
            } catch (err) {
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [cat]);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.content.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        } else {
            return;
        }
    };

    const nextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        } else {
            return;
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    return (
        <>
            <div className="home-posts">
                {loading && <Loading />}
                {error && (
                    <div className="error-message">
                        <h3>{error}</h3>
                    </div>
                )}
                {!error && !loading && paginatedPosts && (
                    <>
                        <form
                            className="searchForm container"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* <label htmlFor="search">Search Posts</label> */}
                            <input
                                id="search"
                                type="text"
                                placeholder="Search Posts"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        <div className="container posts">
                            {paginatedPosts.map((post) => (
                                <div className="one_post" key={post.id}>
                                    <div className="one-post_img">
                                        <img src={post.img} alt={post.title} />
                                    </div>
                                    <div className="one-post_content">
                                        <Link
                                            className="link"
                                            to={`/post/${post.id}`}
                                        >
                                            <h1>
                                                {post.title.length <= 25
                                                    ? post.title
                                                    : `${post.title.slice(0, 20)}. . . .`}
                                            </h1>
                                        </Link>
                                        <p>
                                            {getText(
                                                post.content.length <= 500
                                                    ? post.content
                                                    : `${post.content.slice(0, 500)} . . . . .`
                                            )}
                                        </p>
                                        
                                            <Link
                                                className="link-read-more"
                                                to={`/post/${post.id}`}
                                            >
                                                Read More
                                            </Link>{' '}
                                        
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            {posts.length > 8 ? (
                                <Pagination className="pagination" size="lg">
                                    <Pagination.First
                                        onClick={() => changeCPage(1)}
                                    />
                                    <Pagination.Prev on onClick={prePage} />

                                    {[...Array(numberOfPages).keys()].map(
                                        (n, i) => (
                                            <li key={i}>
                                                <Pagination.Item
                                                    onClick={() =>
                                                        changeCPage(i + 1)
                                                    }
                                                >
                                                    {i + 1}
                                                </Pagination.Item>
                                            </li>
                                        )
                                    )}

                                    <Pagination.Next onClick={nextPage} />
                                    <Pagination.Last
                                        onClick={() =>
                                            changeCPage(numberOfPages)
                                        }
                                    />
                                </Pagination>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Posts;
