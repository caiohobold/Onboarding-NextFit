import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { criarModalidade, criarContrato, configCaixa, configurarAvaliacao, configBloqueiosContrato, configCampos, configReceber, configContrato, configComissoes, configVip } from '../services/api';
import LogoNextFit from '../assets/logo next fit.png';
import {jwtDecode} from 'jwt-decode';
import userToken from '../services/authServices';

import Step1Modalidade from './step1modalidade';
import Step2Contrato from './step2contrato';
import Step3Avaliacao from './step3avaliacao';
import Step4Caixa from './step4caixa';
import Step5Bloqueios from './step5bloqueios';
import Step8Campos from './step8campos';
import '../styles/onboarding.css';
import Step7Financeiro from './step6financeiro';
import Step6Financeiro from './step6financeiro';
import Step7Vip from './step7vip';

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [modalidadeNome, setModalidadeNome] = useState('');
  const [permiteCaixaSimultaneo, setPermiteCaixaSimultaneo] = useState({});
  const [configAvaliacao, setConfigAvaliacao] = useState({});
  const [bloqueiosContrato, setBloqueiosContrato] = useState({});
  const [vipConfig, setVipConfig] = useState({});
  const [configReceberDados, setConfigReceberDados] = useState({});
  const [configContratoDados, setConfigContratoDados] = useState({});
  const [configComissao, setConfigComissao] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [modalidadeId, setModalidadeId] = useState(null);
  const [contratoDados, setContratoDados] = useState({});
  const [camposObrigatorios, setCamposObrigatorios] = useState([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState('');

  const steps = ['Modalidade', 'Contrato', 'Avaliação Física', 'Caixa', 'Bloqueios de contratos', 'Financeiro', 'VIP', 'Campos obrigatórios'];

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
    } 
    else if (activeStep === steps.length - 1) {
      try {
        setLoadingRequests(true);
        setLoading(true);

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
          ValorTotal: contratoDados.ValorTotal
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

        await configReceber({
          CobrarMultaPorAtraso: configReceberDados.CobrarMultaPorAtraso,
          CodigoTenant: codigoTenant,
          CodigoUnidade: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          CodigoUsuarioCriacao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          Id: 7515, //é preciso alterar aqui para o ID correto de cada unidade.
          IncluirTaxasNoValorDoCliente: configReceberDados.IncluirTaxasNoValorDoCliente,
          PercentualMoraDiaria: parseInt(configReceberDados.PercentualMoraDiaria),
          PercentualMultaAoAtrasar: parseInt(configReceberDados.PercentualMultaAoAtrasar),
          Tenant: null,
          Unidade: null
        });

        await configContrato({
          BloquearContratosComQqrFinanceiroEmAberto: configContratoDados.BloquearContratosComQqrFinanceiroEmAberto,
          CodigoTenant: codigoTenant,
          CodigoUnidade: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          CodigoUsuarioCriacao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          Id: 7516, //é preciso alterar aqui para o ID correto de cada unidade.
          ManterAulasNoPacoteNaRenovacaoContrato: configContratoDados.ManterAulasNoPacoteNaRenovacaoContrato,
          ManterContratosComAulasNoPacoteAtivos: configContratoDados.ManterContratosComAulasNoPacoteAtivos,
          PercentualMultaCancelar: parseInt(configContratoDados.PercentualMultaCancelar),
          QtdeDiasAntesBloquear: parseInt(configContratoDados.QtdeDiasAntesBloquear),
          QtdeDiasAntesEncerrar: parseInt(configContratoDados.QtdeDiasAntesEncerrar),
          Tenant: null,
          Unidade: null
        })

        await configComissoes({
          CodigoTenant: codigoTenant,
          CodigoUnidade: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          CodigoUsuarioCriacao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          GerarComissaoValorIntegral: configComissao.GerarComissaoValorIntegral,
          Id: 4709, //é preciso alterar aqui para o ID correto de cada unidade.
          Tenant: null,
          Unidade: null
        })

        await configVip({
          ClienteVipContabilizaComoAtivo: vipConfig.ClienteVipContabilizaComoAtivo,
          CodigoTenant: codigoTenant,
          CodigoUnidade: codigoTenant,
          CodigoUsuarioAlteracao: codigoUsuario,
          CodigoUsuarioCriacao: codigoUsuario,
          DataAlteracao: new Date().toISOString(),
          DataCriacao: new Date().toISOString(),
          FormaVendaContratos: parseInt(vipConfig.FormaVendaContratos) || 2,
          FormaVendaProdutos: parseInt(vipConfig.FormaVendaProdutos) || 3,
          FormaVendaServicos: parseInt(vipConfig.FormaVendaServicos) || 3,
          Id: 7483, //é preciso alterar aqui para o ID correto de cada unidade.
          PercDescontoContratos: parseInt(vipConfig.PercDescontoContratos) || 10,
          PercDescontoProdutos: parseInt(vipConfig.PercDescontoProdutos) || 10,
          PercDescontoServicos: parseInt(vipConfig.PercDescontoServicos) || 10,
          Tenant: null,
          Unidade: null
        })

        await configCampos({ CamposObrigatorios: campos });

        setLoading(false);
        setLoadingRequests(false);
        setCompleted(true); 
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        setLoadingRequests(false);
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

  const handleVipDadosChange = (dados) => {
    setVipConfig(dados);
  };

  const handleCamposObrigatoriosChange = (dados) => {
    setCamposObrigatorios(dados);
  };

  const handleFinanceiroChangeReceber = (dados) => {
    setConfigReceberDados(dados.configReceberDados || {});
  };

  const handleFinanceiroChangeComissao = (dados) => {
    setConfigComissao(dados.configComissao || {});
  };

  const handleFinanceiroChangeContrato = (dados) => {
    setConfigContratoDados(dados.configContratoDados || {});
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <>
      {loadingRequests && (
        <div className='loading-screen'>
          <div className='loading-spinner'></div>
          <p>Configurando... Por favor, aguarde.</p>
        </div>
      )}

      {completed && (
        <div className='completion-message'>
          <h2>Carregamento concluído!</h2>
          <p>O sistema Next Fit está pronto para uso.</p>
        </div>
      )}
      {!loadingRequests && !completed && (
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
              <Step6Financeiro
                onDadosChangeReceber={handleFinanceiroChangeReceber}
                onDadosChangeComissao={handleFinanceiroChangeComissao}
                onDadosChangeContrato={handleFinanceiroChangeContrato}
                onNext={handleNext}
              />
            )}
            {activeStep === 6 && (
              <Step7Vip
                onDadosChange={handleVipDadosChange}
                onNext={handleNext}
              />
            )}
            {activeStep === 7 && (
              <Step8Campos
                onDadosChange={handleCamposObrigatoriosChange}
                onNext={handleNext}
              />
            )}
          </div>
          <div className='div-logo'>
            <img src={LogoNextFit} alt="logo-next-fit" className='logo-nextfit'/>
          </div>
        </div>
      </Modal>
      )}

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
