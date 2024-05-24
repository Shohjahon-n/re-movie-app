import Search from '../../components/Search/Search';
import Cardlist from '../../components/Cardlist/Cardlist';
import Trending from '../../components/Trending/Trending';
import { useState, useEffect } from 'react';

export default function Home({ data, setPatchData }) {
    const [value, setValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(data.filter(item => !item.isTrending));
    }, [data]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value === '') {
            setFilteredData(data.filter(item => !item.isTrending));
            setValue('');
        } else {
            setValue(e.target.value);
            const filter = data.filter((item) =>
                item.title.toLowerCase().startsWith(e.target.value.toLowerCase()) && !item.isTrending
            );
            setFilteredData(filter);
        }
    };

    return (
        <div className='layout'>
            <div className="center_content container">
                <Search handleSearch={handleSearch} value={value} />
                <Trending data={data.filter(item => item.isTrending)} />
                <Cardlist data={filteredData} setPatchData={setPatchData} />
            </div>
        </div>
    );
}
