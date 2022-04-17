import React, { useState } from 'react'

import Contest from './Contest';
// import Spinner from './spinner';
import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

const Contest_page = (props) => {
    const [articles, setArticles] = useState([]);


    const updateNews = async () => {

        const url = `https://kontests.net/api/v1/${props.category}`;
        let data = await fetch(url);
        const parsedData = await data.json()
        setArticles(parsedData)
    }

    updateNews();

    return (
        <>
            <div>

                <div className="container ">

                    <br />
                    <h1 className='my-5 text-center' style={{ fontSize: '2em', color:"black" }}>Upcoming Contest of {props.name}</h1>

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Contest name={element.name} url={element.url} start_time={element.start_time} end_time={element.end_time} duration={element.duration} site={element.site = '' ? props.name : element.site} status={element.status} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )

}

Contest_page.defaultProps = {

    category: 'all',
    name: 'All'
}

Contest_page.propTypes = {
    category: PropTypes.string,
    name: PropTypes.string
}

export default Contest_page