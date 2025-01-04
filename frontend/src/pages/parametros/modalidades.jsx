import GenericForm from '../Formulario';

export default function Cadastro() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text', required: false }
  ];

  return (
          <GenericForm
            title="Cadastro de Modalidades"
            fields={fields}
            endpointPath="/modalidades" // Resto do endpoint
          />
        );
}
