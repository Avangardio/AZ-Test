import AvgForm from "@/components/Avg/components/AvgForm";
import {useState} from "react";
import AvgTable from "@/components/Avg/components/AvgTable";

export default function MainAvg(){
    //Определяем стейт для записей вычислений
    const [records, setRecords] = useState<Icalculated[]>([]);

     return (
         <>
            <AvgForm records={records} updateRecords={setRecords} />
            <AvgTable records={records} updateRecords={setRecords} />
         </>
     )
}