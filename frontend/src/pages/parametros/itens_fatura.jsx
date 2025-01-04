import GenericForm from '../Formulario';

export default function CadastroItemFatura() {
  const fields = [
    { name: 'nome', label: 'Descrição', type: 'text', required: true },
    { name: 'unidade', label: 'Unidade de Medida', type: 'text', required: true },
    { name: 'tarifa', label: 'Valor da Tarifa', type: 'text', required: true },
    { name: 'injecao_usina', label: 'É injeção da Usina?', type: 'boolean', required: true },
    { name: 'SCEE', label: 'Pertence ao Sistema de Compensação?', type: 'boolean', required: true },
    { name: 'ordem', label: 'Ordem na Fatura', type: 'number', required: true },
  ];

  return (
        <GenericForm
          title="Cadastro de Tipo de Compensação"
          fields={fields}
          endpointPath="/itensfatura" // Resto do endpoint
        />
      );
}
