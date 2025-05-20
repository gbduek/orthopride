--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: campaign_uploads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaign_uploads (
    id integer NOT NULL,
    uploaded_by text,
    uploaded_at timestamp without time zone DEFAULT now(),
    data jsonb,
    company_id integer,
    name character varying(50)
);


ALTER TABLE public.campaign_uploads OWNER TO postgres;

--
-- Name: campaign_uploads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaign_uploads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.campaign_uploads_id_seq OWNER TO postgres;

--
-- Name: campaign_uploads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaign_uploads_id_seq OWNED BY public.campaign_uploads.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(20),
    email character varying(20),
    pix character varying(200),
    insta character varying(200),
    token character varying(300),
    established_date date
);


ALTER TABLE public.company OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer DEFAULT nextval('public.events_id_seq'::regclass) NOT NULL,
    title character varying(100),
    start date,
    "end" time without time zone,
    color character varying(10),
    professional character varying(50),
    procedure character varying(50),
    event_type character varying(15),
    company_id integer
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    body text,
    from_number text NOT NULL,
    received_at timestamp without time zone DEFAULT now(),
    sent_me boolean,
    to_number text,
    media_type text,
    media_url text
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50),
    email character varying(100),
    password character varying(100),
    profile character varying(20),
    company_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: campaign_uploads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaign_uploads ALTER COLUMN id SET DEFAULT nextval('public.campaign_uploads_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: campaign_uploads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaign_uploads (id, uploaded_by, uploaded_at, data, company_id, name) FROM stdin;
18	admin	2025-05-14 23:14:25.635303	[{"nome": "Gabriel Duek", "email": "joao@example.com", "telefone": "5521995289559"}, {"nome": "Charles Duek", "email": "maria@example.com", "telefone": "5521995289586"}, {"nome": "Eduardo Kopelman", "email": "kopel@example.com", "telefone": "5521999139899"}, {"nome": "Guilherme Uram", "email": "guilherme@example.com", "telefone": "5521998551777"}]	1	\N
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, name, email, pix, insta, token, established_date) FROM stdin;
1	DevTeste	dev@dev.com	20807357723	mudar_depois	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2FybmFtZSI6IkFkbWluIiwicHJvZmlsZSI6ImFkbWluIiwiaWQiOjEsImNvbXBhbnlJZCI6MSwiaWF0IjoxNzQ3MDU1OTk1LCJleHAiOjE3NDcwNTY4OTV9.dImLfD1B-RnRcT3_HuBcpLPLUPnqynDt_WZ_rwwtB2o	2024-05-12
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, start, "end", color, professional, procedure, event_type, company_id) FROM stdin;
5	Juliano Soares	2025-05-19	\N	#f44336	Jonas	Cirurgico	cancelado	1
6	Roberto Meireles	2025-05-25	\N	#4caf50		Cirurgico	confirmado	1
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, body, from_number, received_at, sent_me, to_number, media_type, media_url) FROM stdin;
341	Oi	5521967062106@c.us	2025-05-15 00:42:31.602523	f	\N	\N	\N
342	teste	me	2025-05-15 00:42:39.98798	t	5521967062106@c.us	\N	\N
343	teste 2	me	2025-05-15 00:42:52.98734	t	5521967062106@c.us	\N	\N
344		5521967062106@c.us	2025-05-15 00:43:28.874383	f	\N	\N	\N
345	Oi	5521997901910@c.us	2025-05-15 00:49:38.338054	f	\N	\N	\N
346	teste	me	2025-05-15 00:49:47.520579	t	5521997901910@c.us	\N	\N
347	Recebi	5521997901910@c.us	2025-05-15 00:49:56.719336	f	\N	\N	\N
348		status@broadcast	2025-05-15 09:22:04.605358	f	\N	\N	\N
349		status@broadcast	2025-05-15 09:22:04.720731	f	\N	\N	\N
350		status@broadcast	2025-05-15 09:22:04.761728	f	\N	\N	\N
351		status@broadcast	2025-05-15 09:22:04.76229	f	\N	\N	\N
352	Eu to sentindo um pouco de cariocofobia no ar	120363040353231560@g.us	2025-05-15 09:23:03.723699	f	\N	\N	\N
353	Só não como peixe com carne. Mas acho que é mais fruto de uma estranheza. Um daqueles casos que o costume bateu com a minha natureza.	120363040353231560@g.us	2025-05-15 09:25:50.271565	f	\N	\N	\N
354	Mesmo quando eu não estava nem aí para judaísmo eu na comia...	120363040353231560@g.us	2025-05-15 09:26:39.248512	f	\N	\N	\N
355	É ao contrário. No SA ele escreve que não pode.\nE o Rema escreve que nunca ouviu falar nisso.	120363040353231560@g.us	2025-05-15 09:27:08.09425	f	\N	\N	\N
356	Realmente na própria culinária ocidental não é comum. Acho que já falei disso aqui, nos EUA, tem o famoso Surf n’ Turf, onde vem no mesmo prato um corte nobre de bife e algum fruto do mar ou peixe caro. É justamente uma iguaria, algo fora do padrão do que normalmente se consome	120363040353231560@g.us	2025-05-15 09:27:20.045581	f	\N	\N	\N
357	Eu acabo comendo bastante peixe com carne, mas não da maneira “convencional”, com duas proteínas disputando protagonismo, mas sim, por exemplo, refogando uns filés de anchova junto de uma cebola que eventualmente servirá de base para uma carne, para incrementar o umami	120363040353231560@g.us	2025-05-15 09:28:34.086974	f	\N	\N	\N
358	Ninguem come peixe com carne. Nao eh normal comer peixe com carne. Estamos nos referindo a trocar pratos e talheres, nao assar no mesmo forno, lavar a boca, etc...	120363040353231560@g.us	2025-05-15 09:28:42.861352	f	\N	\N	\N
359	Sobre aquilo que a gnt tava falando pro Gabriel sobre morar fora	5521971234999-1401590219@g.us	2025-05-15 09:29:28.746546	f	\N	\N	\N
360	Ah, isso aí não! Então vou votar lá... Kkkk	120363040353231560@g.us	2025-05-15 09:29:34.944643	f	\N	\N	\N
361	Eu já senti muito isso. E vdd	5521971234999-1401590219@g.us	2025-05-15 09:30:01.826328	f	\N	\N	\N
362	Avisei, valeu bro	5521999139899@c.us	2025-05-15 09:30:02.107375	f	\N	\N	\N
363	🤣🤣🤣🤣	5521971234999-1401590219@g.us	2025-05-15 09:30:17.9195	f	\N	\N	\N
364		5521971234999-1401590219@g.us	2025-05-15 09:31:06.53709	f	\N	\N	\N
365		5521971234999-1401590219@g.us	2025-05-15 09:32:03.335045	f	\N	\N	\N
366		5521971234999-1401590219@g.us	2025-05-15 09:32:37.027792	f	\N	\N	\N
367	Eu vou num restaurant mexicano otimo que tem aqui em petah tikvah. Ali eles servem uma plata que vem peixe, frango e carne. Mas nao se come junto. \nTem quem ache que isso nao pode ser kasher.	120363040353231560@g.us	2025-05-15 09:33:54.723011	f	\N	\N	\N
368	Kkkkkk mas pensa que Londres vai resolver o problema. O problema está com ela. Vai ser deprimida em qq lugar.	5521972559404@c.us	2025-05-15 09:34:13.140694	f	\N	\N	\N
369	N existe achar Londre depressivo quando do teu lado tem 500 mendigos mijando no asfalto e usando crack (do lado da sinagoga do stauber))	me	2025-05-15 09:35:34.606958	t	5521972559404@c.us	\N	\N
370	@5521982502601 como a gente explica que todo o sistema religioso ta invalidando o que o rabino la em cima falou sobre pedofilos e estupradores?\n\nhttps://www.jpost.com/breaking-news/article-853985	120363040353231560@g.us	2025-05-15 09:37:03.215966	f	\N	\N	\N
371	Pizza com abacaxi é morte por açoitamento. Meforash no Talmud Massekhet d'iltalina	120363040353231560@g.us	2025-05-15 09:37:59.159161	f	\N	\N	\N
372		120363040353231560@g.us	2025-05-15 09:42:27.283803	f	\N	\N	\N
373	Ta meforash que Brasil foi um lugar não tocado pelo diluvio	120363040353231560@g.us	2025-05-15 09:42:27.374509	f	\N	\N	\N
374	Aí já é crime de guerra	120363040353231560@g.us	2025-05-15 09:42:32.343747	f	\N	\N	\N
375	Alias, o molho worcestershire eh fundamental para fazer a receita de croquete da Casa do Alemao. Tem gente que se priva de comer somente porque um percentual minimo de peixe no molho.	120363040353231560@g.us	2025-05-15 09:46:04.803127	f	\N	\N	\N
376	Vai de puc hj?	me	2025-05-15 09:47:26.356609	t	5521999139899@c.us	\N	\N
377	Só 13h	5521999139899@c.us	2025-05-15 09:47:39.497111	f	\N	\N	\N
378	Mano olha as coisas q te mandei no Instagram KKKKKKK	5521999139899@c.us	2025-05-15 09:48:56.594341	f	\N	\N	\N
379	Ye	5521999139899@c.us	2025-05-15 09:49:09.825175	f	\N	\N	\N
380	Vai pra Manaus e o caboco vai ter um pedaço de tambaqui e churrasco no Prato @972524518574 me ajuda aqui	120363040353231560@g.us	2025-05-15 09:50:45.435663	f	\N	\N	\N
381	Ótimo! Vou pegar para minha aula de Yehoshua	120363040353231560@g.us	2025-05-15 09:50:52.258269	f	\N	\N	\N
382	Teste	me	2025-05-15 09:53:38.787317	t	5521995289559@c.us	\N	\N
383	Teste	me	2025-05-15 09:53:38.805174	t	5521995289586@c.us	\N	\N
384	Teste	me	2025-05-15 09:53:39.400083	t	5521999139899@c.us	\N	\N
385	Teste	me	2025-05-15 09:53:39.413152	t	5521998551777@c.us	\N	\N
386	slifkin auth zohar.pdf	120363040353231560@g.us	2025-05-15 09:54:13.808362	f	\N	\N	\N
387	KKKKKKKKK mn foi mal mas to usando os contatos de vcs de cobaia	me	2025-05-15 09:54:18.070817	t	5521999139899@c.us	\N	\N
388	Rlx	5521999139899@c.us	2025-05-15 09:54:26.068697	f	\N	\N	\N
389	o guilherme simplesmente mandou "testa como girar na minha piroca sem gritar"	me	2025-05-15 09:54:49.407751	t	5521999139899@c.us	\N	\N
390	O Berland tem uma seita que segue ele, mas não é todo sistema religioso	120363040353231560@g.us	2025-05-15 09:54:55.7	f	\N	\N	\N
391	KKKKKKKKKKKKKK	5521999139899@c.us	2025-05-15 09:55:02.21284	f	\N	\N	\N
392	Bom-dia estarei na puc hoje almoço às 12:30 quem vem ?\n1-\n2-	5521989319917-1552011771@g.us	2025-05-15 09:55:48.794361	f	\N	\N	\N
393	Quem vai dar kavod a ele não é só a seita.	120363040353231560@g.us	2025-05-15 09:56:34.865583	f	\N	\N	\N
394	o meir porush que escondeu a lista é o representante na politica das maiores chassidut - principalmente o rebbe de gur	120363040353231560@g.us	2025-05-15 09:58:27.158558	f	\N	\N	\N
395	vergonha vergonha vergonha	120363040353231560@g.us	2025-05-15 09:59:02.912941	f	\N	\N	\N
396	Bom-dia estarei na puc hoje almoço às 12:30 quem vem ?\n1- victor s\n2-	5521989319917-1552011771@g.us	2025-05-15 09:59:20.944114	f	\N	\N	\N
397	Verdade. Exagerei.\neh so as hassidut de Bohush, Boyan, Vizhnitz, Breslov, Belz, Satmar, Ger, Toldot Aharon, Toldot Avraham Yitzchak, Karlin-Stolin, Skver, Nadvorna, Sanz, Spinka, Slonim que convidam ele todos os anos para acender. Mas os resto do sistema eh contra	120363040353231560@g.us	2025-05-15 10:00:36.889353	f	\N	\N	\N
398	Eles alegam que ele é inocente?	120363040353231560@g.us	2025-05-15 10:01:38.533421	f	\N	\N	\N
399	https://t.me/amitsegal/46748	120363040353231560@g.us	2025-05-15 10:02:03.438682	f	\N	\N	\N
400	o truque é não falar do assunto	120363040353231560@g.us	2025-05-15 10:02:12.898554	f	\N	\N	\N
401	Sem falar que quem curte comer carne e peixe no mesmo prato? E ainda eh um costume 🤦🏻‍♂️	120363040353231560@g.us	2025-05-15 10:13:46.16445	f	\N	\N	\N
402	Perfume Armaf Club De Nuit Intense Eau De Toilette 105ml\n\n~De R$ 499,99~\n*Por R$ 246,42*\n\n`🔖Utilize o Cupom: BELEZA15`\n\n🛒 Link do Produto ⤵️\nhttps://mercadolivre.com/sec/26HoJmr \n\nNo ML vendido por loja oficial!!!	120363226050615957@g.us	2025-05-15 10:13:46.187539	f	\N	\N	\N
403	Ele assumiu parte da culpa.\nAi voce vai encontrar algumas posturas:\n - Se Disse que fez teshuva, ta 0 km\n - Os chilonim tzioinim inventaram\n - Ele sim fez, mas existem motivos espirituais.\n - Eu nao comento sobra a vida das pessoas porque isso eh lashon hara	120363040353231560@g.us	2025-05-15 10:13:46.278614	f	\N	\N	\N
404	Kit Primeira Rotina Skincare Principia\n\n~De R$ 149,99~\n*Por R$ 106,21*\n\n`🔖Utilize o Cupom: BELEZA15`\n\n🛒 Link do Produto ⤵️\nhttps://mercadolivre.com/sec/1VuzEEg \n\nNo ML vendido pela própria Principia!!!	120363226050615957@g.us	2025-05-15 10:13:46.354441	f	\N	\N	\N
405	Tênis Puma Park Lifestyle Easy Masculino *(3 CORES)*\n\n~De R$ 499,99~\n*Por R$ 323,99 no Pix*\n\n`🔖Utilize o Cupom: MENOS10`\n\n🛒 Link do Produto ⤵️\nhttps://click.centauro.com.br/13Nl/9hwtqbwg \n\nNa Centauro!!!	120363226050615957@g.us	2025-05-15 10:15:07.602933	f	\N	\N	\N
408		5521999139899@c.us	2025-05-15 10:16:32.474745	f	\N	\N	\N
409	.	me	2025-05-15 10:18:49.439835	t	5521999139899@c.us	application/pdf	/uploads/2d26f37c5ff59fb136607a80d9ef319b
410	Tênis De Basquete Masculino Swish Under Armour *(3 CORES)*\n\n~De R$ 599,99~\n*Por R$ 299,00*\n\n🛒 Link do Produto ⤵️\nhttps://mercadolivre.com/sec/2ZU6pA2 \n\nNo ML vendido por loja oficial!!!	120363226050615957@g.us	2025-05-15 10:19:14.194162	f	\N	\N	\N
411	Perfume Attracione Men by attracione 25ml\n\n~De R$ 249,99~\n*Por R$ 110,06*\n\n`🔖Utilize o Cupom: BELEZA15`\n\n🛒 Link do Produto ⤵️\nhttps://mercadolivre.com/sec/19rUvnA \n\nNo ML vendido por loja oficial!!!	120363226050615957@g.us	2025-05-15 10:21:22.361444	f	\N	\N	\N
412	Vendo syon back masc e fem	120363047031361745@g.us	2025-05-15 10:24:37.048222	f	\N	\N	\N
413	*EVENTOS DO FINAL DE SEMANA*\n🔸 *CÓDIGO GODOY*\n🔸 _LINKS JÁ COM DESCONTO_\n\nSPOT • Aldeia\n📍 Parque dos Patins\n🗓️ 15.05 \n🎟️ https://embedstore.ingresse.com/tickets/www.ingresse.com/event/82812?passkey=GODOY\n✍️ https://forms.gle/yX1FBorppeApMst47\n\nBSQNT\n📍 Bosque Bar\n🗓 15.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81400?passkey=GODOY\n✍️ https://forms.gle/tuKbvZqP45pzrFax9\n\nInCosta\n📍 Bosque Bar\n🗓 16.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81160?passkey=GODOY\n✍️ https://forms.gle/a3FUDYXNVRk8bbJL8\n\nCaza Lagoa Sexta\n📍 Parque dos Patins\n🗓️ 16.05\n🎟️ https://zig.tickets/eventos/sexta-em-caza-1605?cupom=GODOY\n✍️ https://forms.gle/tKVaGUBxXEtFQsYw5\n\nAldeia Sábado\n📍 Parque dos Patins\n🗓️ 17.05\n🎟️ https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81735?passkey=GODOY\n✍️ https://forms.gle/BcsdL8VNeMJPCwGAA\n\nSignos\n📍 Bosque Bar\n🗓 17.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81426?passkey=GODOY\n✍️ https://forms.gle/TaZcSb7tLN5TfjsM7\n\nCaza Lagoa Sabado\n📍 Parque dos Patins\n🗓️ 17.05\n🎟️ https://zig.tickets/eventos/caza-lagoa-sabado-1705?cupom=GODOY\n✍️ https://forms.gle/TA8GMRy9oguBn1UdA\n\nCapital do Samba\n📍 Marina da Glória\n🗓 17.05 e 18.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/79232?passkey=GODOY\n\nBaile do Syon\n📍 Sao Paulo\n🗓 17.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81742?passkey=godoy\n\nSambinha do Bosque\n📍 Bosque Bar\n🗓 18.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81488?passkey=GODOY\n✍️ https://forms.gle/AdSbNH5UNmzRTj5E7\n\n🔸 *Mais informações:* http://linktr.ee/eventoscodgodoy	120363044872758702@g.us	2025-05-15 10:25:57.566523	f	\N	\N	\N
414	*EVENTOS DO FINAL DE SEMANA*\n🔸 *CÓDIGO GODOY*\n🔸 _LINKS JÁ COM DESCONTO_\n\nSPOT • Aldeia\n📍 Parque dos Patins\n🗓️ 15.05 \n🎟️ https://embedstore.ingresse.com/tickets/www.ingresse.com/event/82812?passkey=GODOY\n✍️ https://forms.gle/yX1FBorppeApMst47\n\nBSQNT\n📍 Bosque Bar\n🗓 15.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81400?passkey=GODOY\n✍️ https://forms.gle/tuKbvZqP45pzrFax9\n\nInCosta\n📍 Bosque Bar\n🗓 16.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81160?passkey=GODOY\n✍️ https://forms.gle/a3FUDYXNVRk8bbJL8\n\nCaza Lagoa Sexta\n📍 Parque dos Patins\n🗓️ 16.05\n🎟️ https://zig.tickets/eventos/sexta-em-caza-1605?cupom=GODOY\n✍️ https://forms.gle/tKVaGUBxXEtFQsYw5\n\nAldeia Sábado\n📍 Parque dos Patins\n🗓️ 17.05\n🎟️ https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81735?passkey=GODOY\n✍️ https://forms.gle/BcsdL8VNeMJPCwGAA\n\nSignos\n📍 Bosque Bar\n🗓 17.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81426?passkey=GODOY\n✍️ https://forms.gle/TaZcSb7tLN5TfjsM7\n\nCaza Lagoa Sabado\n📍 Parque dos Patins\n🗓️ 17.05\n🎟️ https://zig.tickets/eventos/caza-lagoa-sabado-1705?cupom=GODOY\n✍️ https://forms.gle/TA8GMRy9oguBn1UdA\n\nCapital do Samba\n📍 Marina da Glória\n🗓 17.05 e 18.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/79232?passkey=GODOY\n\nBaile do Syon\n📍 Sao Paulo\n🗓 17.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81742?passkey=godoy\n\nSambinha do Bosque\n📍 Bosque Bar\n🗓 18.05\n🎟 https://embedstore.ingresse.com/tickets/www.ingresse.com/event/81488?passkey=GODOY\n✍️ https://forms.gle/AdSbNH5UNmzRTj5E7\n\n🔸 *Mais informações:* http://linktr.ee/eventoscodgodoy	120363314222823089@g.us	2025-05-15 10:26:36.233488	f	\N	\N	\N
415	Camiseta do Los Angeles Lakers NBA Masculina Core N0652\n\n~De R$ 99,99~\n*Por R$ 59,84 no Pix*\n\n`🔖Utilize o Cupom: MENOS10`\n\n🛒 Link do Produto ⤵️\nhttps://click.centauro.com.br/13Nl/9odyjfuo\n\nNa Centauro!!!	120363226050615957@g.us	2025-05-15 10:28:07.051769	f	\N	\N	\N
416	Samsung Smart TV 50" QLED 4K 50Q60D - Tecnologia de Pontos Quânticos, Design AirSlim\n\n~De R$ 3.099,00~\n*Por R$ 2.349,00*\n\n🛒 Link do Produto ⤵️\nhttps://amzn.to/3H8CgI8\n\nNa Amazon!!!	120363226050615957@g.us	2025-05-15 10:30:07.629071	f	\N	\N	\N
417	.	me	2025-05-15 10:33:30.190453	t	5521999139899@c.us	\N	\N
418	então	120363347936337902@g.us	2025-05-15 10:36:43.603975	f	\N	\N	\N
419	pq  mundo surta sobre?	120363347936337902@g.us	2025-05-15 10:36:56.91021	f	\N	\N	\N
420	pra mim é aquela velha historia de querer ser muito pious	120363347936337902@g.us	2025-05-15 10:37:10.562925	f	\N	\N	\N
421	.	me	2025-05-15 10:39:31.557223	t	5521999139899@c.us	\N	\N
422	.	me	2025-05-15 10:39:37.941009	t	5521999139899@c.us	\N	\N
423	Nao é ao contrário?	120363040353231560@g.us	2025-05-15 10:39:45.833016	f	\N	\N	\N
424	Ultima vez wue discutinisso com rabino ele disse que como foi colocado no SA a gente respeita e nao come	120363040353231560@g.us	2025-05-15 10:40:22.86194	f	\N	\N	\N
425	.	me	2025-05-15 10:40:49.524202	t	5521999139899@c.us	\N	\N
426	.	me	2025-05-15 10:54:40.429914	t	5521999139899@c.us	\N	\N
427	faz um favor? me manda uma foto	me	2025-05-15 10:57:14.851966	t	5521999139899@c.us	\N	\N
428		5521999139899@c.us	2025-05-15 10:57:30.166763	f	\N	\N	\N
429		120363040353231560@g.us	2025-05-15 10:57:40.918325	f	\N	\N	\N
430	צריך להעביר בגד למירון  נכד בן שנה של חבר שצריך רפואה\nמי נוסע ויכול ?	120363040353231560@g.us	2025-05-15 10:57:41.203746	f	\N	\N	\N
431		5521999139899@c.us	2025-05-15 10:57:41.66203	f	\N	\N	\N
432	lab baomer n tem limites haha	120363040353231560@g.us	2025-05-15 10:57:55.192809	f	\N	\N	\N
433	Qdo puder vê pra mim Qto passou o rio card no brt. \nNão tem pressa qdo puder	5521972559404@c.us	2025-05-15 10:59:39.606095	f	\N	\N	\N
434	FILHODAPUTA	5521998551777@c.us	2025-05-15 11:00:12.625422	f	\N	\N	\N
435	KKKKKKKK	5521998551777@c.us	2025-05-15 11:00:14.733889	f	\N	\N	\N
436	pizza com abacaxi eh show..\neh estranho, mas o gosto eh otimo haha\n\ncomo o dani falou, nada ganha dos rodizios de sushi do br..	120363040353231560@g.us	2025-05-15 11:00:37.417582	f	\N	\N	\N
437	*SOL DA MEIA NOITE 🌔*\n\n*🚨LOTE VIRA HOJE!!*\n\n🗓️ Sábado, 24 de Maio\n🍸 Full Open Bar Premium\n📍 Zona Sul // JOÁ\n\n*SIMO NOT SIMON* // SOL SET // KONSK // SARDINHA // ZAG // ALUDE // VOIAK // MAGHA\n\n_AFRO HOUSE • FUNK • OPEN FORMAT • BRASILIDADES_\n\n*Link Com Desconto:*\n🎟️ https://www.sympla.com.br/evento/sol-da-meia-noite--open-bar-premium/2913634?d=GODOY	120363314222823089@g.us	2025-05-15 11:03:01.672047	f	\N	\N	\N
438	Obrigado. Sempre pensei que era ao contrário.	120363040353231560@g.us	2025-05-15 11:03:32.222947	f	\N	\N	\N
439	*SOL DA MEIA NOITE 🌔*\n\n*🚨LOTE VIRA HOJE!!*\n\n🗓️ Sábado, 24 de Maio\n🍸 Full Open Bar Premium\n📍 Zona Sul // JOÁ\n\n*SIMO NOT SIMON* // SOL SET // KONSK // SARDINHA // ZAG // ALUDE // VOIAK // MAGHA\n\n_AFRO HOUSE • FUNK • OPEN FORMAT • BRASILIDADES_\n\n*Link Com Desconto:*\n🎟️ https://www.sympla.com.br/evento/sol-da-meia-noite--open-bar-premium/2913634?d=GODOY	120363044872758702@g.us	2025-05-15 11:03:34.663978	f	\N	\N	\N
440	akkkkkkkkkk ela tava mto longe de mim	5521993613372@c.us	2025-05-15 11:04:03.432853	f	\N	\N	\N
441	Mas q ridículo papo reto	5521993613372@c.us	2025-05-15 11:04:07.068949	f	\N	\N	\N
442	imunda	me	2025-05-15 11:04:44.929036	t	5521993613372@c.us	\N	\N
443	Bom-dia estarei na puc hoje almoço às 12:30 quem vem ?\n1- victor s\n2-Gabriel\n3-Danny	5521989319917-1552011771@g.us	2025-05-15 11:10:41.438094	f	\N	\N	\N
444	אֲבָל דָּגִים וַחֲגָבִים, אֵין בָּהֶם אִסוּר, אֲפִלּוּ מִדְּרַבָּנָן	120363040353231560@g.us	2025-05-15 11:10:41.842605	f	\N	\N	\N
445	shulchan aruch yd 87:3	120363040353231560@g.us	2025-05-15 11:10:55.922373	f	\N	\N	\N
446	https://turshulchanarukh.alhatorah.org/Full/Yoreh_Deah/87.3#e0n6	120363040353231560@g.us	2025-05-15 11:11:07.621404	f	\N	\N	\N
448	?	5521972559404@c.us	2025-05-15 11:11:57.131587	f	\N	\N	\N
449	סימן צה סעיף א	120363040353231560@g.us	2025-05-15 11:12:23.274341	f	\N	\N	\N
450	onde fala do nat bar nat	120363040353231560@g.us	2025-05-15 11:12:34.250125	f	\N	\N	\N
451	.	me	2025-05-15 11:14:35.920015	t	5521972559404@c.us	\N	\N
452	Bom-dia estarei na puc hoje almoço às 12:30 quem vem ?\n1- victor s\n2-Gabriel\n3-Danny\n4- yossi	5521989319917-1552011771@g.us	2025-05-15 11:15:14.399611	f	\N	\N	\N
453	\N	me	2025-05-15 11:16:20.671453	t	5521999139899@c.us	image/png	./uploads/Capture-1747318580438.PNG
454	Opaaa	5521999139899@c.us	2025-05-15 11:16:36.3638	f	\N	\N	\N
455	Isso foi automático tbm? Kk	5521999139899@c.us	2025-05-15 11:16:42.524573	f	\N	\N	\N
456	Pika	5521999139899@c.us	2025-05-15 11:16:49.740835	f	\N	\N	\N
457	Q eh isso?	120363025532043152@g.us	2025-05-15 11:18:12.696978	f	\N	\N	\N
458	\N	me	2025-05-15 11:18:16.613907	t	5521972559404@c.us	image/png	./uploads/Capture-1747318696588.PNG
459	a origem do costume sefaradi de nao comer peixe com leite é o beit yossef no siman 87\n\npor acaso nao achei no al hatora mas tem a resposta do darchei moshe\n\n(ד) ולא ראיתי מימי נזהרין בזה וגם בא״ח סימן קע״ג אינו אלא שלא לאכלו בבשר משום סכנה אבל בחלב שרי ועי״ל סימן קי״ו ולכן נראה שנתערב להרב בשר בחלב:	120363040353231560@g.us	2025-05-15 11:19:52.289149	f	\N	\N	\N
460	o ponto não é ciência ter provado ou desprovado, mas o fato dessa "proibição" não ser uma legislação. \nmaim hacharonim tb foi instituído "por sacaná", mas permanece obrigatório. \n(exceto nos casos em que a própria legislação defini o alcance, como do "veneno de cobra no copo" onde não tem cobra).	120363040353231560@g.us	2025-05-15 11:20:07.613692	f	\N	\N	\N
461	mas se a ciência dissesse que faz mal mesmo nao sendo legislação seria proibido	120363040353231560@g.us	2025-05-15 11:20:54.319887	f	\N	\N	\N
462	Novos bugs relatados para Plataforma Produção - Saulo!\n\n🤖 Relatório bugs GPSMed  \n        \n📍 PLATAFORMA PRODUÇÃO: 1 BUG **CRÍTICO** (documento já no formato novo)\n      ❗ Registros consideram sexo do médico acessando o paciente e não o sexod o paciente acessado\n\n 📎 BUGS PLATAFORMA PROD 15/05/2025:\n      https://docs.google.com/presentation/d/1KStbqE1ge7aXOq1tlP9bgj9BUUIfiwOqM3NQGOiGKgI/edit?slide=id.p#slide=id.p\n\n🆕 PLATAFORMA NOVA: 0 BUGS\n      ✅ Sem bugs pendentes\n\n📱 APP MOBILE: 8 BUGS -> 6 Abril + 2 Maio (Ainda documento antigo, optei por não mudar ainda para nao confundir o Gabriel)  \n\n      🟨 Bugs Abril Mobile:  \n      ❗ Refresh em diários acontece duplicado  \n      ❗ Informações na home sem estado de loading, aparecem zeradas até carregar  \n      ❗ Ao receber nova solicitação, não há indicação no botão para tela de permissões  \n\n            possivelmente relacionados:\n      ❗ Não foi possível aprovar solicitação de permissão  \n      ❗ Erro ao acessar perfil de médico que fez solicitação  \n\n\n      🟩 Bugs Maio Mobile:  \n      ❗ Dados incoerentes no formulário de aceitar permissão  \n      ❗ Solicitação de permissão só apareceu para o cliente após relogar no app \n\n📎 BUGS ABRIL 2025:\n\nhttps://docs.google.com/presentation/d/1kbapFirXBC5IB0omkSoe7BSbQZnjizaq3P-hkgHL0zQ/edit?slide=id.g34a8925035b_0_25#slide=id.g34a8925035b_0_25 \n\n📎 BUGS MAIO 2025:\n     https://docs.google.com/presentation/d/1uL1SFU0yLdciH5ZxnLabrtYKqnc5XyA1gVh1OUJc3eU/edit?slide=id.g355686676ce_0_8#slide=id.g355686676ce_0_8\n\nAo resolverem bugs, marcarem no slide respectivo com o checkmark e adicionar abaixo print da solução, por favor.\n\n@5521986191969	120363322038718089@g.us	2025-05-15 11:21:25.251705	f	\N	\N	\N
463	Dá uma olhada no pimsleur	120363021228146072@g.us	2025-05-15 11:21:55.496548	f	\N	\N	\N
464	Melhor que o duo	120363021228146072@g.us	2025-05-15 11:22:05.256199	f	\N	\N	\N
465	Só eh mto caro	120363021228146072@g.us	2025-05-15 11:22:11.005285	f	\N	\N	\N
466	mas sim esse é o meu argumento: \n\nimagina que o beit yossef achasse que realmente faz mal e nao é taut sofer - pq escrever no shulchan aruch ein bahem issur afilu miderabanan e nao mencionar a periculosidade?\n\nexatamente pq ele queria reforçar que é uma lei medica e nao uma takana deraban por causa de sakana	120363040353231560@g.us	2025-05-15 11:22:23.417141	f	\N	\N	\N
467	Primeiro que acho que existe uma diferença entre gerar perigo e "fazer mal". \nSegundo, ainda que fosse a mesma coisa, seria proibido por outro motivo... e não sei se chegaria a ser "proibido".\n\nCiência diz um monte de coisa "faz mal"... que fumar, açucar, não se masturbar, etc...	120363040353231560@g.us	2025-05-15 11:22:23.58284	f	\N	\N	\N
468	Vou entrar no italki agr tb	120363021228146072@g.us	2025-05-15 11:22:25.559708	f	\N	\N	\N
469	\N	me	2025-05-15 11:22:27.175424	t	5521972559404@c.us	image/png	./uploads/Capture-1747318947135.PNG
470	exato - e se algo faz mal chamira sakana meissura	120363040353231560@g.us	2025-05-15 11:23:00.202321	f	\N	\N	\N
471	o que voce quer argumentar é que sakana é so se o cara passa mal na hora?	120363040353231560@g.us	2025-05-15 11:23:45.809605	f	\N	\N	\N
472	tenho dúvidas se o bet yossef pretendia ser tão técnico assim, como foi o rambam, por exemplo. \nNo SA, por exemplo, em halachot de shabbat, ele mistura mutar com patur, chayav com assur, etc...	120363040353231560@g.us	2025-05-15 11:23:50.101292	f	\N	\N	\N
473	\N	me	2025-05-15 11:24:01.172563	t	5521972559404@c.us	image/png	../uploads/Capture-1747319041112.PNG
474	nesse caso ele muda o lashon do tur - o tur diz que é mutar e ele diz que ein issur afilu miderabanan	120363040353231560@g.us	2025-05-15 11:24:37.76943	f	\N	\N	\N
475	só levantei a bola... nao tenho algo pensado.\nMas acho que "faz mal" não seria suficiente para proibir. Açúcar faz mal.. mas ngm cogita proibir.\n\nE qual seria a proibição base para algo que gera perigo? tem?\n\nTem de não comer algo repugnante. Entra na mesma?	120363040353231560@g.us	2025-05-15 11:25:00.796739	f	\N	\N	\N
476	Olha o hebreu	120363021228146072@g.us	2025-05-15 11:25:17.205243	f	\N	\N	\N
477	Acho que agora passou integrada. Depois vê pra mim o total que eu gastei de brt + metrô.	5521972559404@c.us	2025-05-15 11:25:40.295337	f	\N	\N	\N
478	venishmartem meod lenafshotechem	120363040353231560@g.us	2025-05-15 11:25:42.418108	f	\N	\N	\N
479	Bom-dia estarei na puc hoje almoço às 12:30 quem vem ?\n1- victor s\n2-Gabriel\n3-Danny\n4- yossi\n5-yan	5521989319917-1552011771@g.us	2025-05-15 11:25:47.054422	f	\N	\N	\N
480	Q horas vc sai da puc hj?	5521993613372@c.us	2025-05-15 11:26:40.230982	f	\N	\N	\N
481	Ta de carro?	5521993613372@c.us	2025-05-15 11:27:00.943181	f	\N	\N	\N
482	to em reunião	5521995289586@c.us	2025-05-15 11:27:13.350297	f	\N	\N	\N
483	isso é um passuc. Nao serve como base para uma proibição.	120363040353231560@g.us	2025-05-15 11:27:13.705041	f	\N	\N	\N
484	Posso pegar carona?	5521993613372@c.us	2025-05-15 11:27:13.830726	f	\N	\N	\N
485	Por favor	5521993613372@c.us	2025-05-15 11:27:15.022462	f	\N	\N	\N
486	https://shulchanaruchharav.com/halacha/vinishmartem-meod-lenafshoseichem-the-meaning-of-the-verse/\n\ndei um google e achei isso	120363040353231560@g.us	2025-05-15 11:27:16.598451	f	\N	\N	\N
487	até pq esse passuc, em geral, se refere as mitsvot passadas antes ou depois no texto	120363040353231560@g.us	2025-05-15 11:27:36.226101	f	\N	\N	\N
488	Por mim sem problemas	5521993613372@c.us	2025-05-15 11:27:41.976993	f	\N	\N	\N
489	E por vc?	5521993613372@c.us	2025-05-15 11:27:43.386349	f	\N	\N	\N
490	o passuk tem tesse significado na guemara em berachot - mas nao foi legislado pelo rambam ou shulchan aruch	120363040353231560@g.us	2025-05-15 11:27:46.530061	f	\N	\N	\N
491	Ok	5521993613372@c.us	2025-05-15 11:28:11.026087	f	\N	\N	\N
492	dps me avisa pq tenho que sair daqui na hr	me	2025-05-15 11:30:39.34429	t	5521995289586@c.us	\N	\N
493	https://turshulchanarukh.alhatorah.org/Full/Yoreh_Deah/116.1#e0n6	120363040353231560@g.us	2025-05-15 11:30:50.424753	f	\N	\N	\N
494	\N	me	2025-05-15 11:32:44.612061	t	5521972559404@c.us	application/pdf	../uploads/ComposiÃ§Ã£o genÃ©tica - MyHeritage-1747319562846.pdf
495	(ד) אחד הגג ואחד כל דבר שיש בו סכנה וראוי שייכשל בו אדם וימות, כגון שהיתה לו באר או בור בחצירו, בין שיש בהן מים בין שאין בהן מים, חייב לעשות להן חוליה גבוהה עשרה טפחים, או לעשות להן כיסוי, כדי שלא יפול בה אדם וימות:\nוכן, כל מכשול שיש בו סכנת נפשות, מצות עשה להסירו ולהישמר ממנו ולהיזהר בדבר יפה יפה, שנאמר ״השמר לך ושמור נפשך״ (דברים ד׳:ט׳). ואם לא הסיר, והניח המכשולות המביאין לידי סכנה, ביטל מצות עשה, ועבר ב״לא תשים דמים״:	120363040353231560@g.us	2025-05-15 11:32:45.722996	f	\N	\N	\N
496	Como a gente consegue fazer essa distinção ("legislação" e não legislação)? Tinha isso com queijo também, né? Quando hoje a gente sabe que muitas vezes não se usa coalho animal.	120363040353231560@g.us	2025-05-15 11:33:20.293887	f	\N	\N	\N
497		120363040353231560@g.us	2025-05-15 11:34:00.275603	f	\N	\N	\N
498	eu acho que o Samuel esta se referindo a ser um decreto do sanhedrin	120363040353231560@g.us	2025-05-15 11:34:36.313696	f	\N	\N	\N
499	\N	me	2025-05-15 11:34:39.27663	t	5521999139899@c.us	image/png	../uploads/download-1747319678082.png
500		120363347936337902@g.us	2025-05-15 11:34:40.9321	f	\N	\N	\N
501	@5521995289559 @5521967041909 minha teoria	120363347936337902@g.us	2025-05-15 11:34:51.250442	f	\N	\N	\N
502	Cupix?	5521999139899@c.us	2025-05-15 11:35:02.453657	f	\N	\N	\N
503	no caso do peixe com leite o assunto aparece mais de 1000 anos apos o ultimo sanhedrin	120363040353231560@g.us	2025-05-15 11:35:26.852907	f	\N	\N	\N
504	Nem sei q poha eh essa	120363021228146072@g.us	2025-05-15 11:35:29.552536	f	\N	\N	\N
505	Entendi. Mas é que nunca fui atento a essa questão sobre como essa distinção se dá tecnicamente. São termos usados no texto da guemara? É pergunta boba mesmo. Sou garoto ainda mesmo nesse assunto.	120363040353231560@g.us	2025-05-15 11:36:06.683666	f	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, profile, company_id, created_at) FROM stdin;
1	Dev Zenn	dev@dev.com	123456	admin	1	2025-05-12 15:34:37.228598
2	Jonas Eps	jonaeps@gmail.com	123456	admin	1	2025-05-13 18:42:00.861928
\.


--
-- Name: campaign_uploads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaign_uploads_id_seq', 18, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 6, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 505, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: campaign_uploads campaign_uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaign_uploads
    ADD CONSTRAINT campaign_uploads_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: campaign_uploads campaign_uploads_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaign_uploads
    ADD CONSTRAINT campaign_uploads_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: events events_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- PostgreSQL database dump complete
--

