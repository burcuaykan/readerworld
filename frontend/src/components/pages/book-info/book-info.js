import React from "react";
import Mockingbird from '../../../images/bookcovers-dummy/to kill a mockingbird.svg';
import Gatsby from '../../../images/bookcovers-dummy/the great gatsby.svg';
import TwoCities from '../../../images/bookcovers-dummy/a tale of two cities.svg';
import Misarables from '../../../images/bookcovers-dummy/les misarables.svg';
import Cristo from '../../../images/bookcovers-dummy/monte cristo.svg';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Layout, Menu, Breadcrumb } from 'antd';


const { Header, Content, Sider } = Layout;



const BookInfoPage = () => {
    return (
        
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                <div className="logo" style={{float: "left"}}>
                    <Row>
                        <img src={Mockingbird} style={{paddingLeft: "40px", paddingRight: "40px", paddingBottom: "40px", paddingTop:"15px", width: "30%"}}/>  
                        <Col>
                            <p className= "book-name" >To Kill a Mockingbird</p>
                            
                            <p className= "author-name">Harper Lee</p>
                            <Container className="book-info-container">
                                <p 
                                    className= "book-info"
                                    >The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to read more...
                                </p>

                            </Container>

                        </Col>
                    </Row>

                </div>
                
                </Content>
                
    );
}

export default BookInfoPage;