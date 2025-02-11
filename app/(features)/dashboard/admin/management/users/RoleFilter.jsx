import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

const RoleFilter = ({ role, handleChangeRole }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="select-label-role">Role</InputLabel>
        <Select
          value={role}
          label="Role"
          placeholder="Role"
          onChange={handleChangeRole}
          inputProps={{
            id: 'select-label-role',
          }}
          sx={{ borderRadius: '6px' }}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="guide">Guide</MenuItem>
          <MenuItem value="partner">Partner</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default RoleFilter;
