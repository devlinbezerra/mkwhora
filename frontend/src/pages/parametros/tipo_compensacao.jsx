import GenericForm from '../Formulario';

export default function CadastroTipoCompensacao() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text', required: true }
  ];

  return (
    <GenericForm
      title="Cadastro de Tipo de Compensação"
      fields={fields}
      endpointPath="/tipocompensacao" // Resto do endpoint
    />
  );
}
