import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; 

const Step6Financeiro = ({ onNext, onDadosChangeReceber, onDadosChangeComissao, onDadosChangeContrato, campos }) => {

    const [openValidationDialog, setOpenValidationDialog] = useState(false);
    const [openConfigTaxaDialog, setOpenConfigTaxaDialog] = useState(false);
    const [openConfigBloqueiosDialog, setOpenConfigBloqueiosDialog] = useState(false);
    const [openConfigComissaoDialog, setOpenConfigComissaoDialog] = useState(false);

    const handleCloseValidationDialog = () => {
        setOpenValidationDialog(false);
    };

    const handleOpenConfigTaxaDialog = () => {
        setOpenConfigTaxaDialog(true);
    };

    const handleCloseConfigTaxaDialog = () => {
        setOpenConfigTaxaDialog(false);
    };

    const handleOpenConfigBloqueiosDialog = () => {
        setOpenConfigBloqueiosDialog(true);
    };

    const handleCloseConfigBloqueiosDialog = () => {
        setOpenConfigBloqueiosDialog(false);
    };

    const handleOpenConfigComissaoDialog = () => {
        setOpenConfigComissaoDialog(true);
    };

    const handleCloseConfigComissaoDialog = () => {
        setOpenConfigComissaoDialog(false);
    };

    const [configReceberDados, setConfigReceberDados] = useState({
        CobrarMultaPorAtraso: false,
        CodigoTenant: '',
        CodigoUnidade: '',
        CodigoUsuarioAlteracao: '',
        CodigoUsuarioCriacao: '',
        DataAlteracao: '',
        DataCriacao: '',
        Id: '',
        IncluirTaxasNoValorDoCliente: false,
        PercentualMoraDiaria: 0,
        PercentualMultaAoAtrasar: 0,
        Tenant: null,
        Unidade: null
      });

      const [configContratoDados, setConfigContratoDados] = useState({
        BloquearContratosComQqrFinanceiroEmAberto: false,
        CodigoTenant: '',
        CodigoUnidade: '',
        CodigoUsuarioAlteracao: '',
        CodigoUsuarioCriacao: '',
        DataAlteracao: '',
        DataCriacao: '',
        Id: '',
        ManterAulasNoPacoteNaRenovacaoContrato: false,
        ManterContratosComAulasNoPacoteAtivos: false,
        PercentualMultaCancelar: 0,
        QtdeDiasAntesBloquear: 0,
        QtdeDiasAntesEncerrar: 0,
        Tenant: null,
        Unidade: null
      });

      const [configComissao, setConfigComissao] = useState({
        CodigoTenant: '',
        CodigoUnidade: '',
        CodigoUsuarioAlteracao: '',
        CodigoUsuarioCriacao: '',
        DataAlteracao: '',
        DataCriacao: '',
        GerarComissaoValorIntegral: false,
        Id: '',
        Tenant: null,
        Unidade: null
      });

    const handleNext = () => {
        if (configReceberDados.PercentualMoraDiaria === undefined || configReceberDados.PercentualMoraDiaria === '') {
            setOpenValidationDialog(true);
        } else if (configReceberDados.PercentualMultaAoAtrasar === undefined || configReceberDados.PercentualMultaAoAtrasar === '') {
            setOpenValidationDialog(true);
        } else {
            onNext();
        }
    };

    const handleChangeConfigReceber = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...configReceberDados, [name]: updatedValue };
        setConfigReceberDados(updatedDados);
        onDadosChangeReceber({ configReceberDados: updatedDados });
        console.log(updatedDados);
    };

    const handleChangeConfigComissao = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...configComissao, [name]: updatedValue };
        setConfigComissao(updatedDados);
        onDadosChangeComissao({ configComissao: updatedDados });
        console.log(updatedDados);
    };

    const handleChangeConfigContrato = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...configContratoDados, [name]: updatedValue };
        setConfigContratoDados(updatedDados);
        onDadosChangeContrato({ configContratoDados: updatedDados });
        console.log(updatedDados);
    };




    return(
        <div className='modal-step-bloqueios'>
            <div className="tax-config-section">
                <h3 className='config-taxas-h3'>Configurar taxas e multas por atraso</h3>
                <Button color="primary" onClick={handleOpenConfigTaxaDialog} className='config-financeiro-btn'>
                    Configurar <SettingsIcon />
                </Button>
            </div>
            <div className="tax-config-section">
                <h3 className='config-taxas-h3'>Configurar multa de encerramento e bloqueios na catraca</h3>
                <Button color="primary" onClick={handleOpenConfigBloqueiosDialog} className='config-financeiro-btn'>
                    Configurar <SettingsIcon />
                </Button>
            </div>
            <div className="tax-config-section">
                <h3 className='config-taxas-h3'>Configurar comissões de vendas</h3>
                <Button color="primary" onClick={handleOpenConfigComissaoDialog} className='config-financeiro-btn'>
                    Configurar <SettingsIcon />
                </Button>
            </div>
                <Button
                className='btn-step7'
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 2 }}
                >
                Próximo
                </Button>

            <Dialog
                open={openValidationDialog}
                onClose={handleCloseValidationDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Campo Obrigatório</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Preencha todos os campos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseValidationDialog} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfigTaxaDialog}
                onClose={handleCloseConfigTaxaDialog}
                aria-labelledby="config-dialog-title"
                aria-describedby="config-dialog-description"
            >
                <DialogTitle id="config-dialog-title">Configurações de taxas e multas por atraso</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                            control={
                                <Switch
                                    checked={configReceberDados.IncluirTaxasNoValorDoCliente}
                                    onChange={handleChangeConfigReceber}
                                    name="IncluirTaxasNoValorDoCliente"
                                    color="primary"
                                />
                            }
                            label="Incluir taxas (maquininha e boleto) no valor do cliente"
                        />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={configReceberDados.CobrarMultaPorAtraso}
                                onChange={handleChangeConfigReceber}
                                name="CobrarMultaPorAtraso"
                                color="primary"
                            />
                        }
                        label="Cobrar multa por atraso das contas a receber"
                    />
                    {configReceberDados.CobrarMultaPorAtraso && (
                        <>
                            <TextField
                                label="Percentual Mora Diária"
                                variant="outlined"
                                fullWidth
                                name="PercentualMoraDiaria"
                                value={configReceberDados.PercentualMoraDiaria}
                                type='number'
                                onChange={handleChangeConfigReceber}
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Percentual Multa Ao Atrasar"
                                variant="outlined"
                                fullWidth
                                name="PercentualMultaAoAtrasar"
                                value={configReceberDados.PercentualMultaAoAtrasar}
                                type='number'
                                onChange={handleChangeConfigReceber}
                                required
                                margin="normal"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfigTaxaDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openConfigBloqueiosDialog}
                onClose={handleCloseConfigBloqueiosDialog}
                aria-labelledby="config-dialog-title"
                aria-describedby="config-dialog-description"
            >
                <DialogTitle id="config-dialog-title">Configurar multa de encerramento e bloqueios na catraca</DialogTitle>
                <DialogContent>
                    <div className='div-assinatura-bloqueios'>
                        <p className='p-assinatura-bloqueios'>Ao encerrar um contrato, cobrar multa de</p>
                        <TextField
                                        label="%"
                                        variant="outlined"
                                        fullWidth
                                        name="PercentualMultaCancelar"
                                        value={configContratoDados.PercentualMultaCancelar}
                                        type='number'
                                        onChange={handleChangeConfigContrato}
                                        required
                                        margin="normal"
                        />
                    </div>
                    <div className='div-ativo-bloqueios'>
                        <p className='p-ativo-bloqueios'>Após o contrato acabar, permitir que o cliente fique ativo por</p>
                        <TextField
                                        label="Dias"
                                        variant="outlined"
                                        fullWidth
                                        name="QtdeDiasAntesBloquear"
                                        value={configContratoDados.QtdeDiasAntesBloquear}
                                        type='number'
                                        onChange={handleChangeConfigContrato}
                                        required
                                        margin="normal"
                        />
                    </div>
                    <div className='div-bloqueado-bloqueios'>
                        <p className='p-bloqueado-bloqueios'>Após o contrato acabar, deixar o contrato bloqueado por</p>
                        <TextField
                                        label="Dias"
                                        variant="outlined"
                                        fullWidth
                                        name="QtdeDiasAntesEncerrar"
                                        value={configContratoDados.QtdeDiasAntesEncerrar}
                                        type='number'
                                        onChange={handleChangeConfigContrato}
                                        required
                                        margin="normal"
                        />
                    </div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={configContratoDados.ManterContratosComAulasNoPacoteAtivos}
                                onChange={handleChangeConfigContrato}
                                name="ManterContratosComAulasNoPacoteAtivos"
                                color="primary"
                            />
                        }
                        label="Manter contratos do tipo 'Pacote de Aulas' como 'ativos', mesmo que a duração do contrato acabe."
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={configContratoDados.ManterAulasNoPacoteNaRenovacaoContrato}
                                onChange={handleChangeConfigContrato}
                                name="ManterAulasNoPacoteNaRenovacaoContrato"
                                color="primary"
                            />
                        }
                        label="Manter aulas restantes ao renovar contratos do tipo 'Pacote de Aulas'."
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={configContratoDados.BloquearContratosComQqrFinanceiroEmAberto}
                                onChange={handleChangeConfigContrato}
                                name="BloquearContratosComQqrFinanceiroEmAberto"
                                color="primary"
                            />
                        }
                        label="Bloquear clientes com títulos financeiros abertos de qualquer origem."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfigBloqueiosDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfigComissaoDialog}
                onClose={handleCloseConfigComissaoDialog}
                aria-labelledby="config-dialog-title"
                aria-describedby="config-dialog-description"
            >
                <DialogTitle id="config-dialog-title">Configurar comissões de vendas</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                                control={
                                    <Switch
                                        checked={configComissao.GerarComissaoValorIntegral}
                                        onChange={handleChangeConfigComissao}
                                        name="GerarComissaoValorIntegral"
                                        color="primary"
                                    />
                                }
                                label="Nas comissões com valor fixo, gerar o valor integral da comissão no primeiro recebimento em casos de vendas parceladas."
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfigComissaoDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default Step6Financeiro;