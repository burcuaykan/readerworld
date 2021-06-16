import React, { Component } from "react";
import axios from 'axios';
import './upload-image.css';
import { Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { NavLink } from "react-router-dom";
import { Row, Col } from 'antd';

import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Search } = Input;

const { Header, Sider } = Layout;


const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default class UploadImage extends Component {
    state = {
        loadedPost: [],
        notfound: "",
        addbook: "",
    };
    
   handleUpload = event => {
       const fd = new FormData();
       console.log(event.file);
	   console.log(event.file.name);
	   fd.append('file', event.file.originFileObj, event.file.name);
       axios.post(`http://readerworld.ceng.metu.edu.tr:8080/api/books/upload`,fd, {withCredentials: true, "Content-Type": "multipart/form-data"})
            .then(res => {
                console.log(res);
            });
       console.log(event.file);
   }
   
    bookSelectHandler = (isbn) => {
        this.setState({ selectedPostIsbn: isbn });
    }
    render() {
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPost) {
            book = this.state.loadedPost.map((book, i) => {
                return (
                    <Link to={'/' + book.isbn} key={i}>
                        <div className="book-content" key={i} onClick={() => this.bookSelectHandler(book.isbn)} >
                            <img src={"http://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg?default=false"} alt="" style={{ width: "auto", maxWidth: "50%" }} id="imageBox" />
                            <h1>{book.bookname}</h1>
                            <p>{book.author}</p>

                        </div>
                    </Link>
                );
            });
        }
        else {
            book = (
                <div className="not-found-content" style={{ marginTop: "2rem" }}>
                    <h1 className="not-found-title">{this.state.notfound}</h1>
                    <NavLink id="add-book" style={{ display: "none" }} className="add-book-link" to="/add-book" exact>{this.state.addbook}</NavLink>
                </div>
            )
        }
        return (
            <Layout style={{ minHeight: "600px" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>

                </Header>
                <Layout>
                    <Sider className="site-layout-background d-none d-md-block" width={200} >
                        <NavBarComp />
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px', alignItems: 'center'}}>
                        <Row style={{ textAlign: "center" }}>
                            <Col >
                                <h1 className="upload-image-title"> Find Book by uploading image</h1>
                                <Upload {...props} onChange={this.handleUpload}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Col>
                        </Row>
                        <div className="found-books">
                            {book}
                        </div>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
