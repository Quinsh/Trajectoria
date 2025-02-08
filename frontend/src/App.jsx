import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { ResumeUpload } from './components/ResumeUpload';
import { CareerSuggestions } from './components/CareerSuggestions';
import { ContactList } from './components/ContactList';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysis = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="app-wrapper">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="brand-text">CareerAI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
              <Nav.Link href="#blog" className="nav-link-custom">Blog</Nav.Link>
              <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero-section">
        <div className="gradient-overlay"></div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <h1 className="hero-title">Discover Your Perfect Career Path</h1>
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
            <ResumeUpload onAnalysis={handleAnalysis} />
            {analysisResult && (
              <div className="mt-4 analysis-results">
                <CareerSuggestions analysis={analysisResult.analysis} />
                <ContactList contacts={analysisResult.suggested_contacts} />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <footer className="custom-footer">
        <Container>
          <Row>
            <Col md={4}>
              <h5>CareerAI</h5>
              <p>Empowering your career decisions with AI</p>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <Nav className="flex-column">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#blog">Blog</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Col>
            <Col md={4}>
              <h5>Contact</h5>
              <p>info@careerai.com</p>
              <p>1-800-CAREER-AI</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;