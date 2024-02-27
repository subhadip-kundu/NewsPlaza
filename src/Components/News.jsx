import React, { Component } from "react";
import NewsItem from "./NewsItem.jsx";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string.isRequired,
        setProgress: PropTypes.func.isRequired,
    };

    state = {
        articles: [],
        page: 1,
        loading: true,
        totalResults: 0,
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    componentDidMount() {
        this.updateNews();
    }

    updateNews = async () => {
        this.props.setProgress(15);
        const { country, category, apiKey, pageSize } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            this.setState((prevState) => ({
                articles: [...prevState.articles, ...data.articles],
                totalResults: data.totalResults,
                loading: false,
            }));

            this.props.setProgress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    };

    fetchMoreData = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
            this.updateNews();
        });
    };

    render() {
        const { articles, loading, totalResults } = this.state;
        const { category } = this.props;

        return (
            <div className="container my-3">
                <h2 className="text-center">
                    NewsHunt - Top {this.capitalizeFirstLetter(category)} headlines
                </h2>

                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((article, index) => (
                                <div className="col-md-4" key={index}>
                                    <NewsItem
                                        title={article.title ? article.title.slice(0, 45) : " "}
                                        description={
                                            article.description
                                                ? article.description.slice(0, 95)
                                                : " "
                                        }
                                        imageUrl={article.urlToImage}
                                        newsUrl={article.url}
                                        author={article.author}
                                        date={article.publishedAt}
                                        source={article.source.name}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;