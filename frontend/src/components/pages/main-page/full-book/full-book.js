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
import { Row, Col } from 'react-bootstrap';
import Rates from '../../../rate/rate';
import { DatePicker, Space } from 'antd';



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
        rateTotal: null,
        votes: [],
        done: true,
        buttonLabel: "Add to readlist",
        loadedUser: null,
        deadline: null

    };
    onClick = (date, dateString) => {
        axios.post('http://localhost:8080/api/books/readlist',
            {
                isbn: this.state.loadedPost.isbn,
                deadline: this.state.deadline
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

    onChangeDate = (date, dateString) => {
        this.setState({
            deadline: date
        })
      }

    changeText = (buttonLabel) => {
        this.setState({ buttonLabel }); 
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

    handleSubmitRate = (rateCurrent) => {
        this.setState({
            rateCurrent,
        });
        axios.post('http://localhost:8080/api/books/vote',
            {
                isbn: this.state.loadedPost.isbn,
                vote: rateCurrent
            },
            {
                withCredentials: true
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
                
                axios.get('http://localhost:8080/api/books/vote?isbn=' + this.props.match.params.isbn,
                {
                    withCredentials: true
                })
                .then(response => {
                    //console.log(response);
                    this.setState({ votes: response.data });
                    console.log(this.state.votes)
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
                axios.get(`http://localhost:8080/api/users/`,
                {
                    withCredentials: true
                })
                .then(response => {
                    console.log(response);
                    if(response.data){
                        this.setState({ loadedUser: response.data });
                    }
                    else{
                        this.setState({ notfound: "User is not found :(" });
                    }
                })
                .catch(err => {
                    this.setState({
                        error: err
                    });
                });
            }
        } 
    }   

    render() {
        const { comments, submitting, value, buttonLabel, } = this.state;
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.props.isbn) {
            book = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            book = (
                <div className="FullBook">
                    <img src={"http://covers.openlibrary.org/b/isbn/" + this.state.loadedPost.isbn + "-L.jpg?default=false"} alt="" style={{ height: "550px" }} id="imageBox" />
                    <p textAlign="center" className="full-book-name">{this.state.loadedPost.bookname}</p>
                    <p className="full-author-name">{this.state.loadedPost.author}</p>
                    <p className="full-ISBN">ISBN: {this.state.loadedPost.isbn}</p>

                </div>

            );
        }
        
        let rateTotaldummy = 0.0;
        let ratedummy = <p>{rateTotaldummy}</p>;
        if (this.state.votes.length!=0) {
            this.state.votes.forEach((vote) => {
                rateTotaldummy = rateTotaldummy + vote.vote;
              })
            
              rateTotaldummy = rateTotaldummy / this.state.votes.length;
            
            ratedummy = <p>{rateTotaldummy}</p>;
        }
        let usersRating = 0;
        if(this.state.votes.length!=0 && this.state.loadedUser){
            this.state.votes.forEach((vote) => {
                if(vote.voter==this.state.loadedUser.email){
                    usersRating = vote.vote;
                }
              })
        }
        
        return (
           
            <Layout style={{ height: "1024px" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                    <div className="search-bar">
                        <Search className="search-bar-input" placeholder="Search..." onSearch={onSearch} style={{ width: 200 }} />
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
                           
                                    <div>
                                        {book}
                                    </div>
                                    
                                    <Row>
                                        <Row className="rating-content-rate">
                                            <p className="rate-header-rate-header" justify="center">Rate: </p>
                                            <p className="rate-header-rate">{ratedummy}</p>
                                        </Row>
                                        
                                        <div className="rating-content">
                                            <p className="rate-header">Rate this book :</p>
                                            <Rate 
                                                value={usersRating}
                                                onChange={this.handleSubmitRate}
                                            />
                                        </div>
                                        
                                        <div className="rating-content">
                                            <p className="rate-header">Select a deadline and add to readlist:</p>
                                            <Space direction="vertical">
                                                <DatePicker onChange={this.onChangeDate} />
                                            </Space>,
                                            <Button className="add-to-readlist-button" value="Add to readlist" id="add-to-readlist" onClick={ () => {
                                                this.onClick(); this.changeText("Added to readlist")}
                                                }>
                                                    {buttonLabel}
                                            </Button>
                                        </div>
                                        

                                    </Row>

                                <div >
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
