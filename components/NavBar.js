/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <div className="nav-container">
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand>GateGather</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/event/new">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link>Profile</Nav.Link>
              </Link>
              <Link passHref href="/allEvents">
                <Nav.Link>All Events</Nav.Link>
              </Link>
              <Button className="nav-logout" variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  );
}
