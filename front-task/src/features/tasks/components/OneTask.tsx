import {
  Box,
  Card,
  CardContent,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { STATUS } from '../../../constants.ts';

dayjs.extend(LocalizedFormat);

interface Props {
  _id: string;
  title: string;
  dueDate: string;
  status: string;
}

const OneTask: React.FC<Props> = ({ _id, title, dueDate, status }) => {
  const StyledIconEdit = styled(Edit)`
    &:hover {
      color: #76ff03;
    }
  `;

  return (
    <>
      <Card sx={{ display: 'flex', mb: 3, p: 1, border: '1px solid black' }}>
        <CardContent sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Typography component="div" variant="h4">
                {title}
              </Typography>
              <Typography
                component="div"
                variant="h5"
                sx={{ fontWeight: 'bold' }}
              >
                {dayjs(dueDate).format('LL')}
              </Typography>
              <Typography
                component="div"
                variant="h4"
                sx={{
                  color:
                    status === 'pending'
                      ? 'orange'
                      : status === 'in_progress'
                        ? 'blue'
                        : status === 'completed'
                          ? 'green'
                          : 'black',
                }}
              >
                {STATUS.find((item) => item.value === status)?.name || 'Unknown Status'}
              </Typography>
            </Box>
            <IconButton component={Link} to={`/task/edit/${_id}`}>
              <StyledIconEdit sx={{ fontSize: '40px' }} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default OneTask;
