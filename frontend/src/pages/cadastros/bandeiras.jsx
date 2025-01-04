import GenericForm from '../Formulario';

export default function CadastroBandeiras() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text', required: true },
    { name: 'tarifa_bandeira', label: 'Tarifa da Bandeira', type: 'number', required: true }

  ];

  return (
      <GenericForm
        title="Cadastro de Bandeiras"
        fields={fields}
        endpointPath="/bandeira" // Resto do endpoint
      />
    );
}
