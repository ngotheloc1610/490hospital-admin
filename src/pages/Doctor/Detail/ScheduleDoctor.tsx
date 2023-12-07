import { useEffect, useState } from "react";
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Inject,
    Day,
    Week,
    Month,
} from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { SCHEDULE_ALL, SCHEDULE_CANCEL, SCHEDULE_CREATE } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";
import { success } from "../../../Common/notify";
import { useAppSelector } from "../../../redux/hooks";
import moment from "moment";
import { FORMAT_DATE } from "../../../constants/general.constant";

const ScheduleDoctor = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const param = useParams();
    const navigate = useNavigate();
    const { practitioner } = useAppSelector(state => state.practitionerSlice);

    const [schedules, setSchedules] = useState<any>([]);
    const [dataSchedule, setDataSchedule] = useState<any>([]);

    const [triggerScheduler, setTriggerScheduler] = useState<boolean>(false)

    const fieldsData = {
        id: 'Id',
        subject: { name: 'Subject', title: 'Title' },
        location: { name: 'Location', title: 'Room' },
        description: { name: 'Description', title: 'Description' },
        startTime: { name: 'StartTime', title: 'Start Time' },
        endTime: { name: 'EndTime', title: 'End Time' }
    }

    const eventTemplate = (props: {[key: string]: any}) => {
        return (
            <div>
                <div>{props.Subject}</div>
                <div>
                    <span className="fw-bold">Time: </span>
                    <span>{moment(props.StartTime).format(FORMAT_DATE)}</span>
                    <span> - </span>
                    <span>{moment(props.EndTime).format(FORMAT_DATE)}</span>
                </div>
                <div>
                    <span className="fw-bold">Location: </span>
                    <span>{props.Location}</span>
                </div>
                <p className="text-reset" onClick={() => navigate("/dashboard/patient")}>Link to profile patient...</p>
            </div>
        )
    }

    const eventSettings = { dataSource: dataSchedule, fields: fieldsData, template: eventTemplate }
    const timeScale = { enable: true, interval: 60, slotCount: 1 };

    useEffect(() => {
        getAllScheduler()
    }, [triggerScheduler])

    useEffect(() => {
        schedules && schedules.forEach((item: any) => {
            dataSchedule.push({
                Subject: item?.actor[0].display,
                Location: practitioner?.location[0]?.display,
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

    const getAllScheduler = () => {
        const id = param.doctorId;
        const url = `${url_api}${SCHEDULE_ALL}${id}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setSchedules(resp.data);
                }
            })
            .catch((err) => {
                console.log("error get scheduler for doctor:", err);
            });
    }

    const createScheduler = (data: any) => {
        const url = `${url_api}${SCHEDULE_CREATE}`;

        const params = {
            actor: [
                {
                    reference: `Practitioner/${practitioner?.id}`,
                    display: practitioner?.practitionerTarget?.nameFirstRep?.text
                }
            ],
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
                    setTriggerScheduler(!triggerScheduler);
                    success("Create scheduler successfully!");
                }
            })
            .catch((err) => {
                console.error('Error create scheduler:', err);
            });
    }

    const cancelScheduler = (id: string) => {
        const url = `${url_api}${SCHEDULE_CANCEL}${id}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setTriggerScheduler(!triggerScheduler);
                    success("Canceled scheduler successfully!");
                }
            })
            .catch((err) => {
                console.error('Error cancel scheduler:', err);
            });
    }

    const onActionBegin = (args: any) => {
        if (args.requestType === 'eventCreate') {
            createScheduler(args.data[0])
        } else if (args.requestType === 'eventRemove') {
            cancelScheduler(args.data[0].Id)
        }
    }

    return (
        <section className="schedule">
            <ScheduleComponent width='100%' height='100%' selectedDate={new Date()}
                actionBegin={onActionBegin}
                eventSettings={eventSettings}
                timeScale={timeScale}
                
            >
                <Inject services={[Day, Week, Month]} />
                <ViewsDirective>
                    <ViewDirective option='Day' />
                    <ViewDirective option='Week' />
                    <ViewDirective option='Month' />
                </ViewsDirective>
            </ScheduleComponent>
        </section>
    )
}

export default ScheduleDoctor