"use client";
import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
  },
];

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
  Chip,
  User,
  Pagination,
  type Selection,
  type ChipProps,
  type SortDescriptor,
  Select,
} from "@nextui-org/react";
import { type Clock } from "~/lib/interface/clock";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof users)[0];

export default function CalculatePage() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  {/* <VerticalDotsIcon className="text-default-300" /> */}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
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

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          {/* <Input */}
          {/*   isClearable */}
          {/*   className="w-full sm:max-w-[44%]" */}
          {/*   placeholder="Search by name..." */}
          {/*   startContent={<SearchIcon />} */}
          {/*   value={filterValue} */}
          {/*   onClear={() => onClear()} */}
          {/*   onValueChange={onSearchChange} */}
          {/* /> */}
          {/* <div className="flex gap-3"> */}
          {/*   <Dropdown> */}
          {/*     <DropdownTrigger className="hidden sm:flex"> */}
          {/*       <Button */}
          {/*         // endContent={<ChevronDownIcon className="text-small" />} */}
          {/*         variant="flat" */}
          {/*       > */}
          {/*         Status */}
          {/*       </Button> */}
          {/*     </DropdownTrigger> */}
          {/*     <DropdownMenu */}
          {/*       disallowEmptySelection */}
          {/*       aria-label="Table Columns" */}
          {/*       closeOnSelect={false} */}
          {/*       selectedKeys={statusFilter} */}
          {/*       selectionMode="multiple" */}
          {/*       onSelectionChange={setStatusFilter} */}
          {/*     > */}
          {/*       {statusOptions.map((status) => ( */}
          {/*         <DropdownItem key={status.uid} className="capitalize"> */}
          {/* {capitalize(status.name)} */}
          {/*           status.name */}
          {/*         </DropdownItem> */}
          {/*       ))} */}
          {/*     </DropdownMenu> */}
          {/*   </Dropdown> */}
          {/*   <Dropdown> */}
          {/*     <DropdownTrigger className="hidden sm:flex"> */}
          {/*       <Button */}
          {/*         // endContent={<ChevronDownIcon className="text-small" />} */}
          {/*         variant="flat" */}
          {/*       > */}
          {/*         Columns */}
          {/*       </Button> */}
          {/*     </DropdownTrigger> */}
          {/*     <DropdownMenu */}
          {/*       disallowEmptySelection */}
          {/*       aria-label="Table Columns" */}
          {/*       closeOnSelect={false} */}
          {/*       selectedKeys={visibleColumns} */}
          {/*       selectionMode="multiple" */}
          {/*       onSelectionChange={setVisibleColumns} */}
          {/*     > */}
          {/*       {columns.map((column) => ( */}
          {/*         <DropdownItem key={column.uid} className="capitalize"> */}
          {/* {capitalize(column.name)} */}
          {/*           column.name */}
          {/*         </DropdownItem> */}
          {/*       ))} */}
          {/*     </DropdownMenu> */}
          {/*   </Dropdown> */}
          {/*   <Button color="primary" endContent={<></>}> */}
          {/*     Add New */}
          {/*   </Button> */}
          {/* </div> */}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
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
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
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
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="mt-4 ">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* <Select */}
        {/*   label="พนักงาน" */}
        {/*   placeholder="เลือกพนักงาน" */}
        {/*   className="max-w-xs rounded-xl bg-white " */}
        {/*   variant="bordered" */}
        {/*   onChange={(e) => { */}
        {/*     setSelectedEmployee( */}
        {/*       employees.find((employee: any) => employee.id == e.target.value), */}
        {/*     ); */}
        {/*     setShowCalculate(false); */}
        {/*   }} */}
        {/* > */}
        {/*   {employees.map((employee: any) => ( */}
        {/*     <SelectItem key={employee.id} value={employee.id}> */}
        {/*       {employee.name} */}
        {/*     </SelectItem> */}
        {/*   ))} */}
        {/* </Select> */}
        <div className="flex gap-2">
          <Input
            className="w-40 rounded-xl bg-white"
            type="date"
            variant="bordered"
            label="จาก"
            // value={from}
            onChange={(e) => {
              // setFrom(e.target.value);
            }}
          />
          <Input
            className="w-40 rounded-xl bg-white"
            type="date"
            // value={to}
            label="ถึง"
            variant="bordered"
            onChange={(e) => {
              // setTo(e.target.value);
            }}
          />
        </div>

        <Button
          color="primary"
          className="w-40"
          size="lg"
          onClick={() => {
            // getData();
          }}
        >
          ค้นหา
        </Button>
        {/* {showCalculateButton && ( */}
        {/*   <Button */}
        {/*     color="primary" */}
        {/*     className="w-40" */}
        {/*     size="lg" */}
        {/*     variant="flat" */}
        {/*     onClick={() => { */}
        {/*       setShowCalculate(!showCalculate); */}
        {/*       console.log(history); */}
        {/*     }} */}
        {/*   > */}
        {/*     คำนวนเงินเดือน */}
        {/*   </Button> */}
        {/* )} */}
      </div>
      {/* {showCalculate && ( */}
      {/*   <Card className="p-4"> */}
      {/*     <p className="font-bold">เงินเดือน</p> */}
      {/*     <>พนักงาน : {selectedEmployee.name}</> */}
      {/* get present count without duplicate date*/}
      {/*     <p>เข้างาน : {getPresent(history)} วัน</p> */}
      {/* get absent */}
      {/*     <p> */}
      {/*       ขาดงาน : {history.filter((h: any) => h.status == "absent").length}{" "} */}
      {/*       วัน */}
      {/*     </p> */}
      {/*     <p> */}
      {/*       วันหยุด : {history.filter((h: any) => h.status == "offday").length}{" "} */}
      {/*       วัน */}
      {/*     </p> */}
      {/*     <p>มาสาย : {getLate(history, selectedEmployee.start_time)} วัน</p> */}
      {/*     <p> */}
      {/*       ออกก่อนเวลา : {getOutEarly(history, selectedEmployee.stop_time)} วัน */}
      {/*     </p> */}
      {/*     <p>เงินเดือน : {getSalary(history)} บาท</p> */}
      {/*     <div className="mt-4 flex gap-2"> */}
      {/*       <Input */}
      {/*         className="w-40 rounded-xl bg-white" */}
      {/*         type="number" */}
      {/*         variant="bordered" */}
      {/*         label="เพิ่มเงินเดือน" */}
      {/*         placeholder="0.00" */}
      {/*         startContent={ */}
      {/*           <div className="pointer-events-none flex items-center"> */}
      {/*             <span className="text-small text-default-400">+</span> */}
      {/*           </div> */}
      {/*         } */}
      {/*         endContent={ */}
      {/*           <div className="pointer-events-none flex items-center"> */}
      {/*             <span className="text-small text-default-400">บาท</span> */}
      {/*           </div> */}
      {/*         } */}
      {/*         value={add} */}
      {/*         onChange={(e) => { */}
      {/*           if (parseInt(e.target.value) < 0) { */}
      {/*             toast.error("เพิ่มเงินต้องมากกว่า 0"); */}
      {/*             return; */}
      {/*           } */}
      {/**/}
      {/*           setAdd(e.target.value); */}
      {/*         }} */}
      {/*       /> */}
      {/*       <Input */}
      {/*         className="w-40 rounded-xl bg-white" */}
      {/*         type="number" */}
      {/*         variant="bordered" */}
      {/*         label="หักเงินเดือน" */}
      {/*         placeholder="0.00" */}
      {/*         startContent={ */}
      {/*           <div className="pointer-events-none flex items-center"> */}
      {/*             <span className="text-small text-default-400">-</span> */}
      {/*           </div> */}
      {/*         } */}
      {/*         endContent={ */}
      {/*           <div className="pointer-events-none flex items-center"> */}
      {/*             <span className="text-small text-default-400">บาท</span> */}
      {/*           </div> */}
      {/*         } */}
      {/*         // value={} */}
      {/*         onChange={(e) => { */}
      {/*           if (parseInt(e.target.value) > selectedEmployee.salary) { */}
      {/*             toast.error("หักเงินเกินจำนวนเงินที่ได้รับ"); */}
      {/*             return; */}
      {/*           } */}
      {/*           if (parseInt(e.target.value) < 0) { */}
      {/*             toast.error("หักเงินต้องมากกว่า 0"); */}
      {/*             return; */}
      {/*           } */}
      {/*           setDeduct(e.target.value); */}
      {/*         }} */}
      {/*       /> */}
      {/*     </div> */}
      {/*     <p className="mt-4 flex gap-2"> */}
      {/*       รวม : <p className="font-bold text-primary"> {getTotal()} บาท</p> */}
      {/*     </p> */}
      {/*   </Card> */}
      {/* )} */}

      <div className="mt-4 flex gap-3">
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button endContent={"V"} variant="flat">
              สถานะ
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={statusFilter}
            selectionMode="multiple"
            onSelectionChange={setStatusFilter}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {/* {capitalize(status.name)} */}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button endContent={"V"} variant="flat">
              ข้อมูล
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
                {/* {capitalize(column.name)} */}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Table
        className="mt-4 "
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"ไม่พบประวัติ"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
