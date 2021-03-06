import React, { Component } from 'react';
import './Articles.css';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: false, modalArticle: ''};
    }

    showModal(title) {
        let clickedArticle;
        this.props.articles.forEach((article) => {
            if (article.title === title) {
                clickedArticle = article;
            }
        })
        this.setState({modalOpen: true, modalArticle: clickedArticle});
    }

    closeModal() {
        this.setState({modalOpen: false});
    }

    render() {
        return (
            this.props.hasArticles &&
            <div className="articles">
                {this.props.view === 'list'
                    ? <ListView articles={this.props.articles} titleClicked={this.showModal.bind(this)} />
                    : <CardView articles={this.props.articles} titleClicked={this.showModal.bind(this)} />
                }
                {this.state.modalOpen &&
                    <Modal closeButtonClicked={this.closeModal.bind(this)}>
                            <div className="modalBox">
                            {this.state.modalArticle.urlToImage
                                ? <img src={this.state.modalArticle.urlToImage} alt="" />
                                : <img src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
                            }
                            <div className="contents">
                                <div className="title">{this.state.modalArticle.title}</div>
                                <div className="author">{this.state.modalArticle.author}</div>
                                <div className="pubDate">{this.state.modalArticle.publishedAt}</div>
                                <div className="description">{this.state.modalArticle.description}</div>
                                <div className="url">{this.state.modalArticle.url}</div>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}

function ListView({articles, titleClicked}) {
    const articleList = articles.map((articles, index) => (
        <div className="articleListBox" key={index}>
            {articles.urlToImage
                ?<img className="listImg" src={articles.urlToImage} alt="" />
                :<img className="listImg" src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />}
            <div className="title" onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
            <div className="author">{articles.author}</div>
            <div className="pubDate">{articles.publishedAt}</div>
            <div className="publisher">{articles.source.name}</div>
        </div>
    ));

    return articleList;
}

function CardView({articles, titleClicked}) {
    const articleList = articles.map((articles, index) => (
        <div className="articleCardBox" key={index}>
            {articles.urlToImage?
                <img src={articles.urlToImage} alt="" />
                : <img src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
            }

            <div className="cardText">
                <div className="title"  onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
                <div className="author">{articles.author}</div>
            </div>
        </div>
    ));

    return (
        <div className="articleCard">
            {articleList}
        </div>
    );
}

class Modal extends Component {

    componentDidMount() {
        document.body.style.overflow = "hidden"
    }

    componentWillUnmount() {
        document.body.style.overflow = "visible"
    }

    render() {
        return (
            <div className="articleModal" onClick={this.props.closeButtonClicked}>
                {this.props.children}
            </div>
        );
    }
}

export default Articles;
