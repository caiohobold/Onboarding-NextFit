import React from 'react';
import { TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';

const Step1Modalidade = ({ onDadosChange, onNext, loading }) => {
  const [descricao, setDescricao] = useState('');
  const [openValidationDialog, setOpenValidationDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleChange = (event) => {
    setDescricao(event.target.value);
    onDadosChange(event.target.value);
  };

  const handleNext = () => {
    if (!descricao) {
        setOpenValidationDialog(true);
    } else {
        setOpenConfirmationDialog(true);
    }
  };

  const handleCloseValidationDialog = () => {
      setOpenValidationDialog(false);
  };

  const handleCloseConfirmationDialog = () => {
      setOpenConfirmationDialog(false);
  };

  const handleConfirmNext = () => {
      setOpenConfirmationDialog(false);
      onNext();
  };

  return (
    <div className="modal-modalidade">
      <h2 className='step1-title'>E aí gestor, conta pra gente! Qual a principal atividade do seu estabelecimento?</h2>
      <TextField
        label="Nome da Modalidade"
        className="input-modal"
        variant="outlined"
        value={descricao}
        onChange={handleChange}
        required
        InputProps={{
          endAdornment: (
            <CircularProgress
              color="inherit"
              size={24}
              sx={{ visibility: loading ? 'visible' : 'hidden' }}
            />
          ),
        }}
      />
      <div className="modal-button-container">
        <Button
          className='btn-step1'
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Próximo
        </Button>
      </div>

      <Dialog
            open={openValidationDialog}
            onClose={handleCloseValidationDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Campo Obrigatório</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    O campo de nome da modalidade não pode estar vazio.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseValidationDialog} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>

        {/* Modal de Confirmação */}
        <Dialog
            open={openConfirmationDialog}
            onClose={handleCloseConfirmationDialog}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">Confirmação</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    Tem certeza que deseja ir para a próxima etapa?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirmationDialog} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirmNext} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default Step1Modalidade;
