import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ImageCarousel from './ImageCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { addCountriesData, clearData } from '../utils/countriesSlice';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import OnScreenLoader from './OnScreenLoader';
import image1 from "../hamburger.png";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [coutriesData, setCountriesData] = useState([]);
    const [loadMoreClickCount, setLoadMoreClickCount] = useState(1);
    const storeData = useSelector((state) => state?.countries);
    const [countriesStoreData, setCountriesStoreData] = useState([]);
    const [showLoadMoreOption, setShowLoadMoreOption] = useState(true);
    const [openHamburger, setOpenHamburger] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [showLoadMoreOption]);

    const handleLoadMoreClick = () => {
        const indexOfLastCard = 12 * loadMoreClickCount;
        if(storeData && (indexOfLastCard > storeData?.countries[0]?.length)) {
            setShowLoadMoreOption(false);
        }
        else {
            setLoadMoreClickCount(loadMoreClickCount + 1);
        }
    }

    const hamburgerClick = () => {
        setOpenHamburger(!openHamburger);
    }

    useEffect(() => {
        const indexOfLastCard = 12 * loadMoreClickCount;
        if(storeData && (indexOfLastCard > storeData?.countries[0]?.length)) {
            setCountriesData(storeData?.countries[0].slice(0, storeData?.countries[0].length));
        }
        else {
            storeData && setCountriesData(storeData?.countries[0]?.slice(0, indexOfLastCard));
        }

    }, [loadMoreClickCount])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        openHamburger && setOpenHamburger(false);
    };
    
    async function fetchData() {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        dispatch(addCountriesData(data));
        setCountriesStoreData(data);
        setCountriesData(data?.slice(0,12));
    }
    
    useEffect(() => {
        if (activeTab !== 'All') {
            const filteredData = countriesStoreData?.filter((item) => item.region === activeTab); 
            dispatch(clearData());
            dispatch(addCountriesData(filteredData));
            setCountriesData(filteredData?.slice(0, 12));
            setLoadMoreClickCount(1);
            setShowLoadMoreOption(true);
        }
        else {
            fetchData();
        }
    }, [activeTab]);

    return (
        <div>
        {isLoading ?
            (<OnScreenLoader />) : (
        <div className='mx-3'>
            {/* Navbar */}
            <div className='d-flex justify-content-between align-items-center p-3 navBar'>
                <div className='fs-2'>Countries</div>
                <div className='gap-3 optionsGroup'>
                    <button
                        className={`tab-button ${activeTab === 'All' ? 'active' : ''}`}
                        onClick={() => handleTabClick('All')}
                    >
                        All
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'Asia' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Asia')}
                    >
                        Asia
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'Europe' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Europe')}
                        style={{ width: '70px' }}
                    >
                        Europe
                    </button>
                </div>
                {/* hamburger functionality */}
                <div className='hamburgerPng'>
                    <img src={image1} onClick={hamburgerClick}/>
                </div> 
            </div>

            {/* Welcome Text */}

            <div className="d-flex mt-3 gap-2 welcome-text">
                <hr className="topLine" />
                <h2 className="text-center mt-2 mb-2">WELCOME</h2>
                <hr className="bottomLine" />
            </div>

            <ImageCarousel />

            {/* Country Cards */}

            <div className="container">
                {coutriesData && coutriesData?.map((item, index) => (
                    <div className="card d-flex flex-row" key={index}>
                        <div className="flag-placeholder">
                            <img src={item?.flags?.png} alt="flag" className='flagImg' />
                        </div>
                        <div className="card-content">
                            <div className="country">{item?.name?.common}</div>
                            <div className="content">{item?.region}</div>
                        </div>
                    </div>
                ))}
            </div>
            {coutriesData && showLoadMoreOption && <div className='d-flex justify-content-center'><Button className='rounded-0' style={{ width:"146px", height:"48px", backgroundColor:"#3C3C3C", border:"none"}} onClick={handleLoadMoreClick}>
                Load more
            </Button></div>}

            {/* Footer */}

            <div className='d-flex justify-content-center mt-5 flex-column align-items-center' style={{fontWeight: "600"}}>
                <div className="mt-2 d-flex justify-content-evenly"> {/* Added margin top for spacing */}
                    <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-google"></i></Button> {/* Example: Google */}
                    <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-facebook"></i></Button> {/* Example: Facebook */}
                    <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-linkedin"></i></Button> {/* Example: LinkedIn */}
                    <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-twitter"></i></Button> {/* Example: Twitter */}
                </div>
                <p className='mt-3 copyRight'>Example@email.com </p>
                <p className='mb-5 copyRight'>Copyright © 2020 Dinesh Reddy. All rights reserved.</p>
            </div>
            {openHamburger && <div className='dropDown'>
                <div onClick={() => handleTabClick('All')}>All</div>
                <div onClick={() => handleTabClick('Asia')}>Asia</div>
                <div onClick={() => handleTabClick('Europe')}>Europe</div>
            </div>}
        </div>
    )}
    </div>
    )
}

export default HomePage;