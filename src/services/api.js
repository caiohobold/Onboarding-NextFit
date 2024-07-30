import axios from 'axios';
import userToken from './authServices';

const baseURL = 'https://api.sandbox.appnext.fit/api/'; 
const authorizationToken = userToken; 

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authorizationToken}`,
    'Content-Type': 'application/json'
  }
});

export const criarModalidade = async (nomeModalidade) => {
  try {
    const response = await api.post('Modalidade/Inserir', { Descricao: nomeModalidade });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const criarContrato = async (payload) => {
  try {
    const response = await api.post('ContratoBase', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const configurarAvaliacao = async (payload) => {
  try {
    const response = await api.put('ConfigAvaliacaoFisica', payload);
    return response.data;
  } catch (error){
    throw error;
  }
}

export const configCaixa = async (payload) => {
  try {
    const response = await api.put('ConfigCaixa', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const configBloqueiosContrato = async (payload) => {
  try {
    const response = await api.put('ConfigContratoBloqueio', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const configCampos = async (payload) => {
  try {
    const response = await api.post('ConfigCampoObrigatorio/SalvarCamposObrigatorios', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const configReceber = async (payload) => {
  try {
    const response = await api.put('configreceber', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const configContrato = async (payload) => {
  try {
    const response = await api.put('configcontrato', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const configComissao = async (payload) => {
  try {
    const response = await api.put('configcomissao', payload);
    return response.data;
  } catch (error){
    throw error;
  }
};


