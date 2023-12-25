import { useEffect, useState } from "react";
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Inject,
    Day,
    Week,
    Month,
    ResourceDirective, ResourcesDirective
} from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { L10n } from "@syncfusion/ej2-base";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SCHEDULE_ALL, SCHEDULE_CREATE, SCHEDULE_UPDATE } from "../../constants/api.constant";
import { defineConfigPost, styleSchedule } from "../../Common/utils";
import { success } from "../../Common/notify";
import { FORMAT_DATE, KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import { setAppointment } from "../../redux/features/appointment/appointmentSlice";

L10n.load({
    'en-US': {
        'schedule': {
            'newEvent': 'Add scheduler for doctor',
            'editEvent': 'Edit scheduler for doctor'
        }
    }
})

const ScheduleDoctor = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const { practitioner, room } = useAppSelector(state => state.practitionerSlice);
    const dispatch = useAppDispatch()

    const [schedules, setSchedules] = useState<any>([]);
    const [dataSchedule, setDataSchedule] = useState<any>([]);

    const [triggerScheduler, setTriggerScheduler] = useState<boolean>(false)

    const minValidation = (args: any) => {
        return args['value'].length >= 5;
    };
    const fieldsData = {
        id: 'Id',
        subject: { name: 'Subject' },
        location: { name: 'Location' },
        description: {
            name: 'Description', validation: {
                required: true, minLength: [minValidation, 'Need at least 5 letters to be entered']
            }
        },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' },
        status: { name: 'Status' }
    }
    const timeScale = { enable: true, interval: 60, slotCount: 1 };

    const eventSettings = { dataSource: dataSchedule, fields: fieldsData }

    useEffect(() => {
        getAllScheduler()
    }, [])

    useEffect(() => {
        const uniqueIds = new Set();
        schedules && schedules.length > 0 && schedules.forEach((item: any) => {
            const itemId = item.id;
        
            if (!uniqueIds.has(itemId)) {
                dataSchedule.push({
                    Subject: item?.title,
                    Location: practitioner?.desRoom,
                    StartTime: new Date(item?.planningHorizon.start),
                    EndTime: new Date(item?.planningHorizon.end),
                    Description: item?.comment,
                    Status: item?.slotStatus,
                    Id: itemId,
                    ResourceID: item?.slotStatus?.toString()?.toLowerCase() === "busy" ? 1 :
                                 item?.slotStatus?.toString()?.toLowerCase() === "busy-unavailable" ? 2 :
                                 item?.slotStatus?.toString()?.toLowerCase() === "busy-tentative" ? 3 : 4
                });
                
                uniqueIds.add(itemId);
            }
        });
    }, [schedules])

    const getAllScheduler = () => {
        const accountId = localStorage.getItem(KEY_LOCAL_STORAGE.ID)
        const url = `${url_api}${SCHEDULE_ALL}${accountId}`;

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

        const accountId = localStorage.getItem(KEY_LOCAL_STORAGE.ID)
        const accountName = localStorage.getItem(KEY_LOCAL_STORAGE.NAME)

        const status = data.Status === 1 ? "Busy" : data.Status === 2 ? "Busy Unavailable" : data.Status === 3 ? "Busy tentative" : "Free"

        const params = {
            title: data.Subject,
            location: data.Location,
            start: data.StartTime,
            end: data.EndTime,
            status: status,
            idDoctor: accountId,
            nameDoctor: accountName,
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

    const updateScheduler = (data: any) => {
        const url = `${url_api}${SCHEDULE_UPDATE}${data.Id}`;
        const accountId = localStorage.getItem(KEY_LOCAL_STORAGE.ID)
        const accountName = localStorage.getItem(KEY_LOCAL_STORAGE.NAME)
        const status = data.Status === 1 ? "Busy" : data.Status === 2 ? "Busy Unavailable" : data.Status === 3 ? "Busy tentative" : "Free"

        const params = {
            title: data.Subject,
            location: data.Location,
            start: data.StartTime,
            end: data.EndTime,
            status: status,
            idDoctor: accountId,
            nameDoctor: accountName,
            comment: data.Description
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setTriggerScheduler(!triggerScheduler);
                    success("Update scheduler successfully!");
                }
            })
            .catch((err) => {
                console.error('Error update scheduler:', err);
            });
    }

    const onActionBegin = (args: any) => {
        if (args.requestType === "eventCreate") {
            const data = args.data[0];
            createScheduler(data)
        }
        if (args.requestType === "eventChange") {
            const data = args.data;
            updateScheduler(data)
        }
    }

    const onPopupOpen = (args: any) => {
        args.data.Location = room;
    }

    const resourceDataSource: Object[] = [
        { Name: "Free", Id: 4, Color: "#2215db" },
        { Name: "Busy", Id: 1, Color: "#DC2626" },
        { Name: "Busy Unavailable", Id: 2, Color: "#DACA37" },
        { Name: "Busy tentative", Id: 3, Color: "#B3E5FC" },
    ]


    const headerTemplate: any = (props: any) => {
        return (<div className="container text-white">
            <div className="fw-bold text-center">Appointment Details</div>
            <div className="text-center">
                <span>{moment(props?.StartTme).format(FORMAT_DATE)}</span>
            </div>
        </div>);
    }
    const contentTemplate: any = (props: any) => {
        const idAppointment = schedules.filter((item: any) => item?.id === props?.Id)[0]?.idAppointment;
        const idEncounter = schedules.filter((item: any) => item?.id === props?.Id)[0]?.idEncounter;
        const appointment = {
            idAppointment: idAppointment
        }

        const status = props.Status === 1 ? "Busy" : props.Status === 2 ? "Busy Unavailable" : props.Status === 3 ? "Busy tentative" : "Free"

        return (<div className="quick-info-content">
            <div className="event-content">
                <div className="mb-3">
                    <label className="fw-bold">Subject: </label>
                    <span> {props.Subject}</span>
                </div>
                <div className="mb-3">
                    <label className="fw-bold">Status: </label>
                    <span className={styleSchedule(props?.Status?.toString()?.toLowerCase())}>{status}</span>
                </div>
                <div className="mb-3">
                    <label className="fw-bold">Notes: </label>
                    <span> {props.Description}</span>
                </div>
                <div onClick={() => { navigate(`/diagnostic-report/${idEncounter}`); dispatch(setAppointment(appointment)) }}>
                    Link: <span style={{ textDecoration: "underline", fontWeight: "bold" }}>diagnostic...</span>
                </div>
            </div>
        </div>);
    }

    const quickInfoTemplates: any = {
        header: headerTemplate,
        content: contentTemplate,
    };

    return (
        <section className="schedule">
            <ScheduleComponent width='100%' height='100%' selectedDate={new Date()}
                actionBegin={onActionBegin}
                timeScale={timeScale}
                eventSettings={eventSettings}
                popupOpen={onPopupOpen}
                quickInfoTemplates={quickInfoTemplates}
            >
                <ResourcesDirective>
                    <ResourceDirective field="Status" name="Status" title="Status" textField="Name" idField="Id" colorField="Color" dataSource={resourceDataSource}></ResourceDirective>
                </ResourcesDirective>
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