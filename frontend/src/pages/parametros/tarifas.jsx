import GenericForm from '../Formulario';

export default function Cadastro() {
  const fields = [
    { name: 'subgrupo', label: 'Grupo', type: 'text', required: true },
    { name: 'posto_tarifario', label: 'Posto Tarifário', type: 'text', required: true },
    { name: 'tarifa_tusd', label: 'Tarifa TUSD', type: 'text', required: true },
    { name: 'tarifa_te', label: 'Tarifa TE', type: 'text', required: true },
    { name: 'tarifa_total', label: 'Tarifa Total', type: 'text', required: true },
    { name: 'revisao_tarifaria', label: 'Revisão Tarifária', type: 'text', required: true },
    { name: 'modalidade', label: 'Modalidade', type: 'text', required: true }
  ];

  return (
            <GenericForm
              title="Cadastro de Subgrupos"
              fields={fields}
              endpointPath="/tarifas" // Resto do endpoint
            />
          );
}
