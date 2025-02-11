export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  
    return 0;
  };
  
  export const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  export function stableSort(array, comparator) {
    const stabilizedThis = array.map((e, index) => [e, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
  
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((e) => e[0]);
  }