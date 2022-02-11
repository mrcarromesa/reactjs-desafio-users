import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { Container } from './styles';

const Footer: React.FC = () => (
  <Container>
    <Row>
      <Col>
        <address>@mrcarromesa</address>
      </Col>
    </Row>
  </Container>
);

export default Footer;
