import fetch from "node-fetch";
import base64 from "base-64";

const zoomAccountId = "qbQD8qwtTuGuvurAZjb6mg";
const zoomClientId = "FhXmHq_FQ9SxIqyq_WUag";
const zoomClientSecret = "N9tzQjWiLIHkdFp4pgCBmYFqKhPHribJ";

const getAuthHeaders = () => ({
  Authorization: `Basic ${base64.encode(`${zoomClientId}:${zoomClientSecret}`)}`,
  "Content-Type": "application/json",
});

const generateZoomAccessToken = async () => {
  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse?.access_token;
};

const parseSlotDateTime = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_").map(Number);
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${slotTime}`;
    const localDate = new Date(`${dateString}`);
  
    return new Date(localDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).toISOString();
  };
  
  export const generateZoomMeeting = async (appointment) => {
    const zoomAccessToken = await generateZoomAccessToken();
  
    const { userData, docData, slotTime, slotDate } = appointment;
  
    const formattedDateTime = parseSlotDateTime(slotDate, slotTime);
  
    const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zoomAccessToken}`,
      },
      body: JSON.stringify({
        topic: `Consultation with Dr. ${docData.name}`,
        type: 2,
        agenda: `Online consultation between ${userData.name} and Dr. ${docData.name}`,
        duration: 30,
        start_time: formattedDateTime,
        timezone: "Asia/Kolkata",
        settings: {
          join_before_host: true,
          host_video: true,
          participant_video: true,
          mute_upon_entry: true,
          waiting_room: false,
          contact_email: docData.email || "admin@sympcare.in",
          contact_name: `Dr. ${docData.name}`,
          email_notification: true,
          meeting_invitees: [
            {
              email: userData.email || "patient@sympcare.in",
            },
          ],
        },
      }),
    });
  
    const json = await response.json();
    // console.log("Zoom Meeting Created:", json);
    return json?.join_url;
  };
  

// export const generateZoomMeeting = async (appointment) => {
//   const zoomAccessToken = await generateZoomAccessToken();

//   const { userData, docData, slotTime, slotDate } = appointment;

//   const formattedDateTime = new Date(`${slotDate}T${slotTime}`).toISOString();

//   const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${zoomAccessToken}`,
//     },
//     body: JSON.stringify({
//       topic: `Consultation with Dr. ${docData.name}`,
//       type: 2,
//       agenda: `Online consultation between ${userData.name} and Dr. ${docData.name}`,
//       duration: 30,
//       start_time: formattedDateTime,
//       timezone: "Asia/Kolkata",
//       settings: {
//         join_before_host: true,
//         host_video: true,
//         participant_video: true,
//         mute_upon_entry: true,
//         waiting_room: false,
//         contact_email: docData.email || "admin@sympcare.in",
//         contact_name: `Dr. ${docData.name}`,
//         email_notification: true,
//         meeting_invitees: [
//           {
//             email: userData.email || "patient@sympcare.in",
//           },
//         ],
//       },
//     }),
//   });

//   const json = await response.json();
//   console.log("Zoom Meeting Created:", json);
//   return json?.join_url;
// };
