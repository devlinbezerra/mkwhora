CREATE TABLE consumidores (
    id_consumidor int primary key auto_increment,
    cnpj varchar(50),
	razao_social varchar(255),
	nome_fantasia varchar(255),
	email_responsavel varchar(255),
	telefone_responsavel varchar(255),
	cpf_responsavel varchar(255),
	nome_financeiro varchar(255),
	email_financeiro varchar(255),
	telefone_financeiro varchar(255),
	whatsapp boolean
);

CREATE TABLE ucs (
    id_uc int primary key auto_increment,
    codigo_uc varchar(50),
    codigo_instalacao varchar(50),
	grupo varchar(50),
	subgrupo varchar(50),
	optante_bt boolean,
	tipo_ligacao varchar(50),
	tensao varchar(50),
	consumidor int,
	titularidade varchar(50),
	cnpj_titular varchar(50),
	modalidade varchar(50),
    localizacao varchar(255),
    desagio decimal(10,2),
    autoconsumo_remoto boolean,
    foreign key (consumidor) references consumidores(id_consumidor)
);

CREATE TABLE faturas_agencia (
    id_fatura_agencia int primary key auto_increment,
    uc int,
    referencia date not null,
    data_vencimento date not null,
    data_emissao date not null,
    data_apresentacao date,
    data_leitura_atual date,
    data_leitura_anterior date,
    data_prox_leitura date,
	valor_fatura decimal(10,2) not null,
	aliq_pis decimal(10,7) not null,
	aliq_cofins decimal(10,7) not null,
	aliq_icms decimal(10,7) not null,
    bandeira int,
    status_fatura int,
    FOREIGN KEY (uc) REFERENCES ucs(id_uc),
    FOREIGN KEY (bandeira) REFERENCES bandeira(id_bandeira),
    FOREIGN KEY (status_fatura) REFERENCES aux_status_fatura(id_status)
);

CREATE TABLE faturas_usina (
    id_fatura_usina int primary key auto_increment,
    id_fatura_agencia int,
    valor_sem_gd decimal(10, 2),
    valor_com_gd decimal(10, 2),
    economia decimal(10, 2),
    desagio decimal(10, 2),
    obs text,
    FOREIGN KEY (id_fatura_agencia) REFERENCES faturas_agencia(id_fatura_agencia)
);
/** Tabela onde é registrado os itens de cada fatura**/ 
CREATE TABLE itens_fatura_agencia (
    id_item_fatura_agencia int primary key auto_increment not null,
    id_fatura_agencia int not null,
    item_fatura_agencia int not null,
    quantidade decimal(10,2),
    valor decimal(10,2),
    FOREIGN KEY (item_fatura_agencia) REFERENCES itens_fatura(id_itens_fatura),
    FOREIGN KEY (id_fatura_agencia) REFERENCES faturas_agencia(id_fatura_agencia)
);

CREATE TABLE aux_agencia (
    id_agencia int primary key auto_increment,
    nome varchar(255),
	cnpj varchar(50),
	link_faturas varchar(255),
	telefone_suporte varchar(100),
	email_suporte varchar(255)
);

CREATE TABLE revisao (
    id_revisao int primary key auto_increment,
    agencia int,
    nome varchar(255),
    data_revisao date,
    arquivo text,
    FOREIGN KEY (agencia) REFERENCES aux_agencia(id_agencia)
);

CREATE TABLE aux_subgrupo (
    id_subgrupo int primary key auto_increment,
    grupo varchar(50),
    subgrupo varchar(50)
);

CREATE TABLE tarifas (
    id_tarifa int primary key auto_increment,
    subgrupo int not null,
	posto_tarifario varchar(100) not null,
	tarifa_tusd decimal(10,5),
	tarifa_te decimal(10,5),
	tarifa_total decimal(10,5),
	revisao_tarifaria int,
	modalidade varchar(100),
	FOREIGN KEY (subgrupo) REFERENCES aux_subgrupo(id_subgrupo),
    FOREIGN KEY (revisao_tarifaria) REFERENCES revisao(id_revisao)
);


/** Tabela onde é registrado os tipos de itens a serem utilizados na tabela itens_fatura_agencia **/
CREATE TABLE itens_fatura (
    id_itens_fatura int primary key auto_increment,
    nome varchar(255),
    unidade varchar(50),
    tarifa int,
    saldo tinyint, /** -1 quando é compensação. 1 padrão. */
    injecao_usina boolean, /** True se for injeção da usina */
    SCEE boolean, /** True se for bandeira tarifária */
    ordem int not null,
    FOREIGN KEY (tarifa) REFERENCES tarifas(id_tarifa)
);

CREATE TABLE contratos (
    id_contrato int primary key auto_increment,
    id_consumidor int,
    data_inicio date,
    data_fim date,
    desagio_a decimal(10,2),
    desagio_b decimal(10,2),
    bandeira boolean,
    FOREIGN KEY (id_consumidor) REFERENCES consumidores(id_consumidor)
);

CREATE TABLE ucs_contrato (
    id_uc_contrato int primary key auto_increment,
    id_contrato int,
    id_uc int,
    FOREIGN KEY (id_contrato) REFERENCES contratos(id_contrato),
    FOREIGN KEY (id_uc) REFERENCES ucs(id_uc)
);

CREATE TABLE compensacao (
    id_compensacao int primary key auto_increment not null,
    id_uc int,
    referencia date,
    FOREIGN KEY (id_uc) REFERENCES ucs(id_uc)
);

CREATE TABLE itens_compensacao (
    id_itens_compensacao int primary key auto_increment not null,
    id_compensacao int,
    item varchar(255),
    posto_tarifario int not null,
    FOREIGN KEY (id_compensacao) REFERENCES compensacao(id_compensacao),
    FOREIGN KEY (posto_tarifario) REFERENCES aux_posto_tarifario(id_posto_tarifario)
);

CREATE TABLE geracao (
    id_geracao int primary key auto_increment,
    unidade int,
	mes_ano date,
	geracao decimal(10, 2),
    foreign key (unidade) references aux_usinas(id_usina)
);

CREATE TABLE aux_modalidade (
    id_modalidade int primary key auto_increment,
    descricao varchar(255)
);

CREATE TABLE bandeira (
	id_bandeira int primary key auto_increment,
    descricao varchar(255),
    tarifa_bandeira decimal(10,5) unsigned not null
);

CREATE TABLE aux_posto_tarifario (
    id_posto_tarifario int primary key auto_increment,
    descricao varchar(255)
);

CREATE TABLE aux_tipo_compensacao (
    id_tipo_compensacao int primary key auto_increment,
    descricao varchar(255)
);

CREATE TABLE aux_usinas (
    id_usina int primary key auto_increment,
    descricao varchar(255),
    potencia varchar(255),
    tipo varchar(255)
);

CREATE TABLE aux_status_fatura (
    id_status int primary key auto_increment,
    descricao varchar(255)
);

/*Insert tabela aux_status_fatura
* 1 - Pendente
* 2 - A Faturar
* 3 - Faturado
* 4 - Pago
*/
insert into aux_status_fatura values (null,'Pendente');
insert into aux_status_fatura values (null,'A Faturar');
insert into aux_status_fatura values (null,'Faturado');
insert into aux_status_fatura values (null,'Pago');
