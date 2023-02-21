import PropTypes from "prop-types";
// @mui
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

// ----------------------------------------------------------------------

DailyListHead.propTypes = {
  headLabel: PropTypes.array.isRequired,
};

export default function DailyListHead({
  headLabel,
}: PropTypes.InferProps<typeof DailyListHead.propTypes>) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell: any) => (
          <TableCell key={headCell.id}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
