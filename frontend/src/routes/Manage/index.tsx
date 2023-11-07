import { useMemo } from "react";
import { Container, DeleteIcon, Footer } from "./styles";
import { DataGrid, GridColDef, GridPagination, GridRowParams } from '@mui/x-data-grid';
import CreateRewardDialog from "../../components/CreateRewardDialog";
import { useMutableRewards } from "../../hooks/rewards";
import { CellImage } from "../Rewards/styles";
import LinearProgress from '@mui/material/LinearProgress';
import { Reward } from "../../types";
import { toast } from "sonner";

const ManageRewardsPage = () => {
  const {
    add,
    remove,
    rewards,
    loading
  } = useMutableRewards();

  const columns = useMemo(() => [
    {
      field: 'image',
      headerName: 'Image',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <CellImage
          src={params.value}
          alt={params.value}
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
    {
      field: 'actions',
      type: 'actions',
      headerName: '✏️',
      headerAlign: 'center',
      width: 50,
      getActions: ({ row }: Partial<GridRowParams<Reward>>) => [
        <DeleteIcon onClick={() => {
          toast.promise(remove(row!), {
            loading: 'Removing reward...',
            success: 'Reward removed!',
            error: 'Failed to remove reward',
          });
        }} />
      ]
    }
  ] satisfies GridColDef[], [remove]);

  return <Container>
    <DataGrid
      columns={columns}
      rows={rewards}
      loading={loading}
      initialState={{
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
      slots={{
        loadingOverlay: LinearProgress,
        footer: () => <Footer>
          <CreateRewardDialog add={add} />
          <GridPagination />
        </Footer>
      }}
    />
  </Container>;
};

export default ManageRewardsPage;