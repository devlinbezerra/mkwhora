import GenericForm from '../Formulario';

export default function CadastroAgencia() {
  const fields = [
    { name: 'codigo_uc', label: 'Unidade Consumidora', type: 'text', required: true },
    { name: 'codigo_instalacao', label: 'Código de Instalação', type: 'text', required: true },
    { name: 'subgrupo', label: 'Subgrupo', type: 'select', required: true, optionsEndpoint: '/subgrupos/options'  },
    { name: 'optante_bt', label: 'É Optante BT', type: 'radio', required: true, options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ] },
    { name: 'tipo_ligacao', label: 'Tipo de Ligação', type: 'text', required: true },
    { name: 'tensao', label: 'Tensão', type: 'text', required: true },
    { name: 'consumidor', label: 'Cliente', type: 'autocomplete', required: true, optionsEndpoint: '/consumidores/options' },
    { name: 'titularidade', label: 'Titularidade', type: 'text', required: true },
    { name: 'cnpj_titular', label: 'CNPJ do Titular', type: 'text', required: true },
    { name: 'modalidade', label: 'Modalidade', type: 'url', required: true },
    { name: 'localizacao', label: 'Localização', type: 'text', required: true },
    { name: 'desagio', label: 'Deságio', type: 'decimal', required: true },
    { name: 'autoconsumo_remoto', label: 'É autoconsumo remoto?', type: 'radio', required: true, options: [
      { value: 'true', label: 'Sim' },
      { value: 'false', label: 'Não' }
    ] }
  ];

  return (
      <GenericForm
        title="Cadastro de Concessionárias de Energia"
        fields={fields}
        endpointPath="/ucs" // Resto do endpoint
      />
    );
}
