import "@/css/components/divided_list.css";
import { fromKebabCase } from "@/utils/string";

export default function DividedList({ fallback, data, rows, total = {}, dashes }: DividedListProps) {
   if (data.length === 0) {
      return fallback;
   }

   const headers = Object.keys(data[0]);

   return (
      <div className="table-wrapper">
         <table className="divided-list">
            <tbody>
               <tr>
                  {headers.map((title, i) => {
                     return <th key={i}>{fromKebabCase(title)}</th>;
                  })}
               </tr>
               {data.map((row, i) => {
                  // if (rows && rows - 1 === i && data.length > rows) {
                  //    return null;
                  // }
                  return rows && (i > rows - 1 || (rows - 1 === i && data.length > rows)) ? null : (
                     <tr key={i}>
                        {headers.map((title, j) => {
                           return !row[title] && dashes ? <td key={j}>--</td> : <td key={j}>{row[title]}</td>;
                        })}
                     </tr>
                  );
               })}
               {rows && data.length > rows && (
                  <tr>
                     <td colSpan={headers.length}>And {data.length - rows + 1} more...</td>
                  </tr>
               )}
               {!!Object.keys(total).length && (
                  <tr className="text-strong">
                     <td>Total</td>
                     {headers.map((title, i) => {
                        if (i === 0) return null;
                        return total[title] ? <td key={i}>{total[title]}</td> : <td key={i} />;
                     })}
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
}

interface DividedListProps {
   data: {
      [key: string]: any;
   }[];
   fallback?: React.ReactNode;
   rows?: number;
   total?: {
      [key: string]: any;
   };
   dashes?: boolean;
}
