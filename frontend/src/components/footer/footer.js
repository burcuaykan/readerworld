import React from 'react';
import './footer.css';
import { Layout, Row, Col } from "antd";
import Aleyna from '../../images/footer-images/aleyna.png';
import Burcu from '../../images/footer-images/burcu.png';
import Onur from '../../images/footer-images/onur.png';
import Kaan from '../../images/footer-images/kaan.png';
const { Footer } = Layout;


export default class Footercomp extends React.Component {

    render() {
        return (
            <Footer>
                <div className="footer-container m-auto p-4 pt-md-5 pr-md-0">
                    <h1 style={{ textAlign: 'center', color: '#FFFFFF' }}>About us</h1>
                    <p className="footer-info-text"> Hey there! This is our graduation project.</p>
                    <Row>
                        <Col className="px-1" span={6}>
                            <img src={Aleyna} alt="" className="footer-image" />
                            <p className="footer-name"> ALEYNA BOZKURT</p>
                            <p className="footer-text">
                                Senior year Computer Engineering student at Middle East Technical University. Front-end developer of the ReaderWorld.
                            </p>
                        </Col>
                        <Col className="px-1" span={6}>
                            <img src={Burcu} alt="" className="footer-image" />
                            <p className="footer-name"> BURCU AYKAN </p>
                            <p className="footer-text">
                                Senior year Computer Engineering student at Middle East Technical University. UI/UX designer of the ReaderWorld.
                            </p>
                        </Col>
                        <Col className="px-1" span={6}>
                            <img src={Kaan} alt="" className="footer-image" />
                            <p className="footer-name"> KAAN APAN</p>
                            <p className="footer-text">
                                Senior year Computer Engineering student at Middle East Technical University. Back-end developer of the ReaderWorld.
                            </p>
                        </Col>
                        <Col className="px-1" span={6}>
                            <img src={Onur} alt="" className="footer-image" />
                            <p className="footer-name"> ONUR GÖKCE</p>
                            <p className="footer-text">
                                Senior year Computer Engineering student at Middle East Technical University. Database manager of the ReaderWorld.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Footer>

        )
    }

}