export const API_LOGIN = "/practitioner/login";
export const API_PROFILE_PRACTITIONER = "/practitioner/profile"
export const API_UPDATE_PROFILE_PRACTITIONER = "/practitioner/update_profile"
export const API_CHANGE_PASSWORD = "/password/changePass/";

export const API_ADMIN_TOTAL = "/admin/total";
export const API_ALL_GET_PATIENT = "/admin/patients";
export const API_GET_PATIENT = "/admin/patient/detail/";
export const API_UPDATE_PATIENT = "/admin/patient/update/";
export const API_DELETE_PATIENT = "/admin/patient/delete/";
export const API_BLOCK_PATIENT = "/admin/blockPatient/";
export const API_BLOCK_PRACTITIONER = "/admin/blockPractitioner/";
export const API_SEARCH_PATIENT = "/admin/searchPatient";
export const API_ALL_GET_DOCTOR = "/admin/doctors";
export const API_SEARCH_DOCTOR = "/admin/searchDoctor";
export const API_ALL_GET_STAFF = "/admin/staffs";
export const API_SEARCH_STAFF = "/admin/searchStaff";
export const API_DETAIL_PRACTITIONER = "/admin/practitioner/detail/";
export const API_UPDATE_PRACTITIONER = "/admin/practitioner/update/";
export const API_CREATE_PRACTITIONER = "/admin/practitioner/create"
export const API_ALL_GET_SPECIALTY = "/admin/specialties";
export const API_GET_SPECIALTY = "/admin/specialty/";
export const API_GET_ROOM = "/admin/rooms";
export const API_GET_ROOM_BY_SPECIALTY = "/admin/rooms/";

export const API_GET_LIST_APPOINTMENT_PATIENT = "/patient/listAppointment/";

export const API_SEARCH_APPOINTMENT_PREVIOUS = "/appointment/searchAppointPre";
export const API_SEARCH_APPOINTMENT_UPCOMING = "/appointment/searchAppointUpcoming";
export const API_SEARCH_APPOINTMENT_PROPOSED = "/appointment/searchAppointProposed";
export const API_SEARCH_APPOINTMENT_PENDING = "/appointment/searchAppointPending";
export const API_ALL_GET_APPOINTMENT_PREVIOUS = "/appointment/booked_success/listAppointmentPrevious";
export const API_ALL_GET_APPOINTMENT_UPCOMING = "/appointment/booked_success/listAppointmentUpcoming";
export const API_ALL_GET_APPOINTMENT_PENDING = "/appointment/listAppointmentPending";
export const API_ALL_GET_APPOINTMENT_PROPOSED = "/appointment/listAppointmentProposed";
export const API_ACCEPT_APPOINTMENT = "/appointment/acceptAppointment/";
export const API_DENY_APPOINTMENT = "/appointment/unAcceptAppoint/";
export const API_NO_SHOW_APPOINTMENT = "/appointment/noShowAppoint/";
export const API_ARRIVED_APPOINTMENT = "/appointment/arrivedAppoint/";
export const API_PRACTITIONER_CANCEL_APPOINTMENT = "/appointment/practitionerCancelAppoint/";
export const API_DETAIL_APPOINTMENT = "/appointment/detail/";
export const API_CHANGE_APPOINTMENT_PATIENT = "/appointment/ChangeAppoint/patient/";
export const API_CHANGE_APPOINTMENT_DOCTOR = "/appointment/ChangeAppoint/listDoctor";
export const API_GET_SPECIALTY_APPOINTMENT = "/appointment/specialty";
export const API_GET_DOCTOR_APPOINTMENT = "/appointment/doctor";
export const API_SCHEDULE_GET_APPOINTMENT = "/appointment/schedule";
export const API_CREATE_APPOINTMENT = "/appointment/practitioner/create";
export const API_GET_PATIENT_APPOINTMENT = "/appointment/patient";

export const SCHEDULE_ALL = "/schedule/schedule-by-doctorId/"
export const SCHEDULE_CREATE = "/schedule/create"
export const SCHEDULE_CANCEL = "/schedule/cancel-Schedule/"

export const API_INBOX_ROOM_LIST = "/inbox-room/lists"
export const API_INBOX_ROOM_DETAIL = "/inbox-room"
export const API_INBOX_ROOM_CREATE = "/inbox-room/staff-create"
export const API_INBOX_MESSAGE = "/inbox-message/"
export const API_INBOX_MESSAGE_SEND = "/inbox-message/message"

export const API_DASHBOARD_TOTAL = "/dashboard/totalUserByType"
export const API_DASHBOARD_PATIENT_PER_DAY = "/dashboard/returning-patients-per-day"
export const API_DASHBOARD_GENDER_PER_DAY = "/dashboard/returning-gender-per-day"
export const API_DASHBOARD_NEW_PATIENT = "/dashboard/returning-newPatients-in-range"
export const API_DASHBOARD_OLD_PATIENT = "/dashboard/returning-oldPatients-in-range"
export const API_DASHBOARD_ALL_PATIENT = "/dashboard/returning-all-patients"
export const API_DASHBOARD_ALL_PATIENT_GENDER = "/dashboard/returning-all-patients-gender"
export const API_DASHBOARD_PATIENT_FULFILLED = "/dashboard/returning-list-patient-fullfiled"
export const API_DASHBOARD_PATIENT_CANCELED = "/dashboard/returning-list-patient-cancelled"
export const API_DASHBOARD_APPOINTMENT_TODAY = "/dashboard/returning-list-appointment-today"
export const API_DASHBOARD_APPOINTMENT_BOOKED = "/dashboard/returning-booked-appointment-per-day"
export const API_DASHBOARD_APPOINTMENT_TOTAL = "/dashboard/returning-total-appointment-per-day"

export const API_MONITOR_ALL = "/monitor/getAll"
export const API_MONITOR_SEARCH = "/monitor/searchMonitor"

export const API_DIAGNOSTIC_UPCOMING = "/diagnostic/upcomingAppointment/";
export const API_DIAGNOSTIC_ENCOUNTER_HISTORY = "/diagnostic/encounterHistory/";
export const API_DIAGNOSTIC_PATIENT_PROFILE = "/diagnostic/patientProfile/";
export const API_DIAGNOSTIC_BOOK_DETAIL = "/diagnostic/appointmentBookDetail/";
export const API_DIAGNOSTIC_CONDITIONS = "/diagnostic/condition/"
export const API_DIAGNOSTIC_OBSERVATION = "/diagnostic/observations/"
export const API_DIAGNOSTIC_CREATE_ENCOUNTER = "/diagnostic/create_encounter/"
export const API_DIAGNOSTIC_CREATE_DIAGNOSTIC = "/diagnostic/createDisgnostic"
export const API_DIAGNOSTIC_CONDITION_BY_PATIENT = "/diagnostic/getAllCondition/"
export const API_DIAGNOSTIC_BMI = "/diagnostic/BMI"
export const API_DIAGNOSTIC_CONDITION = "/diagnostic/conditionCode"
export const API_DIAGNOSTIC_BODY_SITE = "/diagnostic/BodySite"
export const API_DIAGNOSTIC_CATEGORY = "/diagnostic/category"

export const API_ALERT_BLOOD_PRESSURE = "/alert/createAlertSettting/BloodPressure"
export const API_ALERT_BLOOD_GLUCOSE = "/alert/createAlertSettting/BloodGlucose"
export const API_ALERT_HEART_RATE = "/alert/createAlertSettting/HeartRate"
export const API_ALERT_TEMPERATURE = "/alert/createAlertSettting/Temperature"
export const API_ALERT_BMI = "/alert/createAlertSettting/BodyMassIndex(BMI)"

export const API_MEDIA_UPLOAD = "/media/mediaUpload"







