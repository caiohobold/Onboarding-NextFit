import React, { useState } from 'react';
import { TextField, Button, FormControl, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, MenuItem } from '@mui/material';

const Step7Vip = ({ onNext, onDadosChange }) => {

    const [openValidationDialog, setOpenValidationDialog] = useState(false);

    const handleCloseValidationDialog = () => {
        setOpenValidationDialog(false);
    };

    const [dados, setDados] = useState({
        ClienteVipContabilizaComoAtivo: true,
        CodigoTenant: '',
        CodigoUnidade: '',
        CodigoUsuarioAlteracao: '',
        CodigoUsuarioCriacao: '',
        DataAlteracao: '',
        DataCriacao: '',
        FormaVendaContratos: 2,
        FormaVendaProdutos: 3,
        FormaVendaServicos: 3,
        Id: '',
        PercDescontoContratos: 10,
        PercDescontoProdutos: 10,
        PercDescontoServicos: 10,
        Tenant: null,
        Unidade: null
      });

      const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...dados, [name]: updatedValue };
        setDados(updatedDados);
        onDadosChange(updatedDados);
    };

    const handleNext = () => {
        onNext();
    };

    return(
        <div className='modal-step-bloqueios'>
            <h2 className='step2-title'>Configure as predefinições dos Clientes VIP!</h2>
            <FormControl className='form-control-avaliacao'>
                <div className='row1-vip'>
                    <FormControlLabel
                    className='switch-bloqueios-1'
                        control={
                        <Switch
                            checked={dados.ClienteVipContabilizaComoAtivo}
                            onChange={handleChange}
                            name="ClienteVipContabilizaComoAtivo"
                            color="primary"
                        />
                        }
                        label="Clientes VIP contabilizam como clientes ativos"
                    />
                </div>
                <div className='row2-vip'>
                    <p>Os produtos são vendidos com</p>
                    <FormControl className='select-form'>
                        <Select
                            name="FormaVendaProdutos"
                            value={dados.FormaVendaProdutos}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Preço de venda</MenuItem>
                            <MenuItem value={3}>Desconto</MenuItem>
                        </Select>
                    </FormControl>
                    {dados.FormaVendaProdutos === 3 && (
                        <>
                            <TextField
                            className='select-form-input'
                                label="Desconto"
                                variant="outlined"
                                name="PercDescontoProdutos"
                                value={dados.PercDescontoProdutos}
                                type='number'
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </>
                    )}
                </div>
                <div className='row2-vip'>
                    <p>Os serviços são vendidos com</p>
                    <FormControl className='select-form'>
                        <Select
                            name="FormaVendaServicos"
                            value={dados.FormaVendaServicos}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Preço de venda</MenuItem>
                            <MenuItem value={3}>Desconto</MenuItem>
                        </Select>
                    </FormControl>
                    {dados.FormaVendaServicos === 3 && (
                        <>
                            <TextField
                            className='select-form-input'
                                label="Desconto"
                                variant="outlined"
                                name="PercDescontoServicos"
                                value={dados.PercDescontoServicos}
                                type='number'
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </>
                    )}
                </div>
                <div className='row2-vip'>
                    <p>Os contratos são vendidos com</p>
                    <FormControl className='select-form'>
                        <Select
                            name="FormaVendaContratos"
                            value={dados.FormaVendaContratos}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Preço de venda</MenuItem>
                            <MenuItem value={2}>Desconto</MenuItem>
                        </Select>
                    </FormControl>
                    {dados.FormaVendaContratos === 2 && (
                        <>
                            <TextField
                            className='select-form-input'
                                label="Desconto"
                                variant="outlined"
                                name="PercDescontoContratos"
                                value={dados.PercDescontoContratos}
                                type='number'
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </>
                    )}
                </div>
                <Button
                className='btn-step2'
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 2 }}
                >
                Próximo
                </Button>
            </FormControl>

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
        </div>
    );
}

export default Step7Vip;