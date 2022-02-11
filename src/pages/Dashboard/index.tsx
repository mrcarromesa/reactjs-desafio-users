import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { differenceInYears, format } from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { Field, FieldProps, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineSearch,
} from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import MaskedInput from 'react-maskedinput';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { modalConfirmation } from '~/components/Modals/ModalConfirmation';
import { compare } from '~/utils/compareSort';
import { removeDiacritics } from '~/utils/removeDiacritics';

import {
  ActionsList,
  Container,
  ContentHeaderList,
  Feedback,
  VerticalSpace,
} from './styles';

registerLocale('pt-BR', ptBrLocale);
setDefaultLocale('pt-BR');

const schema = Yup.object().shape({
  firstName: Yup.string().required('Nome é obrigatório'),
  lastName: Yup.string().required('Sobrenome é obrigatório'),
  height: Yup.number()
    .typeError(
      'Informe um número válido, utilize . (ponto) para separar casa decimal',
    )
    .required('Altura é obrigatória'),
  birthDate: Yup.date()
    .typeError('Informe uma data válida no formato dd/mm/aaaa')
    .required('Data de nascimento é obrigatória'),
});

interface IUserPropsSubmit {
  firstName: string;
  lastName: string;
  height: string;
  birthDate: Date | null;
}

interface IUserProps {
  id: number;
  firstName: string;
  lastName: string;
  height: string;
  birthDateFormated: string;
  age: number;
}

const Dashboard: React.FC = () => {
  const [usersNameSortAsc, setUsersNameSortAsc] = useState<boolean>(true);
  const [usersFindTerm, setUsersFindTerm] = useState<string>('');
  const [users, setUsers] = useState<IUserProps[]>(() => {
    const storageList = localStorage.getItem('@UserList:users');
    if (storageList) {
      return JSON.parse(storageList);
    }
    return [];
  });

  const usersList = useMemo(() => {
    let newState = [...users];

    if (usersFindTerm.trim().length > 0) {
      newState = newState.filter(item => {
        const parseFirstName = removeDiacritics(item.firstName.toLowerCase());
        const parseLastName = removeDiacritics(item.lastName.toLowerCase());
        return (
          parseFirstName.includes(
            removeDiacritics(usersFindTerm.toLowerCase()),
          ) ||
          parseLastName.includes(removeDiacritics(usersFindTerm.toLowerCase()))
        );
      });
    }

    newState.sort((a, b) => {
      if (usersNameSortAsc) {
        return compare(a.firstName, b.firstName);
      }
      return compare(b.firstName, a.firstName);
    });

    return newState;
  }, [users, usersNameSortAsc, usersFindTerm]);

  useEffect(() => {
    localStorage.setItem('@UserList:users', JSON.stringify(users));
  }, [users]);

  const transformValueToDate = useCallback(
    (date: string | undefined | null): Date | null => {
      if (date) {
        return new Date(date);
      }
      return null;
    },
    [],
  );

  const handleSort = useCallback((orderAsc = true) => {
    setUsersNameSortAsc(orderAsc);
  }, []);

  const handleSubmit = useCallback(
    (
      { firstName, lastName, height, birthDate }: IUserPropsSubmit,
      { resetForm }: any,
    ) => {
      const birthDateFormated = birthDate
        ? format(birthDate, 'dd/MM/yyyy')
        : '';
      const age = birthDate ? differenceInYears(new Date(), birthDate) : 0;
      setUsers(oldState => [
        ...oldState,
        {
          id: Date.now(),
          firstName,
          lastName,
          height,
          birthDateFormated,
          age,
        },
      ]);
      resetForm();
    },
    [],
  );

  const handleRemoveUserById = useCallback((id: number) => {
    modalConfirmation({
      title: 'Confirmação',
      description: 'Confirma a remoção de um usuário?',
      handleConfirm: () => {
        setUsers(oldState => {
          const newState = [...oldState];
          const index = newState.findIndex(item => item.id === id);

          if (index >= 0) {
            newState.splice(index, 1);
          }

          return newState;
        });
      },
    });
  }, []);

  const handleClean = useCallback(() => {
    modalConfirmation({
      title: 'Confirmação',
      description: 'Confirma a remoção de todos os usuários',
      handleConfirm: () => {
        setUsers([]);
      },
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Cadastro</h2>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                  firstName: '',
                  lastName: '',
                  birthDate: null,
                  height: '',
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>Primeiro Nome</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Informe seu primeiro nome"
                      />
                      <Feedback type="invalid" show={!!errors.firstName}>
                        {errors.firstName}
                      </Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Informe seu sobrenome"
                      />
                      <Feedback type="invalid" show={!!errors.lastName}>
                        {errors.lastName}
                      </Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                      <Form.Label>Data de Nascimento</Form.Label>
                      <Field name="birthDate">
                        {({ field, form }: FieldProps<any>) => (
                          <DatePicker
                            id="birthDate"
                            useWeekdaysShort
                            popperPlacement="auto"
                            dateFormat="dd/MM/yyyy"
                            autoComplete="off"
                            formatWeekDay={nameOfDay =>
                              nameOfDay.substring(0, 3)
                            }
                            className="form-control"
                            placeholderText="Informe sua data de nascimento"
                            selected={transformValueToDate(values.birthDate)}
                            onChange={(date: Date | null) => {
                              form.setFieldValue(field.name, date);
                            }}
                            customInput={
                              <MaskedInput
                                mask="11/11/1111"
                                placeholder="dd/mm/aaaa"
                              />
                            }
                          />
                        )}
                      </Field>
                      <Feedback type="invalid" show={!!errors.birthDate}>
                        {errors.birthDate}
                      </Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                      <Form.Label>Altura</Form.Label>
                      <Form.Control
                        name="height"
                        value={values.height}
                        onChange={handleChange}
                        type="string"
                        placeholder="Informe sua altura"
                      />
                      <Feedback type="invalid" show={!!errors.height}>
                        {errors.height}
                      </Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Adicionar
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <VerticalSpace size={20} />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <ContentHeaderList>
                <h2>Lista de Usuários</h2>
                <ActionsList>
                  <InputGroup className="input-search">
                    <FormControl
                      onChange={e => setUsersFindTerm(e.target.value)}
                      placeholder="Buscar pelo nome"
                      aria-label="Buscar"
                      aria-describedby="Buscar"
                    />
                    <InputGroup.Text id="basic-addon2">
                      <AiOutlineSearch />
                    </InputGroup.Text>
                  </InputGroup>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => handleClean()}
                  >
                    Remover todos
                  </Button>
                  <Link
                    to="/export-users"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Exportar todos
                  </Link>
                </ActionsList>
              </ContentHeaderList>
            </Card.Header>
            <Card.Body>
              {usersList.length > 0 ? (
                <Table striped bordered hover className="table-sort">
                  <thead>
                    <tr>
                      <th>
                        Nome
                        <div className="container-action-buttons-list">
                          <button
                            type="button"
                            onClick={() => handleSort(true)}
                          >
                            <AiOutlineArrowUp />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSort(false)}
                          >
                            <AiOutlineArrowDown />
                          </button>
                        </div>
                      </th>
                      <th>Sobrenome</th>
                      <th>Altura</th>
                      <th>Data de Nascimento</th>
                      <th>Idade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map(row => (
                      <tr key={row.id}>
                        <td data-th="Nome: ">{row.firstName}</td>
                        <td data-th="Sobrenome: ">{row.lastName}</td>
                        <td data-th="Altura: ">{row.height}</td>
                        <td data-th="Nascimento: ">{row.birthDateFormated}</td>
                        <td data-th="Idade: ">{row.age}</td>
                        <td data-th="Ações: ">
                          <Button
                            variant="danger"
                            type="button"
                            onClick={() => handleRemoveUserById(row.id)}
                          >
                            <BsFillTrashFill size={20} color="#fff" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h3>Nenhum usuário encontrado</h3>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
