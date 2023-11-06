import React from "react";
import { CellImage, Container } from "./styles";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Reward } from "../../types";

/**
 * Rewards should have a name, description,
 * price, category, and image URL.
 */

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <CellImage
        src={params.value as string}
        alt={params.value as string}
        height="100%"
      />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 200,
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
  },

  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 20,
    flex: 1,
  },
];

const mockRows = [
  {
    id: "d9634c81-d539-4d81-868a-0eb0700f384b",
    name: 'Example Reward 1',
    category: 'Category 1',
    price: 100,
    description: 'Example Description 1',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: "c89b5425-3d22-468f-8343-820202d7e1ff",
    name: 'Example Reward 2',
    category: 'Category 2',
    price: 200,
    description: 'Example Description 2',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: "7158c483-c626-4d8f-bfb8-0732aa0a33ff",
    name: 'Example Reward 3',
    category: 'Category 3',
    price: 300,
    description: 'Example Description 3',
    image: 'https://picsum.photos/200/300'
  }
] satisfies Reward[];

const RewardsPage = () => {
  return <Container>
    <DataGrid columns={columns} rows={mockRows} disableColumnSelector />
  </Container>;
};

export default RewardsPage;