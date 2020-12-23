import React from "react";
import Mockingbird from '../../../images/bookcovers-dummy/to kill a mockingbird.svg';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Layout, Menu, Breadcrumb } from 'antd';
import NavBar from '../../navigation-bar/navigation-bar.js'
import './book-info.css'


const {Content} = Layout;


export default class BookInfoContent extends React.Component {

    render() {
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
        )
    }

}