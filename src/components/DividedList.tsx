import "@/css/components/divided_list.css";

export default function DividedList({ data, rows, headers, total }: DividedListProps) {
   const headerElements = [];
   const dataElements = [];

   if (!rows) rows = Infinity;
   for (let i = 0; i < data.length && i < rows; i++) {
      let elements = [];

      for (const str of headers) {
         elements.push(<td>{data[i][str] ? data[i][str] : "--"}</td>);
      }

      dataElements.push(elements);
   }

   if (dataElements.length === rows) {
      dataElements.pop();
      dataElements.push(
         <td colSpan={headers.length} className="text-dim">{`And ${data.length - rows + 1} more...`}</td>
      );
   }

   let elements = [];
   elements.push(<th>Total</th>);
   for (const str of headers) {
      headerElements.push(<th>{str}</th>);

      if (total) elements.push(<th>{total[str] ? total[str] : ""}</th>);
   }
   let last = elements.pop();
   elements.pop();
   elements.push(last);
   dataElements.push(elements);

   return (
      <div className="table-wrapper">
         <table className="divided-list">
            {headers ? (
               <thead>
                  <tr>{headerElements}</tr>
               </thead>
            ) : (
               ""
            )}
            <tbody>
               {dataElements.map((element) => {
                  return <tr>{element}</tr>;
               })}
            </tbody>
         </table>
      </div>
   );
}

interface DividedListProps {
   data: object[];
   rows?: number;
   headers: object[];
   total?: object;
}
