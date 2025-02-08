import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { ResumeUpload } from './components/ResumeUpload';
import { CareerSuggestions } from './components/CareerSuggestions'
import { ContactList } from './components/ContactList';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysis = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="app-wrapper">
      <div className="background-animation">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="brand-text">TrajectorAI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero-section">
        <div className="gradient-overlay"></div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <h1 className="hero-title">Discover Your Perfect Career Path and Mentor</h1>
              <p className="hero-subtitle">
                Upload your resume and let AI guide you to your ideal career opportunities
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="main-content">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {!analysisResult && <ResumeUpload onAnalysis={handleAnalysis} />}
          </Col>
        </Row>
      </Container>

      {/* Analysis Data */}
      <Container className="main-content">
        <Row className="justify-content-center">
          <Col md={10} lg={12}>
            {analysisResult && (
              <div className="mt-4 analysis-results">
                <CareerSuggestions analysis={analysisResult} />
                <ContactList analysis={analysisResult} />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <footer className="custom-footer">
        <Container>
          <Row>
            <Col md={4}>
              <h5>TrajectorAI</h5>
              <p>Empowering your career decisions with AI</p>
            </Col>
            <Col md={4}>
              <h5>About Us</h5>
              <Nav className="flex-column">
                <p>
                  CS Freshman & Sophomores in Grinnell College.
                </p>
                <p>
                  Project submitted to 2025 TartanHacks (CMU Hacks).
                </p>
              </Nav>
            </Col>
            <Col md={4}>
              <h5>Contact</h5>
              <p>
                Gun Woo Kim (Frontend) closhuh@gmail.com <br />
                Harrizon Zhu (Backend) zhuyiyun060209@gmail.com <br />
                Adarsh Sharma (Backend) adarsharma.me@gmail.com
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;