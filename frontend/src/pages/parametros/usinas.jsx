import GenericForm from '../Formulario';

export default function CadastroSubgrupo() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text', required: true },
    { name: 'potencia', label: 'Potência', type: 'text', required: true },
    { name: 'tipo', label: 'Tipo', type: 'text', required: true }
  ];

  return (
            <GenericForm
              title="Cadastro de Usinas"
              fields={fields}
              endpointPath="/usinas" // Resto do endpoint
            />
          );
}
