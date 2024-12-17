import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from '@mui/material';
import { CategoryMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { openCategory, selectIsCategoryOpen } from './categorySlice.ts';

interface Props {
  onSubmit: (category: CategoryMutation) => void;
}

const CategoryDialog: React.FC<Props> = ({ onSubmit }) => {
  const isOpen = useAppSelector(selectIsCategoryOpen);
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<CategoryMutation>({
    name: '',
    description: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCategory((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(category);

    setCategory({
      name: '',
      description: '',
    });

    dispatch(openCategory(false));
  };

  return (
    <Dialog open={isOpen} onClose={() => dispatch(openCategory(false))}>
      <DialogTitle>New Category</DialogTitle>
      <DialogContent>
        <form onSubmit={onCategorySubmit}>
          <Grid2 container spacing={2} sx={{ width: '500px' }}>
            <Grid2 size={12}>
              <TextField
                label="Name"
                required
                name="name"
                value={category.name}
                onChange={inputChangeHandler}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="description"
                name="description"
                value={category.description}
                onChange={inputChangeHandler}
              />
            </Grid2>
          </Grid2>
          <DialogActions>
            <Button onClick={() => dispatch(openCategory(false))}>
              Cancel
            </Button>
            <Button type="submit" variant={'contained'}>
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
