import { useEffect, useRef, useState } from "react";
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
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import axios from "axios";
import { useParams } from "react-router";

import { SCHEDULE_ALL } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";

import PopUpAddEvent from "./PopupAddEvent";

interface EventData {
    Subject: string;
    StartTime: Date;
    EndTime: Date;
}

const ScheduleDoctor = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const param = useParams();

    const scheduleRef = useRef<ScheduleComponent>(null);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    const [schedules, setSchedules] = useState<any>([]);

    const [dataSchedule, setDataSchedule] = useState<any>([]);

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

    useEffect(() => {
        getAllScheduler()
    }, [])

    useEffect(() => {
        schedules.forEach((item: any) => {
            dataSchedule.push({
                Id: item.id,
                Subject: item.comment,
                StartTime: new Date(item.planningHorizon.start),
                EndTime: new Date(item.planningHorizon.end),
            })
        })
    }, [schedules])

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleAddEvent = () => {
        const scheduleComponent = scheduleRef.current;

        if (scheduleComponent) {
            // Logic to add the event to the scheduler data
            const newEvent: EventData = {
                Subject: 'New Event',
                StartTime: new Date(),
                EndTime: new Date(),
            };

            // You can use scheduleComponent.addEvent() to add events programmatically
            scheduleComponent.addEvent(newEvent);
            closePopup();
        }
    };

    const eventSettings = { dataSource: dataSchedule };

    return (
        <section id="schedule">
            <ScheduleComponent ref={scheduleRef} width='100%' height='100%' selectedDate={new Date()} eventSettings={eventSettings}>
                <ViewsDirective>
                    <ViewDirective option='Day' />
                    <ViewDirective option='Week' />
                    <ViewDirective option='WorkWeek' />
                    <ViewDirective option='Month' />
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>

            <ButtonComponent onClick={openPopup}>Add Event</ButtonComponent>

            {isPopupOpen && <PopUpAddEvent handleCloseConfirmPopup={setPopupOpen} />}
        </section>
    )
}

export default ScheduleDoctor