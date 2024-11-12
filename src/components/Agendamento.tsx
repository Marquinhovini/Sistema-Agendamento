import React, { useState } from 'react';
import './Agendamento.css';

export function Agendamento() {
    const [selectEndereco, setSelectEndereco] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [nomeCompleto, setNomeCompleto] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [tipoServico, setTipoServico] = useState<string>('');
    const [unidade, setUnidade] = useState<string>(''); // Unidade atual SEFAZ ou Procon
    const [cpfError, setCpfError] = useState<string>(''); // Erro CPF
    const [telefoneError, setTelefoneError] = useState<string>(''); // Erro Telefone
    const [formError, setFormError] = useState<string>(''); // Erro de formulário global
    const [isCpfValid, setIsCpfValid] = useState<boolean>(false); // Estado para verificar se o CPF foi validado

    const handleEnderecoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectEndereco(event.target.value);
    };

    const handleTipoServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedServico = event.target.value;
        setTipoServico(selectedServico);

        // Define a unidade automaticamente com base no tipo de serviço
        if (selectedServico === 'iptu' || selectedServico === 'itbi') {
            setUnidade('SEFAZ');
        } else if (selectedServico === 'iss') {
            setUnidade('Procon');
        }
    };

    const getEndereco = (local: 'sefaz_procon' | 'shopping'): string => {
        const enderecos: { [key in 'sefaz_procon' | 'shopping']: string } = {
            sefaz_procon: 'PREDIO PALACIO DA BATALHA - Av. Barreto de Menezes, 1648, Prazeres - CEP: 54310310 (Ao Lado do Corpo de Bombeiros)',
            shopping: 'Shopping Guararapes, Rua 15, Bairro Prazeres',
        };
        return enderecos[local]; // Acesso seguro ao objeto
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Resetando mensagens de erro
        setCpfError('');
        setTelefoneError('');
        setFormError('');

        // Validar campos obrigatórios
        if (!cpf || !nomeCompleto || !telefone || !tipoServico || !selectEndereco) {
            setFormError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar CPF e Telefone
        if (!validateCpf(cpf) || !validateTelefone(telefone)) {
            if (!validateCpf(cpf)) setCpfError('CPF inválido');
            if (!validateTelefone(telefone)) setTelefoneError('Telefone deve conter 11 números');
            return;
        }

        // Aqui você pode processar o envio, como uma requisição para um backend
        console.log("Formulário enviado:", { cpf, nomeCompleto, email, telefone, tipoServico, unidade, selectEndereco });
    };

    // Função para validar o CPF (apenas formato básico)
    const validateCpf = (cpf: string): boolean => {
        const cleanedCpf = cpf.replace(/\D/g, '');
        const regex = /^[0-9]{11}$/; // Verifica se tem 11 dígitos
        return regex.test(cleanedCpf);
    };

    // Função para validar o telefone
    const validateTelefone = (telefone: string): boolean => {
        const cleanedTelefone = telefone.replace(/\D/g, '');
        return cleanedTelefone.length === 11; // Verifica se tem 11 dígitos
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (value.length > 11) value = value.substring(0, 11); // Limita a 11 dígitos
        setCpf(formatCpf(value)); // Formata CPF
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (value.length > 11) value = value.substring(0, 11); // Limita a 11 dígitos
        setTelefone(formatTelefone(value)); // Formata Telefone
    };

    const formatCpf = (cpf: string): string => {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatTelefone = (telefone: string): string => {
        if (!telefone) return '';
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const handleConsultaClick = () => {
        // Validar CPF e ativar os outros campos
        if (validateCpf(cpf)) {
            setIsCpfValid(true); // Ativa os campos ao validar o CPF
            setCpfError(''); // Limpa erro, se houver
        } else {
            setIsCpfValid(false); // Mantém os campos desabilitados se o CPF for inválido
            setCpfError('CPF inválido');
        }
    };



    return (
        <div className="agendamento">
            <h1 className="titulo-agendamento">Serviço de Agendamento</h1>

            {/* Formulário */}
            <form onSubmit={handleSubmit}>

                {/* Erro global */}
                {formError && <div className="error global-error">{formError}</div>}

                {/* CPF */}
                <div className="campo">
                    <label>Insira seu CPF</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="Insira seu CPF"
                        required
                        className="form-input"
                    />
                    {cpfError && <span className="error">{cpfError}</span>}
                    {/* Botão de consulta de CPF */}
                    {!isCpfValid && (
                        <button type="button" onClick={handleConsultaClick} className="consulta-btn">Consultar</button>
                    )}
                </div>

                {/* Campos desabilitados até o CPF ser válido */}
                {isCpfValid && (
                    <>
                        <div className="campo">
                            <label>Selecione o tipo de serviço</label>
                            <select
                                name="imposto"
                                value={tipoServico}
                                onChange={handleTipoServicoChange}
                                className="form-input"
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                <option value="iptu">IPTU</option>
                                <option value="iss">ISS</option>
                                <option value="itbi">ITBI</option>
                            </select>
                            <p><strong>Unidade:</strong> {unidade}</p>
                        </div>

                        <div className="campo">
                            <label>Local do Atendimento</label>
                            <select
                                name="Endereco"
                                value={selectEndereco}
                                onChange={handleEnderecoChange}
                                className="form-input"
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                <option value="sefaz_procon">{getEndereco("sefaz_procon")}</option>
                                <option value="shopping">{getEndereco("shopping")}</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label>Nome Completo Do Requerente</label>
                            <input
                                type="text"
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
                                placeholder="Seu nome completo"
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="campo">
                            <label>E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@exemplo.com"
                                className="form-input"
                            />
                        </div>

                        <div className="campo">
                            <label>Telefone</label>
                            <input
                                type="tel"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                placeholder="(99) 99999-9999"
                                required
                                className="form-input"
                            />
                            {telefoneError && <span className="error">{telefoneError}</span>}
                        </div>

                        {/* Botões */}
                        <div className="buttons">
                            <button type="button" className="voltar-btn">Voltar</button>
                            <button type="submit" className="agendar-btn">Agendar</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
