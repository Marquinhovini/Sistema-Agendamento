import React, { useState } from 'react'; // Importando o React corretamente
import './Agendamento.css';

export function Agendamento() {
    const [selectUnidade, setSelectUnidade] = useState<string>('sede_sefaz');
    const [dataAtendimento, setDataAtendimento] = useState<string>('');

    const handleUnidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectUnidade(event.target.value);
    };

    const getEndereco = (): string => {
        switch (selectUnidade) {
            case 'sede_sefaz':
                return 'PREDIO PALACIO DA BATALHA - Av. Barreto de Menezes, 1648, Prazeres - CEP: 54310310 (Ao Lado do Corpo de Bombeiros)';
            case 'sede_procon':
                return 'PREDIO PALACIO DA BATALHA - Av. Barreto de Menezes, 1648, Prazeres - CEP: 54310310 (Ao Lado do Corpo de Bombeiros)';
            default:
                return '';
        }
    };

    return (
        <div className="agendamento">
            <h1 className="titulo-agendamento">Agendamento para atendimento</h1>
            
            <div className="campo">
                <label>Selecione o tipo de serviço</label>
                <select name="imposto" className="form-input">
                    <option value="iptu">IPTU</option>
                    <option value="iss">ISS</option>
                    <option value="itbi">ITBI</option>
                </select>
            </div>

            <div className="campo">
                <label>Selecione o local do atendimento</label>
                <select
                    name="unidade"
                    value={selectUnidade}
                    onChange={handleUnidadeChange}
                    className="form-input"
                >
                    <option value="sede_sefaz">SEFAZ</option>
                    <option value="sede_procon">PROCON</option>
                </select>
                <p><strong>Endereço:</strong> {getEndereco()}</p>
            </div>

            <div className="campo">
                <label>Escolha a data do atendimento</label>
                <input
                    type="date"
                    value={dataAtendimento}
                    onChange={(e) => setDataAtendimento(e.target.value)}
                    className="form-input"
                />
            </div>

            <button className="agendar-btn">Agendar</button>
        </div>
    );
}
