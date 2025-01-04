import GenericForm from '../Formulario';

export default function CadastroContratos() {
  const fields = [
    { name: 'id_consumidor', label: 'Cliente', type: 'text', required: true },
    { name: 'data_inicio', label: 'Início', type: 'url', required: true },
    { name: 'data_fim', label: 'Término', type: 'text', required: true },
    { name: 'desagio_a', label: 'Deságio Grupo A', type: 'text', required: true },
    { name: 'desagio_b', label: 'Deságio Grupo B', type: 'text', required: true },
    { name: 'bandeira', label: 'Cobra Bandeira?', type: 'boolean', required: true }
  ];

  return (
      <GenericForm
        title="Cadastro de Contratos"
        fields={fields}
        endpointPath="/contratos" // Resto do endpoint
      />
    );
}
