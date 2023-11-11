import { useEffect, useRef } from "react";

import {
    ScheduleComponent, Day, Week, WorkWeek, Month, Inject,
    ViewsDirective, ViewDirective
} from '@syncfusion/ej2-react-schedule';
import { defineConfigGet } from "../../../Common/utils";
import { SCHEDULE_MONTH } from "../../../constants/api.constant";
import axios from "axios";
import { useParams } from "react-router";

const ScheduleDoctor = () => {
    const scheduleObj = useRef<any>(null);
    const buttonObj = useRef<any>(null);
    const param = useParams();

    // const url_api = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     const id = param.doctorId;
    //     const url = `${url_api}${SCHEDULE_MONTH}${id}`;

    //     axios
    //         .get(url, defineConfigGet({}))
    //         .then((resp: any) => {
    //             if (resp) {
    //                 console.log("resp:", resp)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err:", err);
    //         });
    // }, [param.doctorId]);



    const data = [
        {
            Id: 1,
            Subject: "Paris",
            StartTime: new Date(2023, 10, 26, 10, 0),
            EndTime: new Date(2023, 10, 26, 12, 30),
        },
    ];

    const onAddClick = () => {
        let Data = [{
            Id: 2,
            Subject: 'Conference',
            StartTime: new Date(2023, 10, 26, 9, 0),
            EndTime: new Date(2023, 10, 26, 10, 0),
            IsAllDay: false
        }, {
            Id: 3,
            Subject: 'Meeting',
            StartTime: new Date(2023, 10, 26, 10, 0),
            EndTime: new Date(2023, 10, 26, 11, 30),
            IsAllDay: false
        }];
        scheduleObj.current.addEvent(Data);
        console.log("scheduleObj:", scheduleObj.current)
    }

    const eventSettings = { dataSource: data };

    return (
        <section id="schedule">
            <ScheduleComponent ref={scheduleObj} width='100%' height='100%' selectedDate=
                {new Date(2023, 10, 26)} eventSettings={eventSettings}>
                <ViewsDirective>
                    <ViewDirective option='Day' />
                    <ViewDirective option='Week' />
                    <ViewDirective option='WorkWeek' />
                    <ViewDirective option='Month' />
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
        </section>
    )
}

export default ScheduleDoctor