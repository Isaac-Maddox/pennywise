import "@/css/components/divided_list.css";

export default function DividedList({ data, rows, headers, total }: DividedListProps) {
   const headerElements = [];
   const dataElements = [];

   if (headers) {
      for (const str of headers) {
         headerElements.push(<th>{str}</th>);
      }

      for (const obj of data) {
         dataElements.push(
            Object.entries(obj).map((entry) => {
               if (headers.includes(entry[0])) {
                  return <td>{entry[1]}</td>;
               }
            })
         );
      }
   } else {
   }

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
   rows: number | "all";
   headers?: string[];
   total?: boolean | string[];
}
