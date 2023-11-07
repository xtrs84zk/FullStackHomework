import React from "react";
import { CellImage, Container } from "./styles";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRewards } from "../../hooks/rewards";
import { dataGridProps } from "../../constants";

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <CellImage
        src={params.value}
        alt={params.row.name}
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

const RewardsPage = () => {
  const { rewards, loading } = useRewards();
  return <Container>
    <DataGrid
      columns={columns}
      rows={rewards}
      disableColumnSelector
      loading={loading}
      initialState={dataGridProps.initialState}
      slots={dataGridProps.slots}
    />
  </Container>;
};

export default RewardsPage;