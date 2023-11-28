'use client'
import React from "react";
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
  useDisclosure,
} from "@nextui-org/react";

import { RouterOutputs } from "@/server";

import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";
import { ChevronDownIcon, PlusIcon, SearchIcon, VerticalDotsIcon } from "../icons";
import { ExcelIcon } from "../icons/ExcelIcon";
import ModalAddProveedor from "../Modal/AddProveedor";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  {name: "Id", uid: "id_proveedor", sortable: true},
  {name: "Nombre", uid: "nombre", sortable: true},
  {name: "Telefono", uid: "telefono", sortable: true},
  {name: "Acciones", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ['id_proveedor', "nombre", "telefono", "actions"];

type Proveedor = RouterOutputs["getAllProveedor"][0];


export default function ListOfProveedores({ initialServicios }: { initialServicios: Awaited<ReturnType<(typeof serverClient)['getAllProveedor']>> })  {
  const getServicios = trpc.getAllProveedor.useQuery(undefined,{
    initialData: initialServicios,
    refetchOnMount: false,
    refetchOnReconnect: true
  });

  const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onOpenChange: onOpenChangeModalAdd, onClose: onCloseAdd } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id_proveedor",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredServices = [...getServicios.data];

    if (hasSearchFilter) {
      filteredServices = filteredServices.filter((proveedor) =>
        proveedor.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredServices;
  }, [getServicios.data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Proveedor, b: Proveedor) => {
      const first = a[sortDescriptor.column as keyof Proveedor] as number;
      const second = b[sortDescriptor.column as keyof Proveedor] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((proveedor: Proveedor, columnKey: React.Key) => {

    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{proveedor.nombre}</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{proveedor.telefono}</p>
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
                }}>Editar</DropdownItem>
                <DropdownItem aria-label="Mostrar servicios">Ver suministros</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return proveedor.id_proveedor;
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
            <Button color="primary" onPress={onOpenModalAdd} endContent={<PlusIcon />}>
              Agregar proveedores
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total: {getServicios.data.length} servicios</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
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
    getServicios.data.length,
    hasSearchFilter,
    selectedKeys
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los elementos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
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
            Regresar
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
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
        <TableBody emptyContent={"Sin proveedores"} items={sortedItems}>
          {(item) => {
            return (
              <TableRow key={item.id_proveedor}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      <Modal isOpen={isOpenModalAdd} onOpenChange={onOpenChangeModalAdd}>
        <ModalContent>
          <ModalAddProveedor onClose={onCloseAdd} />
        </ModalContent>
      </Modal>
    </>
  );
}
