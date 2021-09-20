//created in video 199:

import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

//CellList is iterating over all different cells and is displaying one copy of CellListItem
//CellListItem is responsible for showing one individual cell

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: {order, data} }) =>
    order.map((id) => data[id])
  );

  //Fragment added in video 213 and modified in v. 222
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  //code in return shows the last row of +code and +text buttons
  //modified in video 222
  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;