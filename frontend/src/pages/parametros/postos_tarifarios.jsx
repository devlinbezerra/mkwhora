import GenericForm from '../Formulario';

export default function CadastroPostosTarifarios() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text', required: false }
  ];

  return (
          <GenericForm
            title="Cadastro de Postos Tarifários"
            fields={fields}
            endpointPath="/postotarifarios" // Resto do endpoint
          />
        );
}
