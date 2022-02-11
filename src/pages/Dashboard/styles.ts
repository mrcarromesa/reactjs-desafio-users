import { Container as ContainerBootstrap, Form } from 'react-bootstrap';
import { FeedbackProps } from 'react-bootstrap/esm/Feedback';
import styled from 'styled-components';

interface IVerticalSpaceProps {
  size: number;
}

interface IFeedbackProps extends FeedbackProps {
  show: boolean;
}

export const Container = styled(ContainerBootstrap)`
  margin-top: 1rem;

  h2 {
    margin-left: 0;
    margin-bottom: 0.7rem;
  }

  .table-sort {
    th {
      position: relative;
    }
  }
  .container-action-buttons-list {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;

    button {
      border: 0;
      background-color: transparent;

      &:active {
        background-color: #f0f0f0;
        border-radius: 50%;
      }
    }
  }
`;

export const VerticalSpace = styled.div<IVerticalSpaceProps>`
  margin: ${props => props.size}px 0;
`;

export const Feedback = styled(Form.Control.Feedback)<IFeedbackProps>`
  display: ${props => (props.show ? 'block' : 'none')};
`;

export const ContentHeaderList = styled.div`
  display: flex;
  flex: 1;
  h2 {
    flex: 1;
  }
`;

export const ActionsList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  .input-search {
    max-width: 11rem;
    position: relative;
    input {
      border-right: none;
    }

    span {
      border: none;
      background: transparent;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 999;
    }
  }

  button,
  a {
    margin-left: 0.5rem;
  }
`;
