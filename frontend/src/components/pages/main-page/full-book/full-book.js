import React, { Component } from 'react';
import axios from 'axios';

import { Layout } from 'antd';
import MainLogo from '../../../../images/mainpage-logo.svg';
import { Input } from 'antd';
import NavBarComp from "../../../navigation-bar/navigation-bar.js";
import './full-book.css';
import { Tooltip } from 'antd';
import moment from 'moment';
import { Rate } from 'antd';
import Aleyna from '../../../../images/footer-images/aleyna.png';
import Burcu from '../../../../images/footer-images/burcu.png';
import { Comment, Avatar, Form, Button, List } from 'antd';
import Khaleesi from '../../../../images/khaleesi.png';
import { Row, Col } from 'react-bootstrap';

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

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Burcu Aykan',
        avatar: Burcu,
        content: (
            <p>
                This is great book, and you need to read it.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Aleyna Bozkurt',
        avatar: Aleyna,
        content: (
            <p>
                It’s incredibly rare that I come across a book that ticks all my boxes. Good characters. Great setting. Wonderful story.
                This book really lived up to the hype!
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

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
            // userObject,
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
        document.getElementById("add-to-readlist").value="Added to readlist"; 
        document.getElementById("add-to-readlist").disabled=true;
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Khaleesi',
                        avatar: Khaleesi,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
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
        console.log(this.props);
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
                                    // header={`${data.length} replies`}
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                actions={item.actions}
                                                author={item.author}
                                                avatar={item.avatar}
                                                content={item.content}
                                                datetime={item.datetime}
                                            />
                                        </li>
                                    )}
                                />
                            </div>
                            <>
                                {comments.length > 0 && <CommentList comments={comments} />}
                                <Comment
                                    avatar={
                                        <Avatar
                                            src={Khaleesi}
                                            alt="Daenerys Targaryen"
                                        />
                                    }
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