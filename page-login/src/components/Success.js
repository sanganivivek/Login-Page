import * as React from 'react';
import './Success.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';

function Success() {
    const [coins, setCoins] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredCoins, setFilteredCoins] = React.useState([]);

    React.useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('https://606e00260c054f00176564d4.mockapi.io/coins');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCoins(data);
                setFilteredCoins(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCoins();
    }, []);

    const getPriceColor = (price) => {
        if (price > 200) return 'yellow';
        if (price > 100) return 'green';
        if (price < 0) return 'red';
        return 'transparent';
    };

    const getPrizeColor = (price) => {
        if (price < 0) return 'red';
        return 'transparent';
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const filtered = coins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCoins(filtered);
        setPage(0);
    };

    const paginatedCoins = filteredCoins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="table-container">
            <h2>Coin Table</h2>
            <Paper
                component="form"
                sx={{
                    p: '1px 1px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 300,
                    marginBottom: '10px',
                    backgroundColor: 'transparent',
                    border: '1px solid black'
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Current Price</th>
                                <th>Market Cap</th>
                                <th>Market Cap Rank</th>
                                <th>Total Volume</th>
                                <th>24h High</th>
                                <th>24h Low</th>
                                <th>Price Change (24h)</th>
                                <th>Price Change % (24h)</th>
                                <th>Market Cap Change (24h)</th>
                                <th>Market Cap Change % (24h)</th>
                                <th>Circulating Supply</th>
                                <th>Total Supply</th>
                                <th>ATH</th>
                                <th>ATH Change %</th>
                                <th>ATH Date</th>
                                <th>ATL</th>
                                <th>ATL Change %</th>
                                <th>ATL Date</th>
                                <th>Watchlist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCoins.map((coin) => (
                                <tr key={coin.id}>
                                    <td>{coin.id}</td>
                                    <td>{coin.symbol}</td>
                                    <td >{coin.name}</td>
                                    <td>
                                        <img src={coin.image} alt={coin.name} width="30" />
                                    </td>
                                    <td style={{ backgroundColor: getPriceColor(coin.current_price) }}>
                                        {coin.current_price}
                                    </td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.market_cap) }}>{coin.market_cap}</td>
                                    <td>{coin.market_cap_rank}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.total_volume) }}>{coin.total_volume}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.high_24h) }}>{coin.high_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.low_24h) }}>{coin.low_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.price_change_24h) }}>{coin.price_change_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.price_change_percentage_24h) }}>{coin.price_change_percentage_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.market_cap_change_24h) }}>{coin.market_cap_change_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.market_cap_change_percentage_24h) }}>{coin.market_cap_change_percentage_24h}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.circulating_supply) }}>{coin.circulating_supply}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.total_supply) }}>{coin.total_supply}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.ath) }}>{coin.ath}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.ath_change_percentage) }}>{coin.ath_change_percentage}</td>
                                    <td>{new Date(coin.ath_date).toLocaleDateString()}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.atl) }}>{coin.atl}</td>
                                    <td style={{ backgroundColor: getPrizeColor(coin.atl_change_percentage) }}>{coin.atl_change_percentage}</td>
                                    <td>{new Date(coin.atl_date).toLocaleDateString()}</td>
                                    <td>{coin.watchList ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <TablePagination
                        component="div"
                        count={filteredCoins.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </div>
    );
}

export default Success;