import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';

const Step4Caixa = ({onNext, loading, onDadosChange}) => {

    const [dados, setDados] = React.useState({
        EnviarRelFechamentoParaUsuariosEnvolvidos: true,
        Id: 7500,
        PermiteAbrirMultiplosCaixas: false,
      });

      const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        const updatedDados = { ...dados, [name]: updatedValue };
        setDados(updatedDados);
        onDadosChange(updatedDados);
    };

    return(
        <div className='modal-step-contrato'>
            <h2 className='step2-title'>Você deseja permitir que mais de um caixa seja aberto simultaneamente?</h2>
            <FormControl className='form-control-caixa'>
            <FormControlLabel
                    control={
                        <Switch
                            checked={dados.PermiteAbrirMultiplosCaixas}
                            onChange={handleChange}
                            name="PermiteAbrirMultiplosCaixas"
                            color="primary"
                        />
                    }
                    label="Permitir múltiplos caixas abertos"
                />
                <Button
                className='btn-step2'
                variant="contained"
                color="primary"
                onClick={onNext}
                sx={{ mt: 2 }}
                >
                Próximo
                </Button>
            </FormControl>
        </div>
    )
}

export default Step4Caixa;