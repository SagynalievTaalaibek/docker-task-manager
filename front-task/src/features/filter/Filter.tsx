import {Box, TextField} from '@mui/material';
import React, {FormEvent, useState} from 'react';
import {LoadingButton} from '@mui/lab';

interface Props {
    onSearch: (searchTerm: string) => void;
    isLoading: boolean;
}

const Filter: React.FC<Props> = ({onSearch, isLoading}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0 15px',
                    margin: '15px 0',
                    mb: '24px',
                }}
            >
                <TextField
                    fullWidth
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    autoComplete="off"
                    placeholder="Tasks"
                    label="Find Task"
                />
                <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    sx={{py: 2, px: 4, backgroundColor: '#8cd687', fontSize: '16px'}}
                >
                    Find
                </LoadingButton>
            </Box>
        </form>
    );
};

export default Filter;