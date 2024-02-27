import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
    return (
        <div className='my-3'>
            <div className="card" style={{ minHeight: "500px" }}>
                <div style={{ display: 'flex', justifyContent: 'flexEnd', position: 'absolute', right: 0 }}>
                    <span className='badge rounded-pill bg-danger'>{source}</span>
                </div>
                <img src={imageUrl || 'https://cdn.ndtv.com/common/images/ogndtv.png'} className="card-img-top" alt="News" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {author || 'Unknown'} on {new Date(date).toLocaleString()}
                        </small>
                    </p>
                    <a href={newsUrl} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;