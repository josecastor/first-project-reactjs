import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRep: '',
    repositories: [],
    loading: false,
  };

  handlerInputChange = e => {
    this.setState({ newRep: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRep, repositories } = this.state;

    const response = await api.get(`/repos/${newRep}`);

    const data = {
      nome: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRep: '',
      loading: false,
    });
  };

  render() {
    const { newRep, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRep}
            onChange={this.handlerInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
