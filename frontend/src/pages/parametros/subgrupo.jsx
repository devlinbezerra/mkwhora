import GenericForm from '../Formulario';

export default function CadastroSubgrupo() {
  const fields = [
    { name: 'grupo', label: 'Grupo', type: 'text', required: true },
    { name: 'subgrupo', label: 'Subgrupo', type: 'text', required: true },
  ];

  return (
            <GenericForm
              title="Cadastro de Subgrupos"
              fields={fields}
              endpointPath="/subgrupos" // Resto do endpoint
            />
          );
}
