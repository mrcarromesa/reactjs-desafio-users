import React from 'react';
import { Container } from 'react-bootstrap';

import Footer from '~/components/Footer';
import Header from '~/components/Header';

interface RouteComponentProps {
  component: React.ComponentType;
}

const RouteComponent: React.FC<RouteComponentProps> = ({
  component: Component,
  ...rest
}) => (
  <Container fluid className="main-container">
    <Header />
    <Component {...rest} />
    <Footer />
  </Container>
);

export default RouteComponent;
