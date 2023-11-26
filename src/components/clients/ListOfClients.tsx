'use client'
import React, { SVGProps } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  getKeyValue,
  ModalFooter,
} from "@nextui-org/react";

import { RouterOutputs } from "@/server";

import { useForm } from "react-hook-form";

import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { ChevronDownIcon, PlusIcon, SearchIcon, VerticalDotsIcon } from "../icons";
import { ExcelIcon } from "../icons/ExcelIcon";
import { ModalEditClienteInfo } from "../Modal/EditClienteInfo";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  {name: "Id", uid: "id_cliente", sortable: true},
  {name: "Nombre", uid: "nombre", sortable: true},
  {name: "Apellido", uid: "apellido", sortable: true},
  {name: "Telefono", uid: "telefono"},
  {name: "Tipo de cliente", uid: "tipo", sortable: true},
  {name: "Acciones", uid: "actions"},
  // {name: "equipos", uid: "email"},
];

const tipoCliente = [
  {name: "Juridico", uid: "juridico"},
  {name: "Natural", uid: "natural"},
];

const INITIAL_VISIBLE_COLUMNS = ['id_cliente', "nombre", "tipo", "telefono", "actions"];

type User = RouterOutputs["getAllClientes"][0];


export default function ListOfClients({ initialClients }: { initialClients: Awaited<ReturnType<(typeof serverClient)['getAllClientes']>> })  {
  const getClients = trpc.getAllClientes.useQuery(undefined,{
    initialData: initialClients,
    refetchOnMount: false,
    refetchOnReconnect: true
  });

  // type User = User;
  
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [ tipoFilter, setTipoFilter ] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id_cliente",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...getClients.data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if(tipoFilter !== "all" && tipoFilter.size !== tipoCliente.length ){
      filteredUsers = filteredUsers.filter((user) => Array.from(tipoFilter).includes(user.tipocliente.tipo.toLowerCase()))
    }

    return filteredUsers;
  }, [getClients.data, filterValue, tipoFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {

    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{user.nombre}</p>
          </div>
        );
      case "apellido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{user.apellido}</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{user.telefono}</p>
          </div>
        );
      case "tipo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{user.tipocliente.tipo}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Lista de opciones">
                <DropdownItem onClick={() => {
                  setSelectedUser(user)
                  onOpenModal()
                }}>Editar</DropdownItem>
                <DropdownItem aria-label="Mostrar servicios">Ver más info</DropdownItem>
                <DropdownItem aria-label="Mostrar servicios">Ver servicios</DropdownItem>
                <DropdownItem aria-label="Mostrar direcciones">Ver Direcciones</DropdownItem>
                <DropdownItem aria-label="Mostrar equipos"onClick={() => {
                  setSelectedUser(user)
                  onOpenModal()
                }}>Ver Equipos</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return user.id_cliente;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {
              (selectedKeys === "all" || selectedKeys.size > 0) ? 
                <Button>
                  Exportar a <ExcelIcon />
                </Button>
              : null
            }
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Tipo cliente
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={tipoFilter}
                selectionMode="multiple"
                onSelectionChange={setTipoFilter}
              >
                {tipoCliente.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {getClients.data.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    getClients.data.length,
    hasSearchFilter,
    tipoFilter,
    selectedKeys
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Tabla de clientes"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[452px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => {
            return (
              <TableRow key={item.id_cliente}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {/* <ModalEquipoInfo isOpen={isEquipoModalOpen} onOpenChange={onEquipoModalOpen} selectedUser={selectedUser} /> */}
      <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal}>
        <ModalContent>
              <ModalEditClienteInfo onClose={onClose} clienteId={selectedUser!?.id_cliente} />
        </ModalContent>
      </Modal>
      {/* <ModalEditInfo isOpen={isEditModalOpen} onOpenChange={onEditModalOpen} selectedUser={selectedUser} /> */}
    </>
  );
}

function ModalEquipoInfo({ selectedUser, isOpen, onOpenChange }: { selectedUser: User | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const equipos = selectedUser?.equipocliente.map(equipo => ({...equipo, "tipo": equipo.tipoequipo.tipo}))

  const columns = [
    {
      key: "id_equipocliente",
      label: "ID",
    },
    {
      key: "numerodeserie",
      label: "SERIE",
    },
    {
      key: "tipo",
      label: "TIPO",
    },
  ]
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Equipos del cliente: {selectedUser?.nombre}</ModalHeader>
            <ModalBody>
              <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                  {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={equipos}>
                  {(item) => (
                    <TableRow key={item.id_equipocliente}>
                      {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="danger" variant="light" onPress={() => {
                onClose()
              }}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

function ModalEditInfo({ isOpen, onOpenChange, selectedUser }: { isOpen: boolean, onOpenChange: (open: boolean) => void, selectedUser: User | null  }) {
  'use client'
  const { mutate, isLoading: isUpdating } = trpc.editUser.useMutation();
  const utils = trpc.useUtils()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: selectedUser?.nombre,
      apellido: selectedUser?.apellido
    }
  })

  function onSubmit(data: any) {
    // avoid send empty data
    if (data.nombre === "" || data.telefono === "") return
    mutate({ id: selectedUser!.id_cliente, nombre: data.nombre }, {
      onSuccess: () => {
        utils.getAllClientes.invalidate()
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modificar cliente: {selectedUser?.nombre}</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 py-2">
                <Input
                    autoFocus
                    label="Nombre"
                    placeholder="Ingresa su nuevo nombre"
                    variant="bordered"
                    {...register('nombre')}
                    isDisabled={isUpdating}
                    />
                <Input
                    label="Apellido"
                    placeholder="Ingresa su apellido"
                    variant="bordered"
                    {...register('apellido')}
                    isDisabled={isUpdating}
                  />
                <div className="flex justify-end pb-2 pt-3">
                  <Button isDisabled={isUpdating} type="button" color="danger" variant="light" onPress={() => {
                    reset()
                    onClose()
                  }}>
                    Close
                  </Button>
                  <Button isDisabled={isUpdating} type="submit" color="primary" onPress={() => {
                    onClose()
                  }}>
                    Guardar
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
