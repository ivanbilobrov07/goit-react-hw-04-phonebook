import PropTypes from 'prop-types';
import { useState } from 'react';

import { FilterInput, FilterFormGroup } from './FilterContacts.styled';

export const FilterContacts = ({ getFilteredValue }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterValueInput = ({ target: { value } }) => {
    value = value.toLowerCase();

    setFilterValue(value);
    getFilteredValue(value);
  };

  return (
    <FilterFormGroup>
      Search:
      <FilterInput
        type="text"
        name="filter"
        onChange={handleFilterValueInput}
        value={filterValue}
      />
    </FilterFormGroup>
  );
};

FilterContacts.propTypes = {
  getFilteredValue: PropTypes.func.isRequired,
};
