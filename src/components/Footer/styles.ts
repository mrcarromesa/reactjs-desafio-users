import { Container as ContainerBootstrap } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled(ContainerBootstrap)`
  margin-top: 1rem;
  padding: 1rem;
  * {
    text-align: center;
  }

  address {
    color: #0f0f0f;
  }
`;
