import GenericForm from '../Formulario';

export default function CadastroAgencia() {
  const fields = [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
    { name: 'cnpj', label: 'CNPJ', type: 'text', required: true },
    { name: 'link_faturas', label: 'Link da Fatura', type: 'url', required: true },
    { name: 'telefone_suporte', label: 'Telefone de Suporte', type: 'text', required: true },
    { name: 'email_suporte', label: 'E-mail de Suporte', type: 'text', required: true }
  ];

  return (
      <GenericForm
        title="Cadastro de Concessionárias de Energia"
        fields={fields}
        endpointPath="/agencias" // Resto do endpoint
      />
    );
}
