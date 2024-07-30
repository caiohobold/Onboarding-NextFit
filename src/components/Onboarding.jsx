import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { criarModalidade, criarContrato, configCaixa, configurarAvaliacao, configBloqueiosContrato, configCampos } from '../services/api';
import LogoNextFit from '../assets/logo next fit.png';
import {jwtDecode} from 'jwt-decode';
import userToken from '../services/authServices';

import Step1Modalidade from './step1modalidade';
import Step2Contrato from './step2contrato';
import Step3Avaliacao from './step3avaliacao';
import Step4Caixa from './step4caixa';
import Step5Bloqueios from './step5bloqueios';
import Step6Campos from './step6campos';
import '../styles/onboarding.css';
import Step7Financeiro from './step7financeiro';

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [modalidadeNome, setModalidadeNome] = useState('');
  const [permiteCaixaSimultaneo, setPermiteCaixaSimultaneo] = useState({});
  const [configAvaliacao, setConfigAvaliacao] = useState({});
  const [bloqueiosContrato, setBloqueiosContrato] = useState({});
  const [configFinanceiro, setConfigFinanceiro] = useState({});
  const [configReceberDados, setConfigReceberDados] = useState({});
  const [configContratoDados, setConfigContratoDados] = useState({});
  const [configComissao, setConfigComissao] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalidadeId, setModalidadeId] = useState(null);
  const [contratoDados, setContratoDados] = useState({});
  const [camposObrigatorios, setCamposObrigatorios] = useState([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState('');

  const steps = ['Modalidade', 'Contrato', 'Avaliação Física', 'Caixa', 'Bloqueios de contratos', 'Campos obrigatórios', 'Financeiro'];

  const handleNext = async (campos) => {
    if (activeStep === 0) {
      try {
        setLoading(true);
        const response = await criarModalidade(modalidadeNome);
        setModalidadeId(response.Content.Id);
        setActiveStep((prev) => prev + 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.ErrorCode === 168) {
          setErrorDialogMessage(error.response.data.Message || 'Já existe uma modalidade com este nome.');
          setOpenErrorDialog(true);
        } else {
          console.error('Erro ao criar modalidade:', error);
        }
      }
    } else if (activeStep === steps.length - 1) {
      try {
        setLoading(true);

        // Envia todas as requisições na última etapa
        await criarContrato({
          CodigoCategoriaReceita: 80085,
          ContabilizarAulasFormaConjunta: false,
          DataFimVenda: "",
          DataInicioVenda: "",
          Descricao: contratoDados.Descricao,
          Modalidades: [{
            CodigoModalidade: modalidadeId,
            DiaHorarioLivre: true,
            QtdeLimiteAcessosPorPeriodo: null,
            Tipo: 1,
            TipoLimiteAcessosPorPeriodo: 1
          }],
          PermiteDefinirRenovacaoAutomaticaNaVenda: false,
          PermiteRenovar: true,
          RenovarAutomaticamente: false,
          TempoDuracao: contratoDados.TempoDuracao,
          Tipo: 1,
          TipoCobrancaAdesao: 1,
          TipoDuracao: contratoDados.TipoDuracao,
          TipoRecebimento: 1,
          ValorPromocional: "100.00",
          ValorTotal: 100
        });

        const decodedToken = jwtDecode(userToken);

        const codigoTenant = parseInt(decodedToken.codigoTenant);
        const codigoUsuario = parseInt(decodedToken.codigoUsuario);

        await configurarAvaliacao({
          CalculaImc: configAvaliacao.CalculaImc,
          CalculaPesoIdeal: configAvaliacao.CalculaPesoIdeal,
          CodigoTenant: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          CodigoUsuarioCriacao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          Id: 4721, //é preciso alterar aqui para o ID correto de cada unidade.
          QtdeDiasProximaAvaliacao: parseInt(configAvaliacao.QtdeDiasProximaAvaliacao),
          Tenant: null,
          TipoUnidadeMedidaAltura: configAvaliacao.TipoUnidadeMedidaAltura,
        });

        await configCaixa({
          EnviarRelFechamentoParaUsuariosEnvolvidos: true,
          Id: 7500,
          PermiteAbrirMultiplosCaixas: permiteCaixaSimultaneo.PermiteAbrirMultiplosCaixas,
        });

        await configBloqueiosContrato({
          BloquearSemAvaliacaoFisicaOuVencida: bloqueiosContrato.BloquearSemAvaliacaoFisicaOuVencida,
          BloquearSemExameMedicoOuVencido: bloqueiosContrato.BloquearSemExameMedicoOuVencido,
          CodigoTenant: codigoTenant,
          CodigoUnidade: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          DiasBloquearNaoAssinados: bloqueiosContrato.DiasBloquearNaoAssinados,
          DiasBloquearSemAvaliacaoFisicaOuVencida: bloqueiosContrato.DiasBloquearSemAvaliacaoFisicaOuVencida,
          DiasBloquearSemExameMedicoOuVencido: bloqueiosContrato.DiasBloquearSemExameMedicoOuVencido,
          Id: 7245, //é preciso alterar aqui para o ID correto de cada unidade.
          Tenant: null,
          Unidade: null
        });

        await configCampos({ CamposObrigatorios: campos });

        setLoading(false);
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao finalizar onboarding:', error);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleNomeModalidadeChange = (nome) => {
    setModalidadeNome(nome);
  };

  const handleContratoDadosChange = (dados) => {
    setContratoDados(dados);
  };

  const handleAvaliacaoChange = (dados) => {
    setConfigAvaliacao(dados);
  };

  const handleCaixaDadosChange = (dados) => {
    setPermiteCaixaSimultaneo(dados);
  };

  const handleBloqueiosDadosChange = (dados) => {
    setBloqueiosContrato(dados);
  };

  const handleCamposObrigatoriosChange = (dados) => {
    setCamposObrigatorios(dados);
  };

  const handleFinanceiroChange = (dados) => {
    setCamposObrigatorios(dados);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <>
      <Modal
        className='modal-2'
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <Stepper activeStep={activeStep} alternativeLabel className='stepper-modal'>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="step-content">
            {activeStep === 0 && (
              <Step1Modalidade
                onDadosChange={handleNomeModalidadeChange}
                onNext={handleNext}
                loading={loading}
                setLoading={setLoading}
                criarModalidade={criarModalidade}
              />
            )}
            {activeStep === 1 && (
              <Step2Contrato
                onDadosChange={handleContratoDadosChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <Step3Avaliacao
                onDadosChange={handleAvaliacaoChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {activeStep === 3 && (
              <Step4Caixa
                onDadosChange={handleCaixaDadosChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {activeStep === 4 && (
              <Step5Bloqueios
                onDadosChange={handleBloqueiosDadosChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {activeStep === 5 && (
              <Step6Campos
                onDadosChange={handleCamposObrigatoriosChange}
                onNext={handleNext}
              />
            )}
            {activeStep === 6 && (
              <Step7Financeiro
                onDadosChange={handleFinanceiroChange}
                onNext={handleNext}
              />
            )}
          </div>
          <div className='div-logo'>
            <img src={LogoNextFit} alt="logo-next-fit" className='logo-nextfit'/>
          </div>
        </div>
      </Modal>

      <Dialog
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Erro</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            {errorDialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div className="app-container"></div>
    </>
  );
};

export default Onboarding;
