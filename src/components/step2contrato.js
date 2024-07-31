// Step2Contrato.js
import React, {useState} from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Step2Contrato = ({ onDadosChange, onNext }) => {
    const [dados, setDados] = React.useState({
        Descricao: '',
        TempoDuracao: 1,
        TipoDuracao: 1,
        ValorTotal: 0
      });

      const [openValidationDialog, setOpenValidationDialog] = useState(false);
      const [openValidationValueDialog, setOpenValidationValueDialog] = useState(false);

      const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedDados = { ...dados, [name]: value };
        setDados(updatedDados);
        onDadosChange(updatedDados);
    };

    const handleCloseValidationDialog = () => {
      setOpenValidationDialog(false);
  };

    const handleCloseValidationValueDialog = () => {
      setOpenValidationValueDialog(false);
  };

  const handleNext = () => {
    if (!dados.Descricao) {
      setOpenValidationDialog(true);
    }
    else if(!dados.TempoDuracao){
      setOpenValidationDialog(true);
    }
    else if(!dados.TipoDuracao){
      setOpenValidationDialog(true);
    }
    else if(dados.ValorTotal === 0){
      setOpenValidationValueDialog(true);
    }
    else if(!dados.ValorTotal){
      setOpenValidationDialog(true);
    }
    else {
        onNext();
    }
  };


  return (
    <div className='modal-step-contrato'>
      <h2 className='step2-title'>Vamos criar um contrato com esta modalidade!</h2>
      <FormControl className='form-control-contrato'>
        <TextField
          label="Nome do Contrato"
          variant="outlined"
          fullWidth
          name="Descricao"
          value={dados.Descricao}
          onChange={handleChange}
          required
        />
        <div className='row-duracaocontrato'>
          <TextField
            label="Duração"
            variant="outlined"
            fullWidth
            name="TempoDuracao"
            value={dados.TempoDuracao}
            type='number'
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
                    <InputLabel>Tipo de duração</InputLabel>
                    <Select
                        name="TipoDuracao"
                        value={dados.TipoDuracao}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Dia</MenuItem>
                        <MenuItem value={2}>Semana</MenuItem>
                        <MenuItem value={3}>Mês</MenuItem>
                    </Select>
          </FormControl>
          <TextField
            label="Valor"
            variant="outlined"
            fullWidth
            name="ValorTotal"
            value={dados.ValorTotal}
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

        <Dialog
            open={openValidationValueDialog}
            onClose={handleCloseValidationValueDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Valor inválido</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    O valor do contrato precisa ser diferente de zero.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseValidationValueDialog} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default Step2Contrato;
