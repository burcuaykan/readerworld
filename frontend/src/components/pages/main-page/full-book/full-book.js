import React, { Component } from 'react';
import axios from 'axios';

import { Layout } from 'antd';
import MainLogo from '../../../../images/mainpage-logo.svg';
import { Input } from 'antd';
import NavBarComp from "../../../navigation-bar/navigation-bar.js";
import './full-book.css';
import moment from 'moment';
import { Rate } from 'antd';
// import Aleyna from '../../../../images/footer-images/aleyna.png';
// import Burcu from '../../../../images/footer-images/burcu.png';
import { Comment, Form, Button, List } from 'antd';
import { Row } from 'react-bootstrap';

const { Search } = Input;
const { Header, Content, Sider } = Layout;


const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </>
);


const onSearch = value => console.log(value);

class FullBook extends Component {
    state = {
        loadedPost: null,
        comments: [],
        submitting: false,
        value: '',
        rateCurrent: null,
        rateTotal: 4.3,
    };
    onClick = () => {
        axios.post('http://localhost:8080/api/books/readlist',
            {
                isbn: this.state.loadedPost.isbn,
            },
            {

                withCredentials: true
            })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error)
            });
        document.getElementById("add-to-readlist").value = "Added to readlist";
        document.getElementById("add-to-readlist").disabled = true;
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }
        axios.post('http://localhost:8080/api/books/comment',
            {
                isbn: this.state.loadedPost.isbn,
                commentBody: this.state.value
            },
            {

                withCredentials: true
            })
            .then((response) => {
                this.setState({
                    submitting: true,
                });
                console.log(response);
            }).catch((error) => {
                console.log(error)
            });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                // comments: [
                //     {   
                //         commentAuthor: "hello",
                //         commentBody: <p>{this.state.value}</p>,
                //         CommentTime: "moment().fromNow()",
                //     },
                //     ...this.state.comments,
                // ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleChangeRate = rateCurrent => {
        this.setState({
            rateCurrent,
        });
        
    };
    
    componentDidMount() {
        //console.log(this.props);
        if (this.props.match.params.isbn) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.isbn !== this.props.isbn)) {
                axios.get(`http://localhost:8080/api/books/?isbn=` + this.props.match.params.isbn,
                    {
                        withCredentials: true
                    })
                    .then(response => {
                        // console.log(response);
                        this.setState({ loadedPost: response.data });
                    });

                axios.get('http://localhost:8080/api/books/comment?isbn=' + this.props.match.params.isbn,
                    {
                        withCredentials: true
                    })
                    .then(response => {
                        //console.log(response);
                        this.setState({ comments: response.data });
                        console.log(this.state.comments)
                    });
                // axios.all([
                //     axios.get(`http://localhost:8080/api/books/?isbn=` + this.props.match.params.isbn),
                //     axios.get('http://localhost:8080/api/books/comment?isbn=' + this.props.match.params.isbn)
                // ])
                //     .then(axios.spread((data1, data2) => {
                //         //this will be executed only when all requests are complete
                //         console.log('Date created: ', data1.data);
                //         console.log('Date created: ', data2.data);
                //         this.setState({ loadedPost: data1.data });
                //         this.setState({ comments: data2.data });
                //     }));
            }
        }
    }

    render() {
        const { comments, submitting, value } = this.state;
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.props.isbn) {
            book = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            book = (
                <div className="FullBook">
                    <img src={"http://covers.openlibrary.org/b/isbn/" + this.state.loadedPost.isbn + "-L.jpg?default=false"} alt="" style={{ width: "20%" }} id="imageBox" />
                    <h1>{this.state.loadedPost.bookname}</h1>
                    <p>{this.state.loadedPost.author}</p>
                    <p>{this.state.loadedPost.isbn}</p>
                </div>

            );
        }
        return (
            <Layout style={{ height: "auto" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                    <div className="search-bar">
                        <Search className="search-bar-input" placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                </Header>
                <Layout>
                    <Sider className="site-layout-background" width={200} >
                        <NavBarComp />
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {book}
                            
                            <Row  >
                                <Row className="rating-content-rate">
                                    <p className="rate-header-rate-header" justify="center">Rate: </p>
                                    <p className="rate-header-rate">{this.state.rateTotal}</p>
                                </Row>
                                <Row className="rating-content-rate">
                                    <p className="rate-header-rate-header" justify="center">Your rate: </p>
                                    <p className="rate-header-rate">{this.state.rateCurrent}</p>
                                </Row>
                                <div className="rating-content">
                                    <p className="rate-header">Rate this book :</p>
                                    <Rate 
                                        
                                        onChange={this.handleChangeRate}
                                    />
                                </div>
                                
                                <input type="button" className="add-to-readlist-button" value="Add to readlist" id="add-to-readlist" onClick={this.onClick}></input>
                                
                                
                            </Row>
                            <div>
                                <List
                                    className="comment-list"
                                    itemLayout="horizontal"
                                    dataSource={this.state.comments}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                author={item.commentAuthor}
                                                // avatar={item.avatar}
                                                content={item.commentBody}
                                                datetime={item.commentTime}
                                            />
                                        </li>
                                    )}
                                />
                            </div>
                            <>
                                <Comment
                                    content={
                                        <Editor
                                            onChange={this.handleChange}
                                            onSubmit={this.handleSubmit}
                                            submitting={submitting}
                                            value={value}
                                        />
                                    }
                                />
                            </>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default FullBook;