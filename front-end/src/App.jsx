import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from "./components/Login/Login";
import SignUp from './components/SignUp/SignUp';
import Layout from './Layout/Layout';
import Movie from './pages/movie/movies';
import TV from './pages/tv/tv';
import Liked from './pages/liked/liked';
import Home from './pages/home/home';
import PrivateRoute from './router/PrivateRoute';
import ErrorPage from './components/ErrorPage/ErrorPage';
import axios from 'axios';

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:1111/data');
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleBookmarkChange = (id, isBookmarked) => {
        setData(data.map(item => item.id === id ? { ...item, isBookmarked } : item));
    };

    return (
        <div className="main-center">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/" element={<Layout loading={loading} />}>
                        <Route path="/home" element={<PrivateRoute />}>
                            <Route index element={<Home data={data} setPatchData={handleBookmarkChange} />} />
                        </Route>
                        <Route path="/movie" element={<Movie data={data} setPatchData={handleBookmarkChange} />} />
                        <Route path="/tv" element={<TV data={data} setPatchData={handleBookmarkChange} />} />
                        <Route path="/liked" element={<Liked data={data} setPatchData={handleBookmarkChange} />} />
                    </Route>
                    <Route path="/login" element={<Login form={form} />} />
                    <Route path="/signup" element={<SignUp setForm={setForm} />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    );
}
