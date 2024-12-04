import "@/css/components/divided_list.css";
import { fromKebabCase } from "@/utils/string";

export default function DividedList({ data, rows, total = {} }: DividedListProps) {
   const headers = Object.keys(data[0]) as (keyof (typeof data)[number])[];

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
                  return rows && i > rows - 1 ? null : (
                     <tr key={i}>
                        {headers.map((title, j) => {
                           return <td key={j}>{row[title]}</td>;
                        })}
                     </tr>
                  );
               })}
               {Object.keys(total).length && (
                  <tr>
                     <td>Total</td>
                     {headers.map((title, i) => {
                        if (i === 0) return null;
                        return total?.[title] ? <td key={i}>{total[title]}</td> : <td />;
                     })}
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
}

interface DividedListProps<Data = object> {
   data: {
      [key in keyof Data]: any;
   }[];
   rows?: number;
   total?: {
      [key in keyof Data]: any;
   };
}
