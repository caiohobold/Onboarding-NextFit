import React, { useState } from 'react';
import { TextField, Button, FormControl, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Step5Bloqueios = ({ onNext, onDadosChange }) => {

    const [openValidationDialog, setOpenValidationDialog] = useState(false);

    const handleCloseValidationDialog = () => {
        setOpenValidationDialog(false);
    };

    const [dados, setDados] = useState({
        BloquearSemAvaliacaoFisicaOuVencida: false,
        BloquearSemExameMedicoOuVencido: false,
        CodigoTenant: '',
        CodigoUnidade: '',
        CodigoUsuarioAlteracao: '',
        CodigoUsuarioCriacao: '',
        DataAlteracao: '',
        DataCriacao: '',
        DiasBloquearNaoAssinados: 2,
        DiasBloquearSemAvaliacaoFisicaOuVencida: 0,
        DiasBloquearSemExameMedicoOuVencido: 0,
        Id: '',
        Tenant: null,
        Unidade: null
      });

      const handleNext = () => {
        if (dados.DiasBloquearNaoAssinados === undefined || dados.DiasBloquearNaoAssinados === '') {
            setOpenValidationDialog(true);
        } else if (dados.DiasBloquearSemAvaliacaoFisicaOuVencida === undefined || dados.DiasBloquearSemAvaliacaoFisicaOuVencida === '') {
            setOpenValidationDialog(true);
        } else if (dados.DiasBloquearSemExameMedicoOuVencido === undefined || dados.DiasBloquearSemExameMedicoOuVencido === '') {
            setOpenValidationDialog(true);
        } else {
            onNext();
        }
    };

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...dados, [name]: updatedValue };
        setDados(updatedDados);
        onDadosChange(updatedDados);
    };

    return(
        <div className='modal-step-bloqueios'>
            <h2 className='step2-title'>Configure as predefinições dos bloqueios de contratos!</h2>
            <FormControl className='form-control-avaliacao'>
                <div className='row1-bloqueios'>
                    <FormControlLabel
                    className='switch-bloqueios-1'
                        control={
                        <Switch
                            checked={dados.BloquearSemAvaliacaoFisicaOuVencida}
                            onChange={handleChange}
                            name="BloquearSemAvaliacaoFisicaOuVencida"
                            color="primary"
                        />
                        }
                        label="Bloquear contratos sem avaliação física ou vencida a "
                    />
                    <TextField
                        label="Dias"
                        variant="outlined"
                        fullWidth
                        name="DiasBloquearSemAvaliacaoFisicaOuVencida"
                        value={dados.DiasBloquearSemAvaliacaoFisicaOuVencida}
                        type='number'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='row2-bloqueios'>
                    <FormControlLabel
                        className='switch-bloqueios-1'
                        control={
                        <Switch
                            checked={dados.BloquearSemExameMedicoOuVencido}
                            onChange={handleChange}
                            name="BloquearSemExameMedicoOuVencido"
                            color="primary"
                        />
                        }
                        label="Bloquear contratos sem exame médico ou vencido a "
                    />
                    <TextField
                        label="Dias"
                        variant="outlined"
                        fullWidth
                        name="DiasBloquearSemExameMedicoOuVencido"
                        value={dados.DiasBloquearSemExameMedicoOuVencido}
                        type='number'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='row3-bloqueios'>
                    <p>Bloquear contratos não assinados depois de</p>
                    <TextField
                        label="Dias"
                        variant="outlined"
                        fullWidth
                        name="DiasBloquearNaoAssinados"
                        value={dados.DiasBloquearNaoAssinados}
                        type='number'
                        onChange={handleChange}
                        required
                    />
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
    )
}

export default Step5Bloqueios;