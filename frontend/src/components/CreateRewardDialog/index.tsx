import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'sonner';
import CircularProgress from '@mui/material/CircularProgress';
import type { RewardPayload } from '../../types';

export default function CreateRewardDialog({ add }: { add: (reward: RewardPayload) => Promise<void> }) {
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<RewardPayload['name']>('');
  const [description, setDescription] = useState<RewardPayload['description']>('');
  const [category, setCategory] = useState<RewardPayload['category']>('');
  const [price, setPrice] = useState<RewardPayload['price']>(0);
  const [image, setImage] = useState<RewardPayload['image']>('');

  const onCreate = useCallback(async () => {
    const reward: RewardPayload = {
      name,
      description,
      category,
      price,
      image,
    };
    try {
      setCreating(true);
      await add(reward);
      toast.success('Reward created!');
    } catch (e) {
      console.error(e);
    } finally {
      handleClose();
    }
  }, [name, description, category, price, image, add]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCreating(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Reward
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new reward</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new reward, please fill out the form below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reward Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Reward Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Reward Category"
            type="text"
            fullWidth
            variant="standard"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Reward Price"
            type="number"
            fullWidth
            variant="standard"
            value={price}
            onChange={(e) => setPrice(Math.max(Number(e.target.value), 0))}
          />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              autoFocus
              margin="dense"
              id="image"
              label="Reward Image"
              type="text"
              fullWidth
              variant="standard"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {!!image && <img src={image} style={{ height: 32, width: 32, marginLeft: 20, borderRadius: 50, marginTop: 'auto', marginBottom: 'auto', objectFit: 'cover' }} />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{creating ? 'Close' : 'Cancel'}</Button>
          {creating ? <CircularProgress /> : <Button onClick={onCreate}>Create</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}