import React, { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

// internal imports
import { useTableToolbarContext } from '@/contexts/TableToolbarProvider';
import { userRoles } from '@/constants/roles';

const RoleFilter = () => {
  const { role, onChangeRole } = useTableToolbarContext();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (role && !userRoles.includes(role)) {
      const params = new URLSearchParams(searchParams);
      params.delete('role');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [role, pathname, searchParams, router]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="select-label-role">Role</InputLabel>
        <Select
          value={userRoles.includes(role) ? role : ''}
          label="Role"
          placeholder="Role"
          onChange={onChangeRole}
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

export default React.memo(RoleFilter);
