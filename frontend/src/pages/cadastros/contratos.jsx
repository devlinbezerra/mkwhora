import GenericForm from '../Formulario';

export default function CadastroContratos() {
  const fields = [
    { name: 'id_cosumidor', label: 'Cliente', type: 'autocomplete', required: true, optionsEndpoint: '/consumidores/options' },
    { name: 'data_inicio', label: 'Início', type: 'date', required: true },
    { name: 'data_fim', label: 'Término', type: 'date', required: true },
    { name: 'desagio_a', label: 'Deságio Grupo A', type: 'text', required: true },
    { name: 'desagio_b', label: 'Deságio Grupo B', type: 'text', required: true },
    { name: 'bandeira', label: 'Cobra Bandeira?', type: 'radio', required: true, options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ] }
  ];

  return (
      <GenericForm
        title="Cadastro de Contratos"
        fields={fields}
        endpointPath="/contratos" // Resto do endpoint
      />
    );
}
