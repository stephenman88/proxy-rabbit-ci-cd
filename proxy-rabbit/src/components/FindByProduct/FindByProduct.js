import "./FindByProduct.scss"
import { useState, useEffect } from "react"
import ProductSlide from "../ProductSlide/ProductSlide"
import axios from "axios";

const baseUrl = window.__ENV__?.REACT_APP_BASE_URL;

function FindByProduct({onProductCardClicked}){

    const [searchInput, setSearchInput] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [discoverProducts, setDiscoverProducts] = useState([]);

    useEffect(()=>{
        (async ()=>{
            try{
                const response = await axios.get(`${baseUrl}/api/products`)
                setSearchedProducts(response.data);
            }catch(error){
                console.log(error)
            }
        })();
        (async ()=>{
            try{
                const response = await axios.get(`${baseUrl}/api/products/popular`)
                setPopularProducts(response.data);
            }catch(error){
                console.log(error)
            }
        })();
        (async ()=>{
            try{
                const response = await axios.get(`${baseUrl}/api/products/discover`)
                setDiscoverProducts(response.data);
            }catch(error){
                console.log(error)
            }
        })();
        
    }, [])

    const onSearchChange = (e) => {
        setSearchInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        (async ()=>{
            try{
                const response = await axios.get(`${baseUrl}/api/products/search/${e.target.search.value}`)
                setSearchedProducts(response.data);
            }catch(error){
                console.log(error)
            }
        })()
    }

    //2 cards on mobile, 3 on tablet
    return (<main className="findbyproduct main">
        <section className="findbyproduct-find">
            <div className="findbyproduct-find-head">
                <hr className="findbyproduct-find-head__line--top" />
                <div className="findbyproduct-find-head-content">
                    <h1 className="findbyproduct-find-head__title">Find a Specialty</h1>
                    <form className="findbyproduct-find-head-search" onSubmit={onSubmit}>
                        <input className="findbyproduct-find-head-search__input" name="search" placeholder="Search" onChange={onSearchChange} value={searchInput}></input>
                        <button className="findbyproduct-find-head-search__button" type="submit" >Go!</button>
                    </form>
                </div>
                <hr className="findbyproduct-find-head__line--bottom" />
            </div>
            <div className="findbyproduct-find-body">
                <ProductSlide productArray={searchedProducts} onProductCardClicked={onProductCardClicked}/>
            </div>
        </section>
        <section className="findbyproduct-popular">
            <div className="findbyproduct-popular-head">
                <hr className="findbyproduct-popular-head__line--top" />
                <div className="findbyproduct-popular-head-content">
                    <h2 className="findbyproduct-popular-head__title">Most Popular</h2>
                </div>
                <hr className="findbyproduct-popular-head__line--bottom" />
            </div>
            <div className="findbyproduct-popular-body">
                <ProductSlide productArray={popularProducts} onProductCardClicked={onProductCardClicked}/>
            </div>
        </section>
        <section className="findbyproduct-discovery">
            <div className="findbyproduct-discovery-head">
                <hr className="findbyproduct-discovery-head__line--top" />
                <div className="findbyproduct-discovery-head-content">
                    <h2 className="findbyproduct-discovery-head__title">Discover These Specialties</h2>
                </div>
                <hr className="findbyproduct-discovery-head__line--bottom" />
            </div>
            <div className="findbyproduct-discovery-body">
                <ProductSlide productArray={discoverProducts} onProductCardClicked={onProductCardClicked}/>
            </div>
        </section>
    </main>)
}

export default FindByProduct;