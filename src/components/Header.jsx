import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Daily Planner</Navbar.Brand>
      </Container>
    </Navbar>
  );
}