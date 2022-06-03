import {
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ButtonComponent,
  InputTextBox,
  PageWrapper,
  SelectComponent,
  SelectComponentQuantity,
} from "components";
import { getCsrfToken, getSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { logger } from "utils/logger";

export default function TermoDeResponsabilidade() {
  const ref = useRef();
  const [sbHeight, setSbHeight] = useState(hgt);
  const hgt = ref.current ? ref.current.offsetHeight+270: 0
  const color = "blue.600";
  const [menuMotivoButtonLabel, menuMotivoSet] = useState("Selecione...");
  const [menuLocalidadeButtonLabel, menuLocalidadeSet] =
    useState("Selecione...");
  const [menuTecnicoButtonLabel, menuTecnicoSet] = useState("Selecione...");

  const [tipoEquipButtonLabel, tipoEquipSet] = useState("Selecione...");
  const [modeloEquipButtonLabel, modeloEquipSet] = useState("Selecione...");
  const [perifericoCheck, setPerifericoCheck] = useState(false);
  const [recolhidoCheck, setRecolhidoCheck] = useState(false);
  const [perifericoCount, setPerifericoCount] = useState(0);
  const [perifericoHeadingVisibility, setPerifericoHeadingVisibility] =
    useState("hidden");
  const [perifericosOutput, updatePerifericosOutput] = useState([
    { id: 0, nome: "default" },
  ]);

  const [motivoMessage, setMotivoMessage] = useState("");
  const [tipoEquipOldButtonLabel, tipoEquipOldSet] = useState("Selecione...");
  const [modeloEquipOldButtonLabel, modeloEquipOldSet] =
    useState("Selecione...");
  const [perifericoOldCheck, setPerifericoOldCheck] = useState(false);
  const [perifericoOldCount, setPerifericoOldCount] = useState(0);
  const [perifericoOldHeadingVisibility, setPerifericoOldHeadingVisibility] =
    useState("hidden");
  const [perifericosOldOutput, updatePerifericosOldOutput] = useState([
    { id: 0, nome: "default" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const [acceptCheck, setAcceptCheck] = useState(false);

  const motivoOptions = [
    {
      value: "Empréstimo",
    },
    {
      value: "Novo Ingresso",
    },
    {
      value: "Substituição por Avaria",
    },
    {
      value: "Projeto",
    },
    {
      value: "Perda, Furto ou Roubo",
    },
    {
      value: "Renovação Tecnológica",
    },
  ];

  const localidadeOptions = [
    {
      iata: "ACD",
      nome: "Academia LATAM",
      iata_nome: "ACD - Academia Latam",
    },
    {
      iata: "H02",
      nome: "Hangar 02",
      iata_nome: "H02 - Hangar 02",
    },
    {
      iata: "H05",
      nome: "Hangar 05",
      iata_nome: "H05 - Hangar 05",
    },
    {
      iata: "QSC",
      nome: "MRO São Carlos",
      iata_nome: "QSC - MRO São Carlos",
    },
  ];

  const tecnicoOptions = [
    {
      nome: "Daniel",
    },
    {
      nome: "Alexandre",
    },
    {
      nome: "Marcos",
    },
  ];

  const tipoEquipOptions = [
    {
      tipo: "Monitor",
    },
    {
      tipo: "Desktop",
    },
    {
      tipo: "Notebook",
    },
  ];

  const modeloEquipOptions = [
    {
      tipo: "Monitor",
      modelo: "Dell P2217s",
    },
    {
      tipo: "Desktop",
      modelo: "Lenovo ThinkCentre Edge 72/73",
    },
    {
      tipo: "Notebook",
      modelo: "Lenovo ThinkPad L450",
    },
  ];

  const perifericoOptions = [
    {
      id: "0",
      nome: "teclado",
      estoque: "2",
    },
    {
      id: "1",
      nome: "mouse",
      estoque: "2",
    },
    {
      id: "2",
      nome: "Cabo VGA",
      estoque: "2",
    },
  ];

  useEffect(() => {
    setSbHeight(hgt);
    if (!perifericoCheck) {
      setPerifericoHeadingVisibility("hidden");
      setPerifericoCount(0);
      updatePerifericosOutput((arr) => (arr = []));
    }
    !perifericoOldCheck && setPerifericoOldHeadingVisibility("hidden");
  }, [hgt, perifericoCheck, perifericoCount, perifericoOldCheck]);

  const generatePerifericosSelected = () => {
    let line = ``;
    perifericosOutput.map((item, k) => {
      if (item.quantidade !== "0") {
        if (line.includes(item.nome)) {
          let index = line.indexOf(item.nome);
          let substr = line.substring(index - 3, index - 1);
          let quant = parseInt(substr) + parseInt(item.quantidade);
          line = line.replace(
            substr + " " + item.nome,
            quant + " " + item.nome
          );
        } else {
          line = `${line} ${item.quantidade} ${item.nome}`;
          if (k !== perifericosOutput.length - 1) {
            line = `${line},`;
          }
        }
      }
    });
    if (line.lastIndexOf(",") === line.length - 1) {
      line = line.slice(0, line.lastIndexOf(","));
    }
    return line.trimStart();
  };

  const generatePerifericosOldSelected = () => {
    let line = ``;
    perifericosOldOutput.map((item, k) => {
      if (item.quantidade !== "0") {
        if (line.includes(item.nome)) {
          let index = line.indexOf(item.nome);
          let substr = line.substring(index - 3, index - 1);
          let quant = parseInt(substr) + parseInt(item.quantidade);
          line = line.replace(
            substr + " " + item.nome,
            quant + " " + item.nome
          );
        } else {
          line = `${line} ${item.quantidade} ${item.nome}`;
          if (k !== perifericosOldOutput.length - 1) {
            line = `${line},`;
          }
        }
      }
    });
    if (line.lastIndexOf(",") === line.length - 1) {
      line = line.slice(0, line.lastIndexOf(","));
    }
    return line.trimStart();
  };

  const handleAddPeriferico = (id, name, quantity) => {
    setSbHeight(hgt);
    perifericoHeadingVisibility === "hidden" &&
      setPerifericoHeadingVisibility("visible");
    const find = perifericosOutput.find((p) => p.id === id - 1);
    if (find) {
      if (find.nome !== name || find.quantidade !== quantity) {
        updatePerifericosOutput(
          perifericosOutput.filter((p) => {
            (p.nome !== name || p.quantidade !== quantity) && {
              ...p,
              nome: name,
              quantidade: quantity,
            };
          })
        );
      }
    } else {
      updatePerifericosOutput((arr) => [
        ...arr,
        {
          id: id - 1,
          nome: name,
          quantidade: quantity,
        },
      ]);
    }
  };

  const handleMotivoMessage = (msg) => {
    setMotivoMessage(msg);
  };

  const handleAddOldPeriferico = (id, name, quantity) => {
    setSbHeight(hgt);
    perifericoOldHeadingVisibility === "hidden" &&
      setPerifericoOldHeadingVisibility("visible");
    const find = perifericosOldOutput.find((p) => p.id === id - 1);
    if (find) {
      if (find.nome !== name || find.quantidade !== quantity) {
        updatePerifericosOldOutput(
          perifericosOldOutput.filter((p) => {
            (p.nome !== name || p.quantidade !== quantity) && {
              ...p,
              nome: name,
              quantidade: quantity,
            };
          })
        );
      }
    } else {
      updatePerifericosOldOutput((arr) => [
        ...arr,
        {
          id: id - 1,
          nome: name,
          quantidade: quantity,
        },
      ]);
    }
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    //   resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const handleForm = handleSubmit((data) => {
    if (isOpen) {
      onClose();
    }
    //data.callbackUrl = `${window.location.origin}/`;

    //submitted by register:
    //data.ticket =
    //data.equip_new_serial =
    //data.equip_new-patrimonio =
    //data.usuario_nome =
    //data.usuario_email=
    //data.usuario_bp=
    //data.usuario_departamento=
    //data.equip_old_serial=
    //data.equip_old_patrimonio=

    data.motivo = menuMotivoButtonLabel;
    data.tecnico_nome = menuTecnicoButtonLabel;
    data.usuario_localidade = menuLocalidadeButtonLabel;
    data.equip_new_tipo = tipoEquipButtonLabel;
    data.equip_new_modelo = modeloEquipButtonLabel;
    data.equip_new_entregue_perif = perifericoCheck;
    const perifList = generatePerifericosSelected();
    if (perifericoCheck && perifList !== "") {
      data.equip_new_perifericos = perifList;
    }
    data.equip_old_recolhido = recolhidoCheck;
    if (!recolhidoCheck && motivoMessage !== "") {
      data.equip_old_recolhido_motivo = motivoMessage;
    }
    if (recolhidoCheck) {
      data.equip_old_tipo = tipoEquipOldButtonLabel;
      data.equip_old_modelo = modeloEquipOldButtonLabel;
      data.equip_old_recolhido_perif = perifericoOldCheck;
      const perifOldList = generatePerifericosOldSelected();
      if (perifericoOldCheck && perifOldList !== "") {
        data.equip_old_perifericos = perifOldList;
      }
    }
    data.datahora = new Date().toLocaleDateString("pt-br", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    logger("i", "Form Data: " + JSON.stringify(data, null, 2));
  });

  return (
    <>
      <PageWrapper
        level={0}
        warn={true}
        direction={"column"}
        marginTop={["10vh"]}
        width={["50vw"]}
        marginLeft={["2vw"]}
        sidebarHeight={sbHeight}
      >
        <Flex
        direction={"column"}
        justifyContent={"flex-start"}
        pb={20}
        height={["100%"]}
        >
        <Flex
          direction="column"
          p="10"
          backgroundColor="whiteAlpha.900"
          boxShadow="dark-lg"
          borderRadius="lg"
          alignSelf="center"
          justifyContent={"center"}
          alignItems="center"
          width={"100%"}
          ref={ref}
        >
          <Flex direction="column" p={1} pb={16} width={"60%"}
          >
            <Heading textAlign="center">
              Termo de Responsabilidade - Latam Airlines
            </Heading>
            <Heading pt="5" fontSize="md" textAlign="center">
              Formulário para emissão do Termo de Responsabilidade do
              Desktop/Notebook corporativo
            </Heading>
          </Flex>
          <Flex direction={"column"} width="100%" 
          >
            <form onSubmit={handleForm} 
            >
              <FormControl >
                <Flex gap={5}>
                  <Flex direction={"column"} width={"50%"} >
                    <Heading fontSize="md" pl="2" fontWeight="bold">
                      Dados do Chamado
                    </Heading>
                    <Flex
                      direction={"column"}
                      width="auto"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={3}
                      pt={5}
                      pb={4}
                      mb={5}
                    >
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Número do Ticket
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="20202335"
                        name="ticket"
                        fontSize={"sm"}
                        {...register("ticket")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Motivo da Entrega do Equipamento
                      </Heading>
                      <SelectComponent
                        color={color}
                        labelState={menuMotivoButtonLabel}
                        setFunctionState={menuMotivoSet}
                        options={motivoOptions}
                        optionLabel={"value"}
                        optionValue={"value"}
                        //registerFunction={{ ...register("motivo") }}
                      />
                    </Flex>
                    <Heading fontSize="md" pl="2" fontWeight="bold">
                      Dados do Técnico
                    </Heading>
                    <Flex
                      direction={"column"}
                      width="auto"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={3}
                      pt={5}
                      pb={4}
                      mb={5}
                    >
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Técnico responsável pelo atendimento
                      </Heading>
                      <SelectComponent
                        color={color}
                        labelState={menuTecnicoButtonLabel}
                        setFunctionState={menuTecnicoSet}
                        options={tecnicoOptions}
                        optionLabel={"nome"}
                        optionValue={"nome"}
                        //registerFunction={{ ...register("tecnico_nome") }}
                      />
                    </Flex>
                    <Heading fontSize="md" pl="2" fontWeight="bold">
                      Dados do Equipamento
                    </Heading>
                    <Flex
                      direction={"column"}
                      width="auto"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={3}
                      pt={5}
                      pb={4}
                      mb={5}
                    >
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Tipo de Equipamento
                      </Heading>
                      <SelectComponent
                        color={color}
                        labelState={tipoEquipButtonLabel}
                        setFunctionState={tipoEquipSet}
                        options={tipoEquipOptions}
                        optionLabel={"tipo"}
                        optionValue={"tipo"}
                        //registerFunction={{ ...register("equip_new_tipo") }}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Modelo do Equipamento
                      </Heading>
                      <SelectComponent
                        disabled={
                          tipoEquipButtonLabel === "Selecione..." && true
                        }
                        optionCriteria={"tipo"}
                        optionCriteriaValue={tipoEquipButtonLabel}
                        color={color}
                        labelState={modeloEquipButtonLabel}
                        setFunctionState={modeloEquipSet}
                        options={modeloEquipOptions}
                        optionLabel={"modelo"}
                        optionValue={"modelo"}
                        //registerFunction={{ ...register("equip_new_modelo") }}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Número de Série
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="PE455GB"
                        name="equip_new_serial"
                        textTransform={"uppercase"}
                        fontSize={"sm"}
                        {...register("equip_new_serial")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Patrimônio
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="711256"
                        name="equip_new_patrimonio"
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                        {...register("equip_new_patrimonio")}
                      />
                      <Flex
                        direction={"column"}
                        width="auto"
                        borderWidth="1px"
                        borderRadius="lg"
                        p={3}
                        pt={5}
                        pb={4}
                        mb={3}
                      >
                        <Flex
                          justifyContent={"flex-start"}
                          gap={3}
                          pb={perifericoCheck && 8}
                          alignItems={"center"}
                        >
                          
                          <Switch
                            onChange={() =>
                              setPerifericoCheck(!perifericoCheck)
                            }
                            //{...register("equip_new_entregue_perif")}
                          />
                          <Heading fontWeight="bold" fontSize={"sm"}>
                            Foi entregue algum periférico?
                          </Heading>
                        </Flex>
                        {perifericoCheck && (
                          <>
                            <Flex
                              justifyContent={"center"}
                              direction={"column"}
                            >
                              <Flex
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems="center"
                                pb={3}
                              >
                                <Heading
                                  pl="0"
                                  fontWeight="normal"
                                  fontSize={"sm"}
                                >
                                  Periféricos Entregues
                                </Heading>
                                <Spacer />
                                <Heading
                                  visibility={perifericoHeadingVisibility}
                                  //pr={12}
                                  //pl="2"
                                  fontWeight="normal"
                                  fontSize={"sm"}
                                  pr={7}
                                >
                                  Quantidade
                                </Heading>
                              </Flex>
                              <Flex
                                justifyContent={"center"}
                                direction={"column"}
                                //width={"50%"}
                              >
                                {React.Children.toArray(
                                  Array.from(
                                    { length: perifericoCount + 1 },
                                    (_, k) => (
                                      <>
                                        <SelectComponentQuantity
                                          visibility={"visible"}
                                          color={color}
                                          options={perifericoOptions}
                                          count={perifericoCount}
                                          setCount={setPerifericoCount}
                                          optionLabel={"nome"}
                                          optionValue={"nome"}
                                          idx={k + 1}
                                          setFunctionState={handleAddPeriferico}
                                          selectorStep={1}
                                          selectorDefaultValue={0}
                                          selectorMin={0}
                                          selectorMax={99}
                                          selectorPrecision={0}
                                        />
                                      </>
                                    )
                                  )
                                )}
                              </Flex>
                            </Flex>
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex direction={"column"} width={"50%"}>
                    <Heading fontSize="md" pl="2" fontWeight="bold">
                      Dados do Usuário
                    </Heading>
                    <Flex
                      direction={"column"}
                      width="auto"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={3}
                      pt={5}
                      pb={4}
                      mb={5}
                    >
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Nome
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="João da Silva"
                        name="usuario_nome"
                        fontSize={"sm"}
                        {...register("usuario_nome")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Email
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="email@latam.com"
                        name="usuario_email"
                        fontSize={"sm"}
                        {...register("usuario_email")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        BP
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="number"
                        placeholder="233235"
                        name="usuario_bp"
                        fontSize={"sm"}
                        {...register("usuario_bp")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Departamento
                      </Heading>
                      <Input
                        color={color}
                        mb="3"
                        variant="filled"
                        type="text"
                        placeholder="Manutenção de Aeronave"
                        name="usuario_departamento"
                        fontSize={"sm"}
                        {...register("usuario_departamento")}
                      />
                      <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                        Localidade
                      </Heading>
                      <SelectComponent
                        color={color}
                        labelState={menuLocalidadeButtonLabel}
                        setFunctionState={menuLocalidadeSet}
                        options={localidadeOptions}
                        optionLabel={"iata_nome"}
                        optionValue={"iata_nome"}
                        //registerFunction={{ ...register("usuario_localidade") }}
                      />
                    </Flex>
                    <Flex
                      direction={"column"}
                      width="auto"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={3}
                      pt={5}
                      pb={4}
                      mb={3}
                      display={
                        menuMotivoButtonLabel !== "Renovação Tecnológica" &&
                        menuMotivoButtonLabel !== "Substituição por Avaria" &&
                        "none"
                      }
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        gap={3}
                        pb={!recolhidoCheck && 6}
                        alignItems={"center"}
                      >
                       
                        <Switch
                          onChange={() => setRecolhidoCheck(!recolhidoCheck)}
                          //{...register("equip_old_recolhido")}
                        />
                         <Heading fontWeight="bold" fontSize={"sm"}>
                          Foi recolhido algum equipamento?
                        </Heading>
                      </Flex>
                      {!recolhidoCheck && (
                        <InputTextBox
                          maxLength={200}
                          textAreaSize={"1.5vh"}
                          textValueFunction={handleMotivoMessage}
                          placeholder={
                            "Descreva o motivo pelo qual não foi recolhido..."
                          }
                        />
                      )}
                      {recolhidoCheck && (
                        <Flex
                          direction={"column"}
                          width="auto"
                          //display={!recolhidoCheck && "none"}
                          pt={5}
                        >
                          <Heading fontSize="md" pl="2" fontWeight="bold">
                            Equipamento Recolhido
                          </Heading>
                          <Flex
                            direction={"column"}
                            width="auto"
                            borderWidth="1px"
                            borderRadius="lg"
                            p={3}
                            pt={5}
                            pb={4}
                            mb={5}
                          >
                            <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                              Tipo de Equipamento Recolhido
                            </Heading>
                            <SelectComponent
                              color={color}
                              labelState={tipoEquipOldButtonLabel}
                              setFunctionState={tipoEquipOldSet}
                              options={tipoEquipOptions}
                              optionLabel={"tipo"}
                              optionValue={"tipo"}
                              //registerFunction={{ ...register("equip_old_tipo") }}
                            />
                            <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                              Modelo do Equipamento Recolhido
                            </Heading>
                            <SelectComponent
                              disabled={
                                tipoEquipOldButtonLabel === "Selecione..." &&
                                true
                              }
                              optionCriteria={"tipo"}
                              optionCriteriaValue={tipoEquipOldButtonLabel}
                              color={color}
                              labelState={modeloEquipOldButtonLabel}
                              setFunctionState={modeloEquipOldSet}
                              options={modeloEquipOptions}
                              optionLabel={"modelo"}
                              optionValue={"modelo"}
                              // registerFunction={{
                              //   ...register("equip_old_modelo"),
                              // }}
                            />
                            <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                              Número de Série
                            </Heading>
                            <Input
                              color={color}
                              mb="3"
                              variant="filled"
                              type="text"
                              placeholder="PE455GB"
                              name="equip_old_serial"
                              textTransform={"uppercase"}
                              fontSize={"sm"}
                              {...register("equip_old_serial")}
                            />
                            <Heading pl="2" fontWeight="normal" fontSize={"sm"}>
                              Patrimônio
                            </Heading>
                            <Input
                              color={color}
                              mb="3"
                              variant="filled"
                              type="text"
                              placeholder="711256"
                              name="equip_old_patrimonio"
                              fontSize={"sm"}
                              textTransform={"uppercase"}
                              {...register("equip_old_patrimonio")}
                            />
                          </Flex>
                          <Flex
                            direction={"column"}
                            width="auto"
                            borderWidth="1px"
                            borderRadius="lg"
                            p={3}
                            pt={5}
                            pb={4}
                            mb={3}
                          >
                            <Flex
                              justifyContent={"flex-start"}
                              gap={3}
                              pb={perifericoOldCheck && 8}
                              alignItems={"center"}
                            >
                              
                              <Switch
                                onChange={() =>
                                  setPerifericoOldCheck(!perifericoOldCheck)
                                }
                                //{...register("equip_old_recolhido_perif")}
                              />
                              <Heading fontWeight="bold" fontSize={"sm"}>
                                Foi recolhido algum periférico?
                              </Heading>
                            </Flex>
                            {perifericoOldCheck && (
                              <>
                                <Flex
                                  justifyContent={"center"}
                                  direction={"column"}
                                >
                                  <Flex
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                    pb={3}
                                  >
                                    <Heading
                                      pl="0"
                                      fontWeight="normal"
                                      fontSize={"sm"}
                                    >
                                      Periféricos Recolhidos
                                    </Heading>
                                    <Spacer />
                                    <Heading
                                      visibility={
                                        perifericoOldHeadingVisibility
                                      }
                                      //pr={12}
                                      //pl="2"
                                      fontWeight="normal"
                                      fontSize={"sm"}
                                      pr={7}
                                    >
                                      Quantidade
                                    </Heading>
                                  </Flex>
                                  <Flex
                                    justifyContent={"center"}
                                    direction={"column"}
                                    //width={"50%"}
                                  >
                                    {React.Children.toArray(
                                      Array.from(
                                        { length: perifericoOldCount + 1 },
                                        (_, k) => (
                                          <>
                                            <SelectComponentQuantity
                                              visibility={"visible"}
                                              color={color}
                                              options={perifericoOptions}
                                              count={perifericoOldCount}
                                              setCount={setPerifericoOldCount}
                                              optionLabel={"nome"}
                                              optionValue={"nome"}
                                              idx={k + 1}
                                              setFunctionState={
                                                handleAddOldPeriferico
                                              }
                                              selectorStep={1}
                                              selectorDefaultValue={0}
                                              selectorMin={0}
                                              selectorMax={99}
                                              selectorPrecision={0}
                                            />
                                          </>
                                        )
                                      )
                                    )}
                                  </Flex>
                                </Flex>
                              </>
                            )}
                          </Flex>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </FormControl>
              <Flex
                pt={10}
                width="100%"
                justifyContent={"center"}
                alignContent={"center"}
              >
                <ButtonComponent
                  onClick={onOpen}
                  colorScheme="blue"
                  //type="submit"
                >
                  Enviar
                </ButtonComponent>
              </Flex>

              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="scale"
                scrollBehavior="inside"
                size={"2xl"}
                //isCentered={"true"}
              >
                {/* <ModalOverlay /> */}
                <OverlayOne />
                <ModalContent ml={"10vw"}>
                  <ModalHeader textAlign={"center"} color="blue.600">
                    Termo de Responsabilidade
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6} pt={6} fontSize={"sm"}>
                    <Flex direction={"column"} gap={4}>
                      <Text textAlign={"justify"}>
                        Declaro ter recebido nesta data, o(s) iten(s)
                        mencionado(s) acima, sendo que prestarei contas à LATAM,
                        na forma e no prazo requerido pela utilização do(s)
                        mesmo(s), sendo vinculada a utilização, exclusivamente,
                        a serviço da <b>LATAM AIRLINES GROUP S.A.</b>.
                      </Text>
                      <Text textAlign={"justify"}>
                        Na hipótese de furto ou roubo do(s) equipamento(s),
                        documentado(s) por meio de registro de Boletim de
                        Ocorrência Policial, bem como nas situações de
                        “clonagem” do(s) equipamento(s) e outros, obrigo-me a
                        comunicar a empresa por meio do Service Desk*
                        imediatamente e enviar uma cópia do Boletim de
                        Ocorrência para o e-mail <b>servicotibr@tam.com.br</b>.
                      </Text>
                      <Text textAlign={"justify"}>
                        Comprometo-me devolver à <b>LATAM</b>, o(s)
                        mencionado(s) equipamento(s) em caso de rescisão do meu
                        contrato de trabalho ou mediante solicitação da{" "}
                        <b>LATAM</b>, efetuando a prestação final de contas.
                      </Text>
                      <Text textAlign={"justify"}>
                        Estou ciente e de total acordo, de que os valores gastos
                        no(s) reparo(s) do(s) equipamento(s) proveniente(s) de
                        mau uso (quebra, avaria, etc.), serão debitados do
                        Centro de Custo em que o(s) equipamento(s) está ou
                        estarão alocados; bem como que autorizo* o desconto em
                        folha de pagamento dos valores oriundos de má utilização
                        ou eventuais danos causados (perda, inutilização total
                        ou parcial) ao(s) equipamentos por minha
                        responsabilidade.
                      </Text>
                      <Text textAlign={"justify"}>
                        Na hipótese de rescisão do meu contrato de trabalho,
                        autorizo* o desconto das despesas decorrentes do mau uso
                        e/ou má utilização, bem como o valor de itens faltantes
                        do equipamento no Termo de Rescisão do Contrato de
                        Trabalho.
                      </Text>
                      <Text textAlign={"justify"}>
                        Caso o valor desse desconto ultrapasse o limite legal
                        previsto (<b>Art. 477, Parágrafo 5º, da CLT</b>),
                        reconheço que a diferença entre o débito e o valor
                        descontado constitui-se em dívida para com a{" "}
                        <b>LATAM</b>, dívida esta que poderá ser cobrada por
                        meio das medidas judiciais ou extrajudiciais cabíveis.
                      </Text>
                      <Text textAlign={"justify"} pt={5} fontSize="xs">
                        * Regra aplicável aos funcionários{" "}
                        <b>LATAM AIRLINES GROUP S.A. do Brasil</b>. Esta
                        declaração é firmada em caráter irrevogável e
                        irretratável.
                      </Text>
                    </Flex>
                    <Flex
                      justifyContent={"flex-start"}
                      gap={3}
                      pt={5}
                      alignItems={"center"}
                    >
                      <Switch onChange={() => setAcceptCheck(!acceptCheck)} />
                      <Heading fontWeight="bold" fontSize={"sm"}>
                        Estou ciente e concordo com os termos acima.
                      </Heading>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <ButtonComponent
                      isDisabled={!acceptCheck}
                      onClick={handleSubmit(handleForm)}
                      colorScheme="blue"
                    >
                      Aceitar e Enviar
                    </ButtonComponent>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </form>
          </Flex>
        </Flex>
        </Flex>
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  if (getSession(context)) {
    const session = await getSession(context);
    return {
      props: {
        session,
        csrfToken: await getCsrfToken(context),
      },
    };
  } else {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }
}
