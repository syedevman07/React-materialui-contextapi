import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useCategory } from '../../context/category';
import EditDialog from './edit';
import ConfirmDialog from '../common/confirm';
import CategoryCreate from './create';
import CreateSubCategory from './create-sub-category';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 40,
  },
  loader: {
    margin: 'auto',
    height: '300px'
  },
  delete: {
    color: 'red',
  },
  category: {
    fontWeight: 'bold',
  },
  subCategory: {
    paddingLeft: 20,
  },
  addCategoryButton: {
    marginLeft: 20
  }
});
const Categories = () => {
  const classes = useStyles();
  const { data, data: { categories, loading, subCategories }, methods: { getCategories, deleteCategory, getSubCategories } } = useCategory();
  const [category, setCategory] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingSubCategory, setCreatingSubCategory] = useState(false);

  const editCategory = (category) => {
    setCategory(category);
    setOpenEdit(true);
  }

  const openDeleteCategory = (category) => {
    setCategory(category);
    setOpenDelete(true);
  }

  const handleDeleteCategory = () => {
    deleteCategory(category.id);
  };

  const closeEdit = () => setOpenEdit(false);

  const closeCreate = () => {
    setCreatingCategory(false);
    setCreatingSubCategory(false);
  }

  const addNewCategory = () => {
    setCreatingCategory(true);
    setCreatingSubCategory(false);
  }

  const addNewSubCategory = (category) => {
    setCreatingCategory(false);
    setCreatingSubCategory(true);
    setCategory(category);
  }
  const closeDelete = () => setOpenDelete(false);
  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  return (
    <div className={classes.root}>
      <Typography>
        Categories
      </Typography>
      <ConfirmDialog 
        open={openDelete}
        handleAction={handleDeleteCategory}
        handleClose={closeDelete}
        title="Delete Category"
        message={`Are you sure to delete the category "${category && category .name || ""}"`}
      />
      <EditDialog open={openEdit} handleClose={closeEdit} category={category} />
      <CategoryCreate open={creatingCategory} handleClose={closeCreate} />
      <CreateSubCategory open={creatingSubCategory} handleClose={closeCreate} category={category}/>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Sub Category
                </TableCell>
                <TableCell>
                  {!creatingCategory ?
                  <Button className={classes.addCategoryButton} color="secondary" variant="contained" onClick={addNewCategory}>Add Category</Button>
                  : null}
                </TableCell>
              </TableRow>
            </TableHead>
            {!loading ? <TableBody>
              {categories.map((category, i) => (
                <>
                  <TableRow key={i} hover>
                    <TableCell>
                      <Typography className={classes.category}>{category.name}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography className={classes.category}><Button color="primary" variant="contained" onClick={() => addNewSubCategory(category)}>Add Sub Category</Button></Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openDeleteCategory(category)}>
                        <DeleteIcon className={classes.delete}/>
                      </IconButton>
                      <IconButton onClick={() => editCategory(category)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {subCategories.filter(subCategory => subCategory.category.id === category.id).map(
                    subCategory => (
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.subCategory}></Typography>
                        </TableCell>
                        <TableCell>
                        <Typography className={classes.subCategory}>{subCategory.name}</Typography>
                        </TableCell>
                        <TableCell>
                      <IconButton onClick={() => openDeleteCategory(category)}>
                        <DeleteIcon className={classes.delete}/>
                      </IconButton>
                      <IconButton onClick={() => editCategory(category)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                      </TableRow>)
                  )}
                </>
              ))}
            </TableBody> :
            <div className={classes.loader}>
              <CircularProgress/>
            </div> }
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Categories;