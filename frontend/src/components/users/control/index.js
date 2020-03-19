import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchControl from './search-control';
import CategoryFilter from '../../common/category-filter';
import SubCategoryFilter from '../../common/sub-category-filter';
import { useUser } from '../../../context/user';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '30px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    color: '#fff',
    textDecoration : 'none'
  },
  contorl: {
    display: 'flex',
  }
});

const UserControl = () => {
  const classes = useStyles();
  const { data: { params, params: { category, subCategory } }, methods: { getUsers } } = useUser();
  const handleCategoryChange = (selectedCategory) => {
    getUsers({...params, category: selectedCategory, subCategory: 0})
  }
  const handleSubCategoryChange = (selectedSubCategory) => {
    getUsers({...params, subCategory: selectedSubCategory})
  }
  return <div className={classes.root}>
    <Button color="primary" variant="contained"><Link to='/users/new' className={classes.link}>Add New User</Link></Button>
    <div className={classes.control}>
      <CategoryFilter defaultValue={category} onChangeHanlder={handleCategoryChange}/>
      <SubCategoryFilter defaultValue={subCategory} category={category} onChangeHanlder={handleSubCategoryChange}/>
      <SearchControl />
    </div>
  </div>
}

export default UserControl;