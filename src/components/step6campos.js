import React, { useState } from 'react';
import { Button, FormControlLabel, Switch, Tab, Tabs } from '@mui/material';

const Step6Campos = ({ onNext, onDadosChange }) => {
    const [clienteCampos, setClienteCampos] = useState({
        bairro: false,
        celular: false,
        cep: false,
        cidade: false,
        complemento_Endereco: false,
        consultor: false,
        cpf: false,
        data_Nascimento: false,
        email: false,
        logradouro: false,
        numero_Endereco: false,
        objetivo: false,
        professor: false,
        rg: false,
        sexo: false,
    });

    const [leadCampos, setLeadCampos] = useState({
        bairro: false,
        celular: false,
        cep: false,
        cidade: false,
        complemento_Endereco: false,
        consultor: false,
        cpf: false,
        data_Nascimento: false,
        email: false,
        logradouro: false,
        numero_Endereco: false,
        objetivo: false,
        rg: false,
        sexo: false,
    });

    const [oportunidadeCampos, setOportunidadeCampos] = useState({
        como_Conheceu: false,
        nivel_Interesse: false,
        tipo_Visita: false
    });

    const [atividadeCampos, setAtividadeCampos] = useState({
       data_Prevista: false 
    });

    const nomePropriedadeMap = {
        bairro: 'Bairro',
        celular: 'Fone',
        cep: 'Cep',
        cidade: 'CodigoCidade',
        complemento_Endereco: 'CompleEndereco',
        consultor: 'CodigoUsuarioConsultor',
        cpf: 'Cpf',
        data_Nascimento: 'DataNascimento',
        email: 'Email',
        logradouro: 'Endereco',
        numero_Endereco: 'NumEndereco',
        objetivo: 'CodigoObjetivo',
        professor: 'CodigoUsuarioProfessor',
        rg: 'Rg',
        sexo: 'Sexo',
        como_Conheceu: 'CodigoComoConheceu',
        nivel_Interesse: 'CodigoNivelInteresse',
        tipo_Visita: 'CodigoTipoVisita',
        data_Prevista: 'DataHoraPrevista'
    };

    const [activeTab, setActiveTab] = useState('cliente');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleChange = (event, module) => {
        const { name, checked } = event.target;
        const updateModuleState = (moduleState, setModuleState) => {
            const updatedModuleState = { ...moduleState, [name]: checked };
            setModuleState(updatedModuleState);
            onDadosChange(updatedModuleState);
        };
    
        if (module === 'cliente') {
            updateModuleState(clienteCampos, setClienteCampos);
        } else if (module === 'lead') {
            updateModuleState(leadCampos, setLeadCampos);
        } else if (module === 'oportunidade') {
            updateModuleState(oportunidadeCampos, setOportunidadeCampos);
        } else if (module === 'atividade') {
            updateModuleState(atividadeCampos, setAtividadeCampos);
        }
    };

    const getOrigem = (module) => {
        switch (module) {
            case 'cliente':
                return 38;
            case 'lead':
                return 82;
            case 'oportunidade':
                return 83;
            case 'atividade':
                return 85;
            default:
                return 38; 
        }
    };

    const handleNext = () => {
        const camposObrigatorios = [
            ...Object.entries(clienteCampos).filter(([key, value]) => value).map(([key]) => ({ NomeDaPropriedade: nomePropriedadeMap[key], Origem: getOrigem('cliente') })),
            ...Object.entries(leadCampos).filter(([key, value]) => value).map(([key]) => ({ NomeDaPropriedade: nomePropriedadeMap[key], Origem: getOrigem('lead') })),
            ...Object.entries(oportunidadeCampos).filter(([key, value]) => value).map(([key]) => ({ NomeDaPropriedade: nomePropriedadeMap[key], Origem: getOrigem('oportunidade') })),
            ...Object.entries(atividadeCampos).filter(([key, value]) => value).map(([key]) => ({ NomeDaPropriedade: nomePropriedadeMap[key], Origem: getOrigem('atividade') })),
        ];

        onNext(camposObrigatorios);
    };

    return (
        <div className='modal-step-campos'>
            <h2 className='step-campos-title'>Selecione os campos obrigatórios dos cadastros!</h2>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="modulo tabs">
                <Tab label="Cliente" value="cliente" />
                <Tab label="Lead" value="lead" />
                <Tab label="Oportunidade" value="oportunidade" />
                <Tab label="Atividade" value="atividade" />
            </Tabs>
            <div className="options-container">
                {activeTab === 'cliente' && Object.keys(clienteCampos).map((campo) => (
                    <FormControlLabel
                        key={campo}
                        control={
                            <Switch
                                checked={clienteCampos[campo]}
                                onChange={(event) => handleChange(event, 'cliente')}
                                name={campo}
                                color="primary"
                            />
                        }
                        label={campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ')}
                    />
                ))}
                {activeTab === 'lead' && Object.keys(leadCampos).map((campo) => (
                    <FormControlLabel
                        key={campo}
                        control={
                            <Switch
                                checked={leadCampos[campo]}
                                onChange={(event) => handleChange(event, 'lead')}
                                name={campo}
                                color="primary"
                            />
                        }
                        label={campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ')}
                    />
                ))}
                {activeTab === 'oportunidade' && Object.keys(oportunidadeCampos).map((campo) => (
                    <FormControlLabel
                        key={campo}
                        control={
                            <Switch
                                checked={oportunidadeCampos[campo]}
                                onChange={(event) => handleChange(event, 'oportunidade')}
                                name={campo}
                                color="primary"
                            />
                        }
                        label={campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ')}
                    />
                ))}
                {activeTab === 'atividade' && Object.keys(atividadeCampos).map((campo) => (
                    <div className='atividade-tab'>
                        <FormControlLabel
                            key={campo}
                            control={
                                <Switch
                                    checked={atividadeCampos[campo]}
                                    onChange={(event) => handleChange(event, 'atividade')}
                                    name={campo}
                                    color="primary"
                                />
                            }
                            label={campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ')}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            sx={{ mt: 2 }}
                        >
                            Próximo
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default Step6Campos;
