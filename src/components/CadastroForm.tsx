// src/components/CadastroForm.tsx
import React, { useState } from 'react';
import './CadastroForm.css';

const CadastroForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        cpf: '',
        phone: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        cpf: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateCpf = (cpf: string): boolean => {
        const cleanedCpf = cpf.replace(/\D/g, '');
        return /^[0-9]{11}$/.test(cleanedCpf);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCpf(formData.cpf)) {
            setErrors({ ...errors, cpf: 'CPF inválido. Digite 11 dígitos.' });
            return;
        } else {
            setErrors({ ...errors, cpf: '' });
        }

        // Logica para salvar dados
        console.log('Dados enviados:', formData);
    };

    return (
        <div className="container">
            <div className="form-image">
                <img src="cadastro/css/img/logo.png" alt="Logo" />
            </div>
            <div className="form">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-header">
                        <h1>Pré-Cadastro</h1>
                    </div>
                    <div className="input-group">
                        <div className="input-box">
                            <label htmlFor="firstname">Nome Completo</label>
                            <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                placeholder="Nome completo do solicitante"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                id="cpf"
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                placeholder="Digite seu CPF"
                                required
                            />
                            {errors.cpf && <span className="error">{errors.cpf}</span>}
                        </div>
                        <div className="input-box">
                            <label htmlFor="phone">Telefone</label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Telefone"
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email (opcional)</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="(Opcional)"
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="continue-button">Salvar</button>
                        <button type="button" className="back-button" onClick={() => window.history.back()}>Voltar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroForm;
