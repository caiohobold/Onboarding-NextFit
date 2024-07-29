import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Step3Avaliacao = ({ onNext, onDadosChange }) => {

  const [dados, setDados] = useState({
    CalculaImc: false,
    CalculaPesoIdeal: false,
    CodigoTenant: '',
    CodigoUsuarioAlteracao: '',
    CodigoUsuarioCriacao: '',
    DataAlteracao: '',
    DataCriacao: '',
    Id: '',
    QtdeDiasProximaAvaliacao: '',
    Tenant: null,
    TipoUnidadeMedidaAltura: '',
  });

  const [openValidationDialog, setOpenValidationDialog] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    const updatedDados = { ...dados, [name]: updatedValue };
    setDados(updatedDados);
    onDadosChange(updatedDados);
  };

  const handleCloseValidationDialog = () => {
        setOpenValidationDialog(false);
    };

    const handleNext = () => {
        if (!dados.TipoUnidadeMedidaAltura) {
          setOpenValidationDialog(true);
        }
        else if(!dados.QtdeDiasProximaAvaliacao){
          setOpenValidationDialog(true);
        }
        else {
            onNext();
        }
      };

  return (
    <div className='modal-step-contrato'>
      <h2 className='step2-title'>Configure as predefinições das avaliações físicas!</h2>
      <FormControl className='form-control-avaliacao'>
        <div className='row1-avaliacao'>
          <FormControlLabel
            control={
              <Switch
                checked={dados.CalculaPesoIdeal}
                onChange={handleChange}
                name="CalculaPesoIdeal"
                color="primary"
              />
            }
            label="Calcula peso ideal"
          />
          <FormControl fullWidth>
            <InputLabel>Unidade de medida da altura</InputLabel>
            <Select
              name="TipoUnidadeMedidaAltura"
              value={dados.TipoUnidadeMedidaAltura}
              onChange={handleChange}
            >
              <MenuItem value={1}>Metros</MenuItem>
              <MenuItem value={2}>Centímetros</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='row2-avaliacao'>
          <FormControlLabel
            control={
              <Switch
                checked={dados.CalculaImc}
                onChange={handleChange}
                name="CalculaImc"
                color="primary"
              />
            }
            label="Calcula IMC"
          />
          <TextField
            label="Quantidade de dias para a próxima avaliação"
            variant="outlined"
            fullWidth
            name="QtdeDiasProximaAvaliacao"
            value={dados.QtdeDiasProximaAvaliacao}
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
  );
}

export default Step3Avaliacao;
