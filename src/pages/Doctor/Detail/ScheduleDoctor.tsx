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
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import { success, warn } from "../../../Common/notify";
import { useAppSelector } from "../../../redux/hooks";
import { KEY_LOCAL_STORAGE } from "../../../constants/general.constant";

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { L10n } from "@syncfusion/ej2-base";

L10n.load({
    'en-US': {
        'schedule': {
            'newEvent': 'Add scheduler for doctor'
        }
    }
})

const ScheduleDoctor = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const param = useParams();
    const navigate = useNavigate();
    const { practitioner, room } = useAppSelector(state => state.practitionerSlice);

    const [schedules, setSchedules] = useState<any>([]);
    const [dataSchedule, setDataSchedule] = useState<any>([]);

    const [triggerScheduler, setTriggerScheduler] = useState<boolean>(false)

    const eventTemplate = (props: { [key: string]: any }) => {
        return (
            <div>
                <div>{props.Subject}</div>
            </div>
        )
    }
    const fieldsData = {
        id: 'Id',
        subject: { name: 'Subject', title: 'Title' },
        location: { name: 'Location', title: 'Room' },
    }
    const timeScale = { enable: true, interval: 60, slotCount: 1 };

    const eventSettings = { dataSource: dataSchedule, template: eventTemplate, fields: fieldsData }

    useEffect(() => {
        getAllScheduler()
    }, [triggerScheduler])

    useEffect(() => {
        schedules && schedules.forEach((item: any) => {
            dataSchedule.push({
                Subject: item?.actor[0].display,
                Location: practitioner?.desRoom,
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
        console.log("practitioner create:", practitioner)

        const params = {
            actor: [
                {
                    reference: `Practitioner/${practitioner?.id}`,
                    display: practitioner?.name
                }
            ],
            planningHorizon: {
                start: data.StartTime,
                end: data.EndTime
            },
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

        const accountID = localStorage.getItem(KEY_LOCAL_STORAGE.ID);

        axios
            .get(url, defineConfigGet({ idPractitionerCancel: accountID }))
            .then((resp: any) => {
                if (resp) {
                    setTriggerScheduler(!triggerScheduler);
                    navigate('/book-appointment')
                    success("Canceled scheduler successfully!");
                }
            })
            .catch((err) => {
                console.error('Error cancel scheduler:', err);
            });
    }

    const onActionBegin = (args: any) => {
        console.log("args:", args)
        if (args.requestType === "eventCreate") {
            const data = args.data[0];
            // if (data.Subject === "") {
            //     warn("Please fill in title!");
            //     return;
            // }
            // if (data.StartTime || data.EndTime) {
            //     warn("Please fill in the start time and end time!");
            //     return;
            // }
            createScheduler(data)
        } else if (args.requestType === 'eventRemove') {
            cancelScheduler(args.data[0].Id)
        }
    }

    const editorTemplate = (props: any) => {
        console.log("props:", props)
        return (
            <div className="container">
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="Subject" className="form-label">
                            Title
                        </label>
                        <div className="input-group">
                            <input
                                id="Subject"
                                type="text"
                                className='form-control'
                                name="Subject"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="room" className="form-label">
                            Room
                        </label>
                        <div className="input-group">
                            <input
                                id="room"
                                type="text"
                                className='form-control'
                                disabled
                                value={room}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="StartTime" className="form-label">
                            Start Date
                        </label>
                        <div className="input-group">
                            <DateTimePickerComponent id="StartTime" name="StartTime" value={props.StartTime}></DateTimePickerComponent>
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="EndTime" className="form-label">
                            End Date
                        </label>
                        <div className="input-group">
                            <DateTimePickerComponent id="EndTime" name='EndTime' value={props.EndTime}></DateTimePickerComponent>
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="Description" className="form-label">
                            Description
                        </label>
                        <div className="input-group">
                            <textarea
                                className="p-3 rounded w-100"
                                name="Description"
                                cols={5}
                                rows={5}
                                placeholder="Add description here"
                                id='Description'
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const onPopupOpen = (args: any) => {
        console.log("args:", args)
        args.data.Location = room;
        // args.cancel = true;
    }

    return (
        <section className="schedule">
            <ScheduleComponent width='100%' height='100%' selectedDate={new Date()}
                actionBegin={onActionBegin}
                timeScale={timeScale}
                eventSettings={eventSettings}
                popupOpen={onPopupOpen}
            // editorTemplate={editorTemplate}
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