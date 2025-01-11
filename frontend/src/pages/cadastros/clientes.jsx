import GenericForm from '../Formulario';

export default function CadastroClientes() {
  const fields = [
    { name: 'cnpj', label: 'CNPJ', type: 'mask', required: true, mask: '99.999.999/9999-99' },
    { name: 'razao_social', label: 'Razão Social', type: 'text', required: true },
    { name: 'nome_fantasia', label: 'Nome Fantasia', type: 'text', required: true },
    { name: 'email_responsavel', label: 'E-mail Responsável', type: 'text', required: true },
    { name: 'telefone_responsavel', label: 'Telefone Responsável', type: 'mask', required: true, mask: '(99) 99999-9999' },
    { name: 'cpf_responsavel', label: 'CPF do Responsável', type: 'mask', required: true, mask: '999.999.999-99' },
    { name: 'nome_financeiro', label: 'Contato Financeiro', type: 'text', required: true },
    { name: 'email_financeiro', label: 'E-mail do Financeiro', type: 'text', required: true },
    { name: 'telefone_financeiro', label: 'Telefone do Financeiro', type: 'text', required: true },
    { name: 'whatsapp', label: 'É Whatsapp?', type: 'radio', required: true, options:[
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ] }
  ];

  return (
      <GenericForm
        title="Cadastro de Contratos"
        fields={fields}
        endpointPath="/consumidores" // Resto do endpoint
      />
    );
}
