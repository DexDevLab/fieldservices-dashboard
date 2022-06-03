import { Flex, useDisclosure } from "@chakra-ui/react";
import "animate.css";
import { SidebarSmall } from "components";
import { AnimatePresenceWrapper } from "components/AnimatePresenceWrapper";
import { useRouter } from "next/router";
import {
  GetLoggedLevel,
  GetLoggedUser,
} from "pages/api/services/loginValidator";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  FaCheck,
  FaCheckDouble,
  FaRegListAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { HiDesktopComputer } from "react-icons/hi";
import {
  MdDevicesOther,
  MdOutlineImportantDevices,
  MdOutlineMarkEmailRead,
  MdOutlinePlace,
} from "react-icons/Md";
import { RiUserSettingsLine } from "react-icons/ri";
import NoSSR from "react-no-ssr";
import { SidebarItem } from "../SidebarItem";
import { SidebarLarge } from "../SidebarLarge";
import { SidebarSubItem } from "../SidebarSubItem";

export function SidebarComponent({ height }) {
  const router = useRouter();
  const userName = GetLoggedUser();
  const userLevel = GetLoggedLevel();
  const [expanded, setExpanded] = useState(0);
  const [showSubItems, setShowSubItems] = useState("none");
  const { isOpen: isLoaded, onOpen: onLoad, onClose } = useDisclosure();

  useEffect(() => {
    onLoad();
  });

  const toggleExpanded = () => {
    if (expanded === 0) {
      setExpanded(1);
    } else if (expanded === 1) {
      setExpanded(2);
    } else {
      setExpanded(1);
    }
  };

  const toggleShowSubItems = (name) => {
    if (name === showSubItems) {
      setShowSubItems("none");
    } else {
      setShowSubItems(name);
    }
  };

  const toggleSidebarItemClick = (isLarge, name, subItems, link) => {
    if (
      !subItems |
      (subItems == "") |
      (subItems == null)
      // (subItems.length === 0)
    ) {
      toggleExpanded();
      router.push(link);
    } else {
      if (!isLarge) {
        toggleExpanded();
        setShowSubItems(name);
      } else {
        toggleShowSubItems(name);
      }
    }
  };

  // const sidebarItems = [
  //   {
  //     icon: "",
  //     name: "",
  //     link: "",
  //     subItems:[
  //       {
  //         icon: "",
  //         name: "",
  //         link: "",
  //       }
  //     ]
  //   },
  // ]

  const sidebarItems = [
    {
      icon: <AiOutlineHome />,
      name: "Dashboard",
      link: "/dashboard",
      level: 0,
      subItems: [],
    },
    {
      icon: <HiDesktopComputer />,
      name: "Quiosque",
      link: "",
      level: 0,
      subItems: [
        {
          icon: <FaRegListAlt />,
          name: "Termo de Responsabilidade",
          link: "/formularios/tdr",
          level: 0,
        },
        {
          icon: <FaCheck />,
          name: "Pré-Formatação",
          link: "/formularios/pre",
          level: 0,
        },
        {
          icon: <FaCheckDouble />,
          name: "Pós-Formatação",
          link: "/formularios/pos",
          level: 0,
        },
      ],
    },
    {
      icon: <FiSettings />,
      name: "Gerenciar",
      link: "",
      level: 2,
      subItems: [
        {
          icon: <FaUserCircle />,
          name: "Usuários",
          link: "/gerenciar/usuarios",
          level: 2,
        },
        {
          icon: <RiUserSettingsLine />,
          name: "Técnicos",
          link: "/gerenciar/tecnicos",
          level: 2,
        },
        {
          icon: <MdOutlineImportantDevices />,
          name: "Equipamentos",
          link: "/gerenciar/equipamentos",
          level: 2,
        },
        {
          icon: <MdDevicesOther />,
          name: "Periféricos",
          link: "/gerenciar/perifericos",
          level: 2,
        },
        {
          icon: <MdOutlinePlace />,
          name: "Localidades",
          link: "/gerenciar/localidades",
          level: 2,
        },
        {
          icon: <MdOutlineMarkEmailRead />,
          name: "Emails de disparo",
          link: "/gerenciar/emails",
          level: 2,
        },
      ],
    },
  ];

  return (
    <>
      <AnimatePresenceWrapper isLoaded={isLoaded}>
        <NoSSR>
          <Flex
            w={["66vw", "35vw", "28vw"]}
            flexDir="row"
            justifyContent="flex-start"
          >
            <SidebarSmall
              userName={userName}
              userLevel={userLevel}
              expanded={expanded}
              expandedFunction={toggleExpanded}
              router={router}
              height={height}
            >
              {sidebarItems &&
                React.Children.toArray(
                  sidebarItems.map((item, i) => {
                    return (
                      <>
                        <SidebarItem
                          isLarge={false}
                          icon={item.icon}
                          name={item.name}
                          itemLevel={item.level}
                          showSubItems={showSubItems}
                          userLevel={userLevel}
                          expanded={expanded}
                          clickEvent={() =>
                            toggleSidebarItemClick(
                              false,
                              item.name,
                              item.subItems,
                              item.link
                            )
                          }
                        />
                      </>
                    );
                  })
                )}
            </SidebarSmall>
            <SidebarLarge
              userLevel={userLevel}
              userName={userName}
              expanded={expanded}
              router={router}
              height={height}
            >
              {sidebarItems &&
                React.Children.toArray(
                  sidebarItems.map((item, i) => {
                    return (
                      <>
                        <SidebarItem
                          isLarge={true}
                          icon={item.icon}
                          name={item.name}
                          itemLevel={item.level}
                          showSubItems={showSubItems}
                          userLevel={userLevel}
                          expanded={expanded}
                          clickEvent={() =>
                            toggleSidebarItemClick(
                              true,
                              item.name,
                              item.subItems,
                              item.link
                            )
                          }
                        >
                          {item.name === showSubItems &&
                            expanded === 1 &&
                            item.subItems &&
                            React.Children.toArray(
                              item.subItems.map((item2, j) => {
                                return (
                                  <>
                                    <SidebarSubItem
                                      icon={item2.icon}
                                      name={item2.name}
                                      parentName={item.name}
                                      subItemLevel={item2.level}
                                      parentLength={item.subItems.length}
                                      subItemIndex={j}
                                      showSubItems={showSubItems}
                                      userLevel={userLevel}
                                      expanded={expanded}
                                      clickEvent={() =>
                                        toggleSidebarItemClick(
                                          true,
                                          item2.name,
                                          item2.subItems,
                                          item2.link
                                        )
                                      }
                                    />
                                  </>
                                );
                              })
                            )}
                        </SidebarItem>
                      </>
                    );
                  })
                )}
            </SidebarLarge>
          </Flex>
        </NoSSR>
      </AnimatePresenceWrapper>
    </>
  );
}
