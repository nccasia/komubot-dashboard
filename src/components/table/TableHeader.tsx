import { TableRow, TableCell, TableHead, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = {
  headLabel: any[],
  sort: boolean,
  setSort: (is: boolean) => void,
};

export default function TableHeader({ 
    headLabel,
    setSort,
    sort,
}: Props) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell:any) => (
                    <TableCell key={headCell.id}>
                        <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                            {headCell.label}
                            {headCell.sort && 
                                <IconButton onClick={() => setSort(!sort)}>
                                    {sort ? 
                                        <ArrowDownwardIcon sx={{fontSize: 18}}/>                 
                                    : 
                                        <ArrowUpwardIcon sx={{fontSize: 18}}/> 
                                    }
                                </IconButton>
                            }
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}