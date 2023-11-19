import { useEffect, useState } from "react";
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Inject,
    Day,
    Week,
    WorkWeek,
    Month,
} from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import { useParams } from "react-router";

import { SCHEDULE_ALL, SCHEDULE_CANCEL, SCHEDULE_CREATE } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";
import { success } from "../../../Common/notify";

const ScheduleDoctor = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const param = useParams();

    const [schedules, setSchedules] = useState<any>([]);

    const [dataSchedule, setDataSchedule] = useState<any>([]);

    useEffect(() => {
        getAllScheduler()
    }, [])

    useEffect(() => {
        schedules.forEach((item: any) => {
            dataSchedule.push({
                Subject: item?.actor[0].display,
                Location: "",
                StartTime: new Date(item?.planningHorizon.start),
                EndTime: new Date(item?.planningHorizon.end),
                IsAllDay: false,
                StartTimezone: null,
                EndTimezone: null,
                Description: item?.comment,
                RecurrenceRule: null,
                Status: item?.slotStatus,
                Id: item.id
            })
        })
    }, [schedules])

    const eventSettings = { dataSource: dataSchedule }

    const getAllScheduler = () => {
        const id = param.doctorId;
        const url = `${url_api}${SCHEDULE_ALL}${id}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                    setSchedules(resp.data);
                }
            })
            .catch((err) => {
                console.log("err:", err);
            });
    }

    const createScheduler = (data: any) => {
        const url = `${url_api}${SCHEDULE_CREATE}`;

        const params = {
            identifier: [],
            active: true,
            serviceCategory: [],
            serviceType: [],
            speciality: [],
            actor: [],
            planningHorizon: {
                start: data.StartTime,
                end: data.EndTime
            },
            comment: data.Description
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                    success("Create scheduler successfully!");
                }
            })
            .catch((err) => {
                console.error('Error create event:', err);
            });
    }

    const cancelScheduler = (id: string) => {
        const url = `${url_api}${SCHEDULE_CANCEL}${id}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    success("Canceled scheduler successfully!");
                    console.log("resp:", resp)
                }
            })
            .catch((err) => {
                console.error('Error cancel event:', err);
            });
    }

    const onActionBegin = (args: any) => {
        console.log("args:", args)
        if (args.requestType === 'eventCreate') {
            // Create operation
            createScheduler(args.data[0])

        } else if (args.requestType === 'eventRemove') {
            // Delete operation
            cancelScheduler(args.data[0].Guid)

        }
    }


    return (
        <section id="schedule">
            <ScheduleComponent width='100%' height='100%' selectedDate={new Date()} eventSettings={eventSettings} actionBegin={onActionBegin}>
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